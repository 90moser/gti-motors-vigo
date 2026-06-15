import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import {
  BookingFormFields,
  SERVICES,
  VEHICLES,
  HOURS,
  type FormValues,
} from "./BookingFormFields";

const today = new Date().toISOString().split("T")[0];

// 0=domingo, 1=lunes, 6=sábado → cerrado para reservas online
const DIA_CERRADO = new Set([0, 1, 6]);

const defaultForm: FormValues = {
  nombre: "",
  telefono: "",
  email: "",
  servicio: SERVICES[0],
  tipo_vehiculo: VEHICLES[0].value,
  fecha: "",
  hora: HOURS[0],
  notas: "",
};

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [form, setForm] = useState<FormValues>(defaultForm);
  const [diaCerrado, setDiaCerrado] = useState(false);
  const [horasConteo, setHorasConteo] = useState<Record<string, number>>({});

  const update = (k: keyof FormValues, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const fetchHorasOcupadas = async (fecha: string) => {
    setLoadingSlots(true);
    try {
      const { data } = await supabase
        .from("citas")
        .select("hora")
        .eq("fecha", fecha)
        .neq("estado", "cancelado");
      const conteo: Record<string, number> = {};
      (data ?? []).forEach((c) => {
        const h = String(c.hora).substring(0, 5);
        conteo[h] = (conteo[h] ?? 0) + 1;
      });
      setHorasConteo(conteo);
    } catch {
      setHorasConteo({});
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleFechaChange = (val: string) => {
    if (!val) {
      update("fecha", "");
      setDiaCerrado(false);
      setHorasConteo({});
      return;
    }
    const date = new Date(val + "T12:00:00");
    const day = date.getDay();

    if (DIA_CERRADO.has(day)) {
      // Mantener la fecha visible pero marcar el día como cerrado
      update("fecha", val);
      setDiaCerrado(true);
      setHorasConteo({});
      return;
    }

    setDiaCerrado(false);
    update("fecha", val);
    fetchHorasOcupadas(val);
  };

  // Si la hora seleccionada queda completa al cambiar de fecha, resetear a la primera libre
  useEffect(() => {
    if (!Object.keys(horasConteo).length) return;
    if ((horasConteo[form.hora] ?? 0) >= 2) {
      const primeiraLivre = HOURS.find((h) => (horasConteo[h] ?? 0) < 2);
      if (primeiraLivre) update("hora", primeiraLivre);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [horasConteo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.telefono.trim() || !form.nombre.trim() || !form.fecha) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    if (diaCerrado) {
      toast.error("No hay citas disponibles para este día");
      return;
    }
    setLoading(true);
    try {
      // 1. buscar o crear cliente por teléfono
      const { data: clientes } = await supabase
        .from("clientes")
        .select("id")
        .eq("telefono", form.telefono.trim())
        .limit(1);

      let clienteId: string;
      if (clientes && clientes.length > 0) {
        clienteId = clientes[0].id;
      } else {
        const partes = form.nombre.trim().split(" ");
        const nombre = partes[0];
        const apellidos = partes.slice(1).join(" ") || "Sin apellido";
        const { data: nuevo, error: errCliente } = await supabase
          .from("clientes")
          .insert({
            nombre,
            apellidos,
            telefono: form.telefono.trim(),
            email: form.email?.trim() || null,
          })
          .select("id")
          .single();
        if (errCliente) throw errCliente;
        clienteId = nuevo!.id;
      }

      // 2. buscar servicio y precios por nombre
      const { data: servicio, error: errServicio } = await supabase
        .from("servicios")
        .select("id, precio_turismo, precio_suv, precio_monovolumen, precio_furgoneta")
        .eq("nombre", form.servicio)
        .single();
      if (errServicio) throw errServicio;

      // 3. precio según tipo vehículo
      const precioMap: Record<string, number> = {
        turismo: servicio.precio_turismo,
        suv: servicio.precio_suv,
        monovolumen: servicio.precio_monovolumen,
        furgoneta: servicio.precio_furgoneta,
      };
      const precio = precioMap[form.tipo_vehiculo] ?? servicio.precio_turismo;

      // 4. vehículo placeholder para citas desde landing
      const matricula = `WEB-${form.telefono.replace(/\D/g, "").slice(-6)}`;
      const { data: vehiculos } = await supabase
        .from("vehiculos")
        .select("id")
        .eq("matricula", matricula)
        .limit(1);

      let vehiculoId: string;
      if (vehiculos && vehiculos.length > 0) {
        vehiculoId = vehiculos[0].id;
      } else {
        const { data: nuevoV, error: errV } = await supabase
          .from("vehiculos")
          .insert({
            cliente_id: clienteId,
            matricula,
            marca: "Por confirmar",
            modelo: "Por confirmar",
            tipo: form.tipo_vehiculo || "turismo",
          })
          .select("id")
          .single();
        if (errV) throw errV;
        vehiculoId = nuevoV!.id;
      }

      // 5. verificar capacidad en tiempo real antes de insertar
      const { data: citasHora } = await supabase
        .from("citas")
        .select("hora")
        .eq("fecha", form.fecha)
        .neq("estado", "cancelado");

      const countHora = (citasHora ?? []).filter(
        (c) => String(c.hora).substring(0, 5) === form.hora
      ).length;

      if (countHora >= 2) {
        toast.error(
          "Este horario ya está completo. Por favor elige otro horario."
        );
        void fetchHorasOcupadas(form.fecha);
        return;
      }

      // 6. insertar cita
      const { error: errCita } = await supabase.from("citas").insert({
        cliente_id: clienteId,
        vehiculo_id: vehiculoId,
        servicio_id: servicio.id,
        fecha: form.fecha,
        hora: form.hora,
        estado: "espera",
        precio_final: precio,
        notas: form.notas || null,
      });
      if (errCita) throw errCita;

      toast.success("¡Cita solicitada! Te confirmaremos por WhatsApp en breve.");
      const fechaReservada = form.fecha;
      setForm(defaultForm);
      setDiaCerrado(false);
      void fetchHorasOcupadas(fechaReservada);
    } catch (err) {
      console.error(err);
      toast.error("Error al enviar la solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 p-8 rounded-2xl bg-card border border-border space-y-5"
    >
      <BookingFormFields
        form={form}
        update={update}
        today={today}
        diaCerrado={diaCerrado}
        horasConteo={horasConteo}
        loadingSlots={loadingSlots}
        onFechaChange={handleFechaChange}
      />
      <button
        type="submit"
        disabled={loading || diaCerrado}
        className="w-full py-4 rounded-md bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition disabled:opacity-60 shadow-lg shadow-primary/30"
      >
        {loading ? "Enviando..." : "Solicitar Cita →"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        🔒 Tus datos están seguros. Te contactaremos para confirmar.
      </p>
    </form>
  );
}
