export const inputCls =
  "w-full px-4 py-3 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition";

export const SERVICES = [
  "Lavado Express",
  "Lavado Completo",
  "Lavado Premium",
  "Tapicería en Seco",
  "Tapicería Completa",
  "Pulido de Faros",
  "Mecánica",
];

export const VEHICLES = [
  { value: "turismo", label: "Turismo" },
  { value: "suv", label: "SUV" },
  { value: "monovolumen", label: "Monovolumen" },
  { value: "furgoneta", label: "Furgoneta" },
];

export const HOURS = (() => {
  const out: string[] = [];
  for (let h = 9; h <= 18; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  return out;
})();

export type FormValues = {
  nombre: string;
  telefono: string;
  email: string;
  servicio: string;
  tipo_vehiculo: string;
  fecha: string;
  hora: string;
  notas: string;
};

type Props = {
  form: FormValues;
  update: (k: keyof FormValues, v: string) => void;
  today: string;
};

export function BookingFormFields({ form, update, today }: Props) {
  return (
    <>
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
            placeholder="Tu nombre y apellidos"
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
          <label className="block text-sm font-medium mb-2">
            Email (opcional)
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            placeholder="tu@email.com"
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
            value={form.tipo_vehiculo}
            onChange={(e) => update("tipo_vehiculo", e.target.value)}
            className={inputCls}
          >
            {VEHICLES.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
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
    </>
  );
}
