const stats = [
  ["2022", "Año de fundación"],
  ["+150", "Coches al mes"],
  ["3", "Profesionales"],
  ["4.9 ⭐", "Valoración Google"],
  ["+200", "Reseñas Google"],
];

export function Stats() {
  return (
    <section className="py-20 px-6 bg-primary">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        {stats.map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-primary-foreground">
              {n}
            </div>
            <div className="mt-2 text-sm md:text-base text-primary-foreground/80 font-medium">
              {l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
