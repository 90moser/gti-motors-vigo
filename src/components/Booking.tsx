import { BookingForm } from "./BookingForm";

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
        <BookingForm />
      </div>
    </section>
  );
}
