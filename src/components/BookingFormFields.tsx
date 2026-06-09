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
  isSabado: boolean;
  horasConteo: Record<string, number>;
  loadingSlots: boolean;
  onFechaChange: (val: string) => void;
};

export function BookingFormFields({
  form,
  update,
  today,
  isSabado,
  horasConteo,
  loadingSlots,
  onFechaChange,
}: Props) {
  const horasDisponibles = isSabado
    ? HOURS.filter((h) => h <= "12:00")
    : HOURS;

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
            placeholder="665 058 633"
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
            onChange={(e) => onFechaChange(e.target.value)}
            className={inputCls}
          />
        </div>
      </div>

      {/* Hours picker */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Hora preferida
          {isSabado && (
            <span className="ml-2 text-xs text-muted-foreground font-normal">
              (Sáb: hasta 12:00)
            </span>
          )}
        </label>

        {!form.fecha ? (
          <p className="text-sm text-muted-foreground py-3">
            Selecciona una fecha para ver los horarios disponibles.
          </p>
        ) : loadingSlots ? (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-11 rounded-md bg-muted/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {horasDisponibles.map((h) => {
              const count = horasConteo[h] ?? 0;
              const bloqueado = count >= 2;
              const seleccionado = form.hora === h;
              return (
                <button
                  key={h}
                  type="button"
                  disabled={bloqueado}
                  onClick={() => update("hora", h)}
                  title={bloqueado ? "No disponible" : h}
                  className={[
                    "flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md text-sm font-medium transition select-none",
                    bloqueado
                      ? "bg-muted/30 text-muted-foreground line-through cursor-not-allowed opacity-40 pointer-events-none"
                      : seleccionado
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/30 ring-2 ring-primary/60"
                      : "bg-input border border-border text-foreground hover:border-primary hover:bg-card cursor-pointer",
                  ].join(" ")}
                >
                  <span>{h}</span>
                  {bloqueado && (
                    <span className="text-[10px] leading-none text-primary font-semibold not-italic">
                      No disponible
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
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
