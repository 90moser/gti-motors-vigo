const reviews = [
  {
    name: "Carlos R.",
    initials: "CR",
    color: "bg-blue-600",
    stars: 5,
    text: "Servicio impecable, el coche quedó como nuevo. Andrés y su equipo son unos profesionales. Repetiré sin duda.",
    service: "Lavado Premium",
  },
  {
    name: "María L.",
    initials: "ML",
    color: "bg-purple-600",
    stars: 5,
    text: "La tapicería de mi coche parecía imposible de limpiar después de tantos años. La dejaron perfecta. Muy recomendable.",
    service: "Tapicería Completa",
  },
  {
    name: "Javier M.",
    initials: "JM",
    color: "bg-green-600",
    stars: 5,
    text: "Rápidos, eficientes y con un resultado espectacular. El precio es muy razonable para la calidad que ofrecen.",
    service: "Lavado Completo",
  },
  {
    name: "Ana P.",
    initials: "AP",
    color: "bg-orange-600",
    stars: 5,
    text: "Los mejores en Vigo sin duda. Cuidan el coche como si fuera suyo. El pulido de faros quedó increíble.",
    service: "Pulido de Faros",
  },
  {
    name: "Roberto S.",
    initials: "RS",
    color: "bg-red-600",
    stars: 5,
    text: "Llevo años siendo cliente y nunca me han fallado. Servicio de confianza en Vigo. Muy profesionales.",
    service: "Cliente habitual",
  },
  {
    name: "Laura G.",
    initials: "LG",
    color: "bg-teal-600",
    stars: 5,
    text: "Pedí cita online y todo fue perfecto. Me confirmaron por WhatsApp enseguida. El resultado del lavado, perfecto.",
    service: "Lavado Express",
  },
];

export function Reviews() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Lo que dicen nuestros{" "}
            <span className="text-primary">clientes</span>
          </h2>
          <a
            href="https://maps.google.com/?q=GTIMotors+Vigo"
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 text-lg text-muted-foreground hover:text-primary transition"
          >
            ⭐ 4.9 · Más de 200 reseñas en Google
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <article
              key={r.name}
              className="p-6 rounded-xl bg-card border border-border flex flex-col gap-4 hover:border-primary/40 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${r.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
                >
                  {r.initials}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{r.name}</div>
                  <div className="text-xs text-primary font-medium">
                    {r.service}
                  </div>
                </div>
                <div className="ml-auto text-yellow-400 text-sm tracking-tight">
                  {"★".repeat(r.stars)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "{r.text}"
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://maps.google.com/?q=GTIMotors+Vigo"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border text-foreground font-semibold hover:border-primary hover:text-primary transition"
          >
            Ver todas las reseñas en Google →
          </a>
        </div>
      </div>
    </section>
  );
}
