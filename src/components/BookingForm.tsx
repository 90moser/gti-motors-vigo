import { useState } from "react";
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
  const [form, setForm] = useState<FormValues>(defaultForm);

  const update = (k: keyof FormValues, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.telefono.trim() || !form.nombre.trim() || !form.fecha) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      // 1. buscar o crear cliente por teléfono
      const { data: clienteExistente } = await supabase
        .from("clientes")
        .select("id")
        .eq("telefono", form.telefono.trim())
        .single();

      let clienteId: string | number;
      if (clienteExistente) {
        clienteId = clienteExistente.id;
      } else {
        const parts = form.nombre.trim().split(" ");
        const { data: novoCliente, error: ce } = await supabase
          .from("clientes")
          .insert({
            nombre: parts[0],
            apellidos: parts.slice(1).join(" ") || "Sin apellido",
            telefono: form.telefono.trim(),
            email: form.email.trim() || null,
          })
          .select("id")
          .single();
        if (ce) throw ce;
        clienteId = novoCliente!.id;
      }

      // 2. buscar servicio y precios por nombre
      const { data: servicio, error: se } = await supabase
        .from("servicios")
        .select("id, precio_turismo, precio_suv, precio_monovolumen, precio_furgoneta")
        .eq("nombre", form.servicio)
        .single();
      if (se) throw se;

      // 3. calcular precio según tipo vehículo
      const precioMap: Record<string, number | null> = {
        turismo: servicio.precio_turismo,
        suv: servicio.precio_suv,
        monovolumen: servicio.precio_monovolumen,
        furgoneta: servicio.precio_furgoneta,
      };
      const precio = precioMap[form.tipo_vehiculo] ?? servicio.precio_turismo;

      // 4. buscar o crear vehículo placeholder por matrícula
      const matriculaPlaceholder = `LANDING-${form.telefono.trim().slice(-4)}`;
      const { data: vehiculoExistente } = await supabase
        .from("vehiculos")
        .select("id")
        .eq("matricula", matriculaPlaceholder)
        .single();

      let vehiculoId: string | number;
      if (vehiculoExistente) {
        vehiculoId = vehiculoExistente.id;
      } else {
        const { data: novoVehiculo, error: ve } = await supabase
          .from("vehiculos")
          .insert({
            cliente_id: clienteId,
            matricula: matriculaPlaceholder,
            marca: "Por confirmar",
            modelo: "Por confirmar",
            tipo: form.tipo_vehiculo,
          })
          .select("id")
          .single();
        if (ve) throw ve;
        vehiculoId = novoVehiculo!.id;
      }

      // 5. insertar cita con estado='espera'
      const { error: ie } = await supabase.from("citas").insert({
        cliente_id: clienteId,
        vehiculo_id: vehiculoId,
        servicio_id: servicio.id,
        fecha: form.fecha,
        hora: form.hora,
        estado: "espera",
        precio_final: precio,
        notas: form.notas.trim() || null,
      });
      if (ie) throw ie;

      toast.success("¡Cita solicitada! Te confirmaremos por WhatsApp.");
      setForm(defaultForm);
    } catch (err: any) {
      console.error(err);
      toast.error("No se pudo enviar la cita. Llámanos al 698 191 512.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 p-8 rounded-2xl bg-card border border-border space-y-5"
    >
      <BookingFormFields form={form} update={update} today={today} />
      <button
        type="submit"
        disabled={loading}
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
