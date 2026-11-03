import { Container } from "react-bootstrap";

export default function WhyNocturna() {
  return (
    <section
      className="py-5 text-center bg-secondary"
      style={{
        borderTop: "1px solid rgba(155, 151, 168, 0.1)",
        borderBottom: "1px solid rgba(155, 151, 168, 0.1)",
      }}
    >
      <Container className="py-3">
        <p
          className="text-accent-primary text-uppercase mb-3 fw-semibold"
          style={{ letterSpacing: "3px", fontSize: "0.75rem" }}
        >
          ¿Por qué Nocturna?
        </p>
        <h2
          className="font-serif h2 mb-4 text-light mx-auto"
          style={{ maxWidth: "600px" }}
        >
          Un espacio para los que leen cuando el mundo duerme
        </h2>
        <p
          className="text-text-secondary mx-auto mb-0"
          style={{
            maxWidth: "550px",
            fontSize: "0.95rem",
            lineHeight: "1.6",
          }}
        >
          Seleccionamos cada título con cuidado. Desde clásicos atemporales
          hasta los mangas más aclamados, Nocturna es tu librería de cabecera.
        </p>
      </Container>
    </section>
  );
}
