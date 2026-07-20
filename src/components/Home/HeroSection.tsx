import { Container } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.heroGradient}>
      <Container
        className="transicion-pagina"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          <p
            className="text-accent-primary mb-3 text-uppercase fw-semibold"
            style={{ letterSpacing: "4px", fontSize: "0.8rem" }}
          >
            ✦ TU PRÓXIMA HISTORIA FAVORITA TE ESPERA
          </p>

          <h1
            className="font-serif display-3 mb-3 fw-bold text-light"
            style={{ maxWidth: "800px" }}
          >
            Historias que esperan <br />
            <em className="text-accent-primary">la noche</em>
          </h1>

          <p
            className="text-text-secondary fs-5 mb-5"
            style={{ maxWidth: "550px", lineHeight: "1.6" }}
          >
            Libros, manga y mucho más para los que leen cuando el mundo duerme.
            Fantasía, terror, thriller y todo lo que enciende la imaginación.
          </p>

          <div>
            <Link
              to="/productos"
              className="btn btn-gold btn-lg d-inline-flex align-items-center gap-2"
            >
              <span>Explorar catálogo</span>
              <FaArrowRight style={{ fontSize: "0.85rem" }} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
