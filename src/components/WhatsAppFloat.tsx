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
      href="https://wa.me/34665058633?text=Hola%20GTIMotors%2C%20quiero%20información"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white hover:scale-110 transition animate-fade-in bg-[#25D366] shadow-[0_10px_30px_rgba(37,211,102,0.5)]"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
}
