import { Instagram } from "lucide-react";
import { WhatsAppIcon } from "./Contact";

export function Footer() {
  return (
    <footer className="border-t-2 border-primary bg-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="text-2xl font-extrabold">
              <span className="text-primary">GTI</span>
              <span className="text-foreground">Motors</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Lavado y mecánica premium en Vigo.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-center">
            {[
              ["Servicios", "#servicios"],
              ["Sobre Nosotros", "#sobre-nosotros"],
              ["Reservar", "#reservar"],
              ["Privacidad", "#"],
            ].map(([l, h]) => (
              <a
                key={l}
                href={h}
                className="text-muted-foreground hover:text-primary transition"
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="flex gap-3 md:justify-end">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://wa.me/34698191512"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          © 2025 GTIMotors 2020 SLU · CIF B23860984 · Vigo, España
        </div>
      </div>
    </footer>
  );
}
