import { BookingForm } from "./BookingForm";

// Cambiar a true para reactivar el formulario online
const RESERVAS_ACTIVAS = false;

export function Booking() {
  return (
    <section id="reservar" className="relative overflow-hidden py-24 px-6">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://i.imgur.com/ns39VTW.jpg')]" />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Reserva tu cita <span className="text-primary">online</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Disponible 24/7 — Te confirmamos por WhatsApp
          </p>
        </div>

        {RESERVAS_ACTIVAS ? (
          <BookingForm />
        ) : (
          <div className="mt-12 p-10 rounded-2xl bg-card/80 border border-border text-center space-y-6">
            <p className="text-3xl">🔧</p>
            <p className="text-xl font-semibold text-foreground">
              Las citas online están temporalmente desactivadas.
            </p>
            <p className="text-muted-foreground">
              Para reservar, contáctanos directamente:
            </p>
            <div className="space-y-3">
              <a
                href="tel:+34986137576"
                className="flex items-center justify-center gap-3 text-lg font-medium text-foreground hover:text-primary transition"
              >
                <span className="text-2xl">📞</span> 986 13 75 76
              </a>
              <a
                href="tel:+34665058633"
                className="flex items-center justify-center gap-3 text-lg font-medium text-foreground hover:text-primary transition"
              >
                <span className="text-2xl">📱</span> +34 665 058 633
              </a>
            </div>
            <p className="text-muted-foreground text-lg pt-2">
              ¡Hasta pronto! 🏎️
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
