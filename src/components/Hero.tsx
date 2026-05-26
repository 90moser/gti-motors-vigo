export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-16">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-semibold tracking-wide animate-fade-in">
          VIGO, ESPAÑA
        </span>
        <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] animate-fade-up">
          Cuidado y belleza
          <br />
          <span className="text-primary">para tu vehículo.</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-light text-foreground/90 animate-fade-up">
          No es un trabajo — es una pasión.
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed animate-fade-up">
          Desde 2022, el equipo de GTIMotors cuida cada vehículo como si fuera
          el propio. Lavado, detailing y mecánica de élite en el corazón de
          Vigo.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
          <a
            href="#reservar"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/30"
          >
            Reservar Cita Online
          </a>
          <a
            href="#servicios"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-md border border-foreground/30 text-foreground font-semibold hover:bg-foreground/10 transition"
          >
            Ver Servicios
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-up">
          {[
            ["2022", "Fundación"],
            ["+150", "coches/mes"],
            ["4.9 ⭐", "Google"],
          ].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {n}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
