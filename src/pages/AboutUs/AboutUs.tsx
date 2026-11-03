import { Container, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Sobre Nosotros | Nocturna</title>
        <meta
          name="description"
          content="Conoce la historia de Nocturna, una librería online fundada con la misión de conectar lectores noctámbulos con historias increíbles."
        />
      </Helmet>
      {/* ── HERO ── */}
      <section
        className="py-5"
        style={{
          background:
            "linear-gradient(to bottom, var(--secondary), var(--primary))",
          minHeight: "40vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container className="text-center transicion-pagina py-4">
          <p
            className="text-accent-primary text-uppercase mb-3 fw-semibold"
            style={{ letterSpacing: "3px", fontSize: "0.75rem" }}
          >
            ✦ Quiénes somos
          </p>
          <h1 className="font-serif display-4 mb-4 text-light fw-bold">
            Nació de noche,{" "}
            <em className="text-accent-primary">como todo lo bueno</em>
          </h1>
          <p
            className="text-text-secondary fs-5 mx-auto mb-0"
            style={{ maxWidth: "700px", lineHeight: "1.6" }}
          >
            Nocturna es una librería online fundada en 2026 con una misión
            simple: poner el libro perfecto en las manos correctas. Somos un
            equipo pequeño y apasionado, convencido de que cada historia tiene
            su lector y cada lector tiene su historia.
          </p>
        </Container>
      </section>

      {/* ── HISTORIA ── */}
      <section className="py-5">
        <Container className="transicion-pagina-horizontal py-3">
          <Row className="gy-4 align-items-center">
            <Col xs={12} md={6}>
              <p
                className="text-accent-primary text-uppercase mb-2 fw-semibold"
                style={{ letterSpacing: "2.5px", fontSize: "0.75rem" }}
              >
                Nuestra historia
              </p>
              <h2
                className="font-serif h2 text-light mb-0"
                style={{ lineHeight: "1.3" }}
              >
                Empezó con una pila de libros y muchas ganas
              </h2>
            </Col>
            <Col xs={12} md={6}>
              <p
                className="text-text-secondary mb-3"
                style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
              >
                Todo empezó en una habitación con demasiados libros apilados y
                la convicción de que encontrar una buena lectura no debería ser
                difícil. Nocturna nació para resolver eso: un catálogo curado,
                sin ruido, donde cada título tiene un porqué.
              </p>
              <p
                className="text-text-secondary mb-0"
                style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
              >
                Hoy contamos con libros de terror, fantasía, thriller, clásicos,
                dark romance y una sección de manga que crece con cada
                temporada. Porque leer no tiene un solo formato ni un solo
                horario.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── VALORES ── */}
      <section
        className="bg-secondary py-5"
        style={{
          borderTop: "1px solid rgba(155, 151, 168, 0.1)",
          borderBottom: "1px solid rgba(155, 151, 168, 0.1)",
        }}
      >
        <Container className="py-3">
          <div className="text-center mb-5">
            <p
              className="text-accent-primary text-uppercase mb-2 fw-semibold"
              style={{ letterSpacing: "3px", fontSize: "0.75rem" }}
            >
              Lo que nos mueve
            </p>
            <h2 className="font-serif h2 text-light">Nuestros valores</h2>
          </div>

          <Row className="g-4">
            {valores.map((valor) => (
              <Col
                key={valor.titulo}
                xs={12}
                md={4}
                className="text-center px-4"
              >
                <h3 className="font-serif h4 text-accent-primary mb-3">
                  {valor.titulo}
                </h3>
                <p
                  className="text-text-secondary mb-0"
                  style={{ fontSize: "0.9rem", lineHeight: "1.6" }}
                >
                  {valor.texto}
                </p>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
