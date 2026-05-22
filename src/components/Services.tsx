import {
  Zap,
  Star,
  Crown,
  Layers,
  Sparkles,
  Lightbulb,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  name: string;
  desc: string;
  price: string;
  badge: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: Zap,
    name: "Lavado Express",
    desc: "Lavado exterior básico, secado, aspirado superficial, cristales y ambientador. Listo en 15-20 minutos.",
    price: "desde 15 €",
    badge: "Todos los vehículos",
  },
  {
    icon: Star,
    name: "Lavado Completo",
    desc: "Limpieza exterior, interior completo, cristales, llantas, maletero y secado.",
    price: "Turismo 27€ · SUV 30€ · Furgoneta 30€",
    badge: "MÁS POPULAR",
    featured: true,
  },
  {
    icon: Crown,
    name: "Lavado Premium",
    desc: "Cera carnauba, interior detallado, hidratación de puertas y paneles, llantas, cristales, maletero y secado.",
    price: "Turismo 30€ · SUV 35€",
    badge: "Premium",
  },
  {
    icon: Layers,
    name: "Tapicería en Seco",
    desc: "Limpieza profunda en seco de tapicería completa. Entrega en 24 horas.",
    price: "Turismo 65€ · SUV 80€",
    badge: "24h",
  },
  {
    icon: Sparkles,
    name: "Tapicería Completa",
    desc: "Limpieza completa de tapicería con agua. Plazo 48-72 horas.",
    price: "desde 120 €",
    badge: "Detailing",
  },
  {
    icon: Lightbulb,
    name: "Pulido de Faros",
    desc: "Pulido y restauración de faros amarillentos.",
    price: "Unidad 30€ · Par 50€",
    badge: "Restauración",
  },
  {
    icon: Wrench,
    name: "Mecánica",
    desc: "Servicio de mecánica general con profesionales cualificados.",
    price: "45 €/hora + IVA",
    badge: "Profesional",
  },
];

export function Services() {
  return (
    <section id="servicios" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Nuestros <span className="text-primary">Servicios</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Elige el tratamiento que merece tu vehículo
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.name}
                className={`relative group p-7 rounded-xl bg-card border transition-all hover:-translate-y-1 ${
                  s.featured
                    ? "border-primary shadow-xl shadow-primary/20"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {s.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold tracking-wider">
                    {s.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center text-primary mb-5">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold">{s.name}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
                <div className="mt-6 pt-5 border-t border-border">
                  <div className="text-sm font-semibold text-primary">
                    {s.price}
                  </div>
                  {!s.featured && (
                    <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {s.badge}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
