import { Container, Row, Col } from "react-bootstrap";
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
    <footer className="bg-primary text-text-secondary py-5">
      <Container>
        {/* SOBRE NOSOTROS */}
        <Row className="gy-4 align-items-center mb-4">
          <Col xs={12} md={6}>
            <h2 className="text-accent-primary font-serif tracking-widest mb-3">
              NOCTURNA
            </h2>
            <p className="mb-0 text-text-secondary" style={{ maxWidth: "500px" }}>
              Somos una librería online especializada en literatura de fantasía,
              terror, thriller y manga. Nacimos en 2026 con una misión simple:
              poner el libro perfecto en las manos correctas.
            </p>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column gap-2 text-md-end text-start">
            <div>📍 Buenos Aires, Argentina</div>
            <div>✉️ hola@nocturna.com.ar</div>
            <div>📞 +54 11 4587-0010</div>
          </Col>
        </Row>

        <hr style={{ borderColor: "rgba(155, 151, 168, 0.15)" }} className="my-4" />

        {/* NUESTRO EQUIPO */}
        <div className="mb-4">
          <h3 className="text-accent-primary text-center mb-4 font-serif">
            NUESTRO EQUIPO
          </h3>
          <Row className="g-4">
            {teamMembers.map((member) => (
              <Col key={member.id} xs={12} md={4}>
                <TeamCard {...member} />
              </Col>
            ))}
          </Row>
        </div>

        <hr style={{ borderColor: "rgba(155, 151, 168, 0.15)" }} className="my-4" />

        {/* DERECHOS RESERVADOS */}
        <Row className="align-items-center gy-2">
          <Col xs={12} sm={6} className="text-center text-sm-start text-text-secondary text-sm">
            © 2026 Nocturna · Todos los derechos reservados
          </Col>
          <Col xs={12} sm={6} className="text-center text-sm-end text-accent-primary font-serif tracking-widest">
            NOCTURNA
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
