import { Check } from "lucide-react";

export function About() {
  return (
    <section id="sobre-nosotros" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full" />
          <img
            src="https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800"
            alt="Andrés Felipe, fundador de GTIMotors, trabajando"
            className="relative w-full rounded-xl border border-border shadow-2xl object-cover aspect-[4/5]"
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-primary text-xs font-bold tracking-widest">
            NUESTRA HISTORIA
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Dos amigos, <span className="text-primary">una pasión.</span>
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hay negocios que nacen de una oportunidad. GTIMotors nació de algo
              más profundo: la obsesión por el detalle y el amor incondicional
              por el automóvil.
            </p>
            <p>
              Andrés Felipe y su socio llevan toda la vida rodeados de coches.
              En 2022, transformaron esa pasión en GTIMotors: un espacio en Vigo
              pensado para quienes exigen lo mejor para su vehículo.
            </p>
            <p>
              Hoy, nuestro equipo de tres profesionales cualificados trabaja con
              la misma filosofía del primer día: atención personalizada,
              productos de primera calidad y resultados que hablan por sí solos.
            </p>
          </div>
          <ul className="mt-8 space-y-3">
            {[
              "Productos premium de primera calidad",
              "Equipo cualificado con años de experiencia",
              "Atención personalizada en cada vehículo",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <Check size={14} strokeWidth={3} />
                </span>
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
