import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Contact() {
  return (
    <section id="contacto" className="py-24 px-6 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Visítanos en <span className="text-primary">Vigo</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <Row icon={<MapPin />} title="Dirección">
              Travesia de Vigo 105 Bajo
              <br />
              36205 Vigo (Pontevedra)
            </Row>
            <Row icon={<Phone />} title="Teléfono">
              <a href="tel:+34986137576" className="hover:text-primary">
                986 13 75 76
              </a>{" "}
              ·{" "}
              <a href="tel:+34698191512" className="hover:text-primary">
                698 191 512
              </a>
            </Row>
            <Row icon={<Mail />} title="Email">
              <a
                href="mailto:gtimotors2023@gmail.com"
                className="hover:text-primary"
              >
                gtimotors2023@gmail.com
              </a>
            </Row>
            <Row icon={<Clock />} title="Horario">
              Lun-Vie 9:00-19:00
              <br />
              Sáb 9:00-14:00 · Dom Cerrado
            </Row>
            <a
              href="https://wa.me/34698191512"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md font-semibold text-white transition hover:opacity-90 bg-[#25D366]"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Escríbenos por WhatsApp
            </a>
          </div>
          <div className="rounded-xl overflow-hidden border border-border h-[450px]">
            <iframe
              title="Mapa GTIMotors"
              src="https://www.google.com/maps?q=Travesia+de+Vigo+105+Vigo&output=embed"
              className="w-full h-full grayscale-[0.4] contrast-110"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-11 h-11 shrink-0 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}
