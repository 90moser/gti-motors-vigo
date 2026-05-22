import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GTIMotors — Lavado y Mecánica Premium en Vigo" },
      {
        name: "description",
        content:
          "Lavado, detailing y mecánica de élite en Vigo. Reserva tu cita online 24/7. Desde 2022 cuidamos tu vehículo como si fuera el nuestro.",
      },
      { property: "og:title", content: "GTIMotors — Lavado y Mecánica Premium en Vigo" },
      {
        property: "og:description",
        content:
          "Lavado, detailing y mecánica de élite en Vigo. Reserva online 24/7.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster theme="dark" position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Stats />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
