import { BookingForm } from "./BookingForm";

export function Booking() {
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
        <BookingForm />
      </div>
    </section>
  );
}
