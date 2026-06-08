export function BeforeAfter() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary text-xs font-bold tracking-widest">
            ANTES Y DESPUÉS
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
            Resultados que hablan{" "}
            <span className="text-primary">por sí solos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative overflow-hidden rounded-xl border border-border aspect-[4/3]">
            <img
              src="https://i.imgur.com/0Vxlf8K.jpg"
              alt="Antes del servicio GTIMotors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#CC0000] text-white text-xs font-bold tracking-widest uppercase shadow-lg">
              ANTES
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-border aspect-[4/3]">
            <img
              src="https://i.imgur.com/bLO7KF2.jpg"
              alt="Después del servicio GTIMotors"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#CC0000] text-white text-xs font-bold tracking-widest uppercase shadow-lg">
              DESPUÉS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
