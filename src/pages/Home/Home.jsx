import { useState, useEffect } from "react";
import Item from "../../components/Item/Item";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productsServices";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import styles from "./Home.module.css";

export default function Home() {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    document.title = "Nocturna | Librería Online para Noctámbulos";
    getProducts()
      .then((prod) => {
        const mejores = [...prod]
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, 4);
        setDestacados(mejores);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (error) {
    return (
      <Container className="py-5 text-center">
        <p className="text-danger h5">Error: {error}</p>
      </Container>
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className={styles.heroGradient}>
        <Container className="transicion-pagina" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
          <div >
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
              Libros, manga y mucho más para los que leen cuando el mundo
              duerme. Fantasía, terror, thriller y todo lo que enciende la
              imaginación.
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

      {/* ── DESTACADOS ── */}
      <section className="py-5">
        <Container>
          <div className="d-flex align-items-end justify-content-between mb-5">
            <div>
              <p
                className="text-accent-primary text-uppercase mb-2 fw-semibold"
                style={{ letterSpacing: "2.5px", fontSize: "0.75rem" }}
              >
                Selección editorial
              </p>
              <h2 className="font-serif h2 text-light">Los más valorados</h2>
            </div>
          </div>

          {cargando ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="warning" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
              <p className="text-text-secondary mt-3">Cargando destacados...</p>
            </div>
          ) : (
            <Row className="g-4">
              {destacados.map((producto) => (
                <Col key={producto.id} xs={12} sm={6} md={4} lg={3}>
                  <Item {...producto} />
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* ── SOBRE NOSOTROS ── */}
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
    </>
  );
}
