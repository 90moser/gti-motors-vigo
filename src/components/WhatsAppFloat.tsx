import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./Contact";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <a
      href="https://wa.me/34698191512?text=Hola%20GTIMotors%2C%20quiero%20información"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition animate-fade-in"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 10px 30px rgba(37, 211, 102, 0.5)",
      }}
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
