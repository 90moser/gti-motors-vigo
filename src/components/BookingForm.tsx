import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { BookingFormFields, SERVICES, VEHICLES, HOURS } from "./BookingFormFields";

const today = new Date().toISOString().split("T")[0];

const defaultForm = {
  nombre: "",
  telefono: "",
  servicio: SERVICES[0],
  vehiculo: VEHICLES[0],
  fecha: "",
  hora: HOURS[0],
  notas: "",
};

export function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(defaultForm);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.telefono.trim() || !form.nombre.trim() || !form.fecha) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      // 1. buscar o crear cliente por teléfono
      let clienteId: string | number | null = null;
      const { data: existing } = await supabase
        .from("clientes")
        .select("id")
        .eq("telefono", form.telefono.trim())
        .maybeSingle();

      if (existing?.id) {
        clienteId = existing.id;
      } else {
        const { data: created, error: ce } = await supabase
          .from("clientes")
          .insert({ nombre: form.nombre.trim(), telefono: form.telefono.trim() })
          .select("id")
          .single();
        if (ce) throw ce;
        clienteId = created?.id ?? null;
      }

      // 2. buscar servicio por nombre
      const { data: srv } = await supabase
        .from("servicios")
        .select("id")
        .ilike("nombre", form.servicio)
        .maybeSingle();
      const servicioId = srv?.id ?? null;

      // 3. insertar cita con estado='espera'
      const { error: ie } = await supabase.from("citas").insert({
        cliente_id: clienteId,
        servicio_id: servicioId,
        fecha: form.fecha,
        hora: form.hora,
        notas: `${form.vehiculo}${form.notas ? " · " + form.notas : ""}`,
        estado: "espera",
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
