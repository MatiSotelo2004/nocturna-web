const valores = [
  {
    titulo: "Curaduría",
    texto:
      "Cada libro que entra al catálogo pasa por nuestro equipo. No vendemos de todo, vendemos lo que vale la pena leer.",
  },
  {
    titulo: "Comunidad",
    texto:
      "Nocturna no es solo una tienda. Es un espacio para los que viven entre páginas y siempre tienen un libro en la mesita.",
  },
  {
    titulo: "Diversidad",
    texto:
      "Literatura latinoamericana, clásicos europeos, manga japonés. Creemos que las buenas historias no tienen fronteras.",
  },
];

export default function AboutUs() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-secondary to-primary" />

        <div className="relative max-w-3xl mx-auto text-center transicion-pagina">
          <p className="text-xs tracking-[4px] text-accent-primary uppercase mb-6">
            ✦ Quiénes somos
          </p>
          <h1 className="font-serif text-5xl mb-6 leading-tight">
            Nació de noche,{" "}
            <em className="text-accent-primary">
              como todo lo bueno
            </em>
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Nocturna es una librería online fundada en 2026 con una misión
            simple: poner el libro perfecto en las manos correctas. Somos un
            equipo pequeño y apasionado, convencido de que cada historia tiene
            su lector y cada lector tiene su historia.
          </p>
        </div>
      </section>

      {/* ── HISTORIA ── */}
      <section className="max-w-4xl mx-auto px-6 py-12 transicion-pagina-horizontal">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12  items-center">
          <div>
            <p className="text-xs tracking-[3px] text-accent-primary uppercase mb-4">
              Nuestra historia
            </p>
            <h2 className="font-serif text-3xl mb-6 leading-snug">
              Empezó con una pila de libros y muchas ganas
            </h2>
          </div>
          <div className="flex flex-col">
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Todo empezó en una habitación con demasiados libros apilados y la
              convicción de que encontrar una buena lectura no debería ser
              difícil. Nocturna nació para resolver eso: un catálogo curado, sin
              ruido, donde cada título tiene un porqué.
            </p>
            <p className="text-text-secondary text-sm leading-relaxed">
              Hoy contamos con libros de terror, fantasía, thriller, clásicos,
              dark romance y una sección de manga que crece con cada temporada.
              Porque leer no tiene un solo formato ni un solo horario.
            </p>
          </div>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section className="bg-secondary border-y border-[#2a2a32] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[3px] text-accent-primary uppercase mb-3">
              Lo que nos mueve
            </p>
            <h2 className="font-serif text-3xl">
              Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {valores.map((valor) => (
              <div key={valor.titulo} className="text-center px-4">
                <h3 className="font-serif text-xl text-accent-primary mb-3">
                  {valor.titulo}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {valor.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
