import TeamCard from "./TeamCard";

const teamMembers = [
  {
    id: 1,
    nombre: "Matías Sotelo",
    rol: "Fundador & CEO",
    bio: "Apasionado por los libros. Creó Nocturna para que nadie se quede sin su próxima historia favorita.",
    iniciales: "MS",
  },
  {
    id: 2,
    nombre: "Paula López",
    rol: "Responsable de Comunicación y Catálogo",
    bio: "Estudiante de Relaciones Públicas y lectora apasionada. Se encarga de la atención, la curaduría de los títulos y de la comunicación con los lectores. Tiene el talento innato de recomendar el libro indicado y contagiar su amor por la lectura.",
    iniciales: "PL",
  },
  {
    id: 3,
    nombre: "Bárbara Capristo",
    rol: "Coordinadora de Gestión y Administración",
    bio: "Estudiante de profesorado de inglés y encargada de la organización interna del local. Aunque prefiere la música y la cultura pop antes que los libros, aporta la estructura, el orden y la energía necesaria para que el día a día de Nocturna funcione a la perfección.",
    iniciales: "BC",
  },
];

function Footer() {
  return (
    <footer className="bg-primary items-center text-text-secondary p-9">
      {/* SOBRE NOSOTROS */}
      <div className="pb-6">
        <h2 className="text-2xl text-accent-primary font-titulo tracking-widest">
          NOCTURNA
        </h2>
        <div className="flex justify-between items-center font-sans text-sm">
          <p className="max-w-2xl ">
            Somos una librería online especializada en literatura de fantasía,
            terror, thriller y manga. Nacimos en 2026 con una misión simple:
            poner el libro perfecto en las manos correctas.
          </p>
          <div className="flex flex-col">
            <p>📍 Buenos Aires, Argentina</p>
            <p>✉️ hola@nocturna.com.ar</p>
            <p>📞 +54 11 4587-0010</p>
          </div>
        </div>
      </div>
      {/* DIVISOR */}
      <div className="border-t border-t-gray-700 flex justify-between items-center pt-6"></div>
      {/* NUESTRO EQUIPO */}
      <div className="pb-6">
        <h3 className="text-accent-primary text-lg text-center mb-6 ">
          NUESTRO EQUIPO
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
      {/* DIVISOR */}
      <div className="border-t border-t-gray-700 flex justify-between items-center pt-6"></div>
      {/* DERECHOS RESERVADOS */}
      <div className="flex justify-between">
        <p className="text-sm text-text-secondary">
          © 2026 Nocturna · Todos los derechos reservados
        </p>
        <p className="text-sm font-titulo text-accent-primary tracking-widest">
          NOCTURNA
        </p>
      </div>
    </footer>
  );
}

export default Footer;
