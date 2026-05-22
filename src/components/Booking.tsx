import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const SERVICES = [
  "Lavado Express",
  "Lavado Completo",
  "Lavado Premium",
  "Tapicería en Seco",
  "Tapicería Completa",
  "Pulido de Faros",
  "Mecánica",
];

const VEHICLES = ["Turismo", "SUV", "Monovolumen", "Furgoneta"];

const HOURS = (() => {
  const out: string[] = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

const today = new Date().toISOString().split("T")[0];

export function Booking() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    servicio: SERVICES[0],
    vehiculo: VEHICLES[0],
    fecha: "",
    hora: HOURS[0],
    notas: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.telefono.trim() || !form.nombre.trim() || !form.fecha) {
      toast.error("Por favor completa los campos obligatorios");
      return;
    }
    setLoading(true);
    try {
      // 1. find or create cliente by telefono
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
          .insert({
            nombre: form.nombre.trim(),
            telefono: form.telefono.trim(),
          })
          .select("id")
          .single();
        if (ce) throw ce;
        clienteId = created?.id ?? null;
      }

      // 2. find servicio
      let servicioId: string | number | null = null;
      const { data: srv } = await supabase
        .from("servicios")
        .select("id")
        .ilike("nombre", form.servicio)
        .maybeSingle();
      servicioId = srv?.id ?? null;

      // 3. insert cita
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
      setForm({
        nombre: "",
        telefono: "",
        servicio: SERVICES[0],
        vehiculo: VEHICLES[0],
        fecha: "",
        hora: HOURS[0],
        notas: "",
      });
    } catch (err: any) {
      console.error(err);
      toast.error("No se pudo enviar la cita. Llámanos al 698 191 512.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition";

  return (
    <section id="reservar" className="py-24 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Reserva tu cita <span className="text-primary">online</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Disponible 24/7 — Te confirmamos por WhatsApp
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 p-8 rounded-2xl bg-card border border-border space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre completo *
              </label>
              <input
                required
                value={form.nombre}
                onChange={(e) => update("nombre", e.target.value)}
                className={inputCls}
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Teléfono / WhatsApp *
              </label>
              <input
                required
                type="tel"
                value={form.telefono}
                onChange={(e) => update("telefono", e.target.value)}
                className={inputCls}
                placeholder="698 191 512"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Servicio</label>
              <select
                value={form.servicio}
                onChange={(e) => update("servicio", e.target.value)}
                className={inputCls}
              >
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Tipo de vehículo
              </label>
              <select
                value={form.vehiculo}
                onChange={(e) => update("vehiculo", e.target.value)}
                className={inputCls}
              >
                {VEHICLES.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Fecha preferida *
              </label>
              <input
                required
                type="date"
                min={today}
                value={form.fecha}
                onChange={(e) => update("fecha", e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Hora preferida
              </label>
              <select
                value={form.hora}
                onChange={(e) => update("hora", e.target.value)}
                className={inputCls}
              >
                {HOURS.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Notas (opcional)
            </label>
            <textarea
              value={form.notas}
              onChange={(e) => update("notas", e.target.value)}
              rows={3}
              maxLength={500}
              className={inputCls}
              placeholder="Marca, modelo, observaciones..."
            />
          </div>
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
      </div>
    </section>
  );
}
