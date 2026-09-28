import Item from "@/components/Item/Item";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/Home/HeroSection";
import WhyNocturna from "@/components/Home/WhyNocturna";
import { useQuery } from "@tanstack/react-query";
import { getFeatureProducts } from "@/services/productService";

export default function Home() {
  const {
    data: destacados = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["feature"],
    queryFn: () => getFeatureProducts(),
  });

  return (
    <>
      <Helmet>
        <title>Nocturna | Librería Online para Noctámbulos</title>
        <meta
          name="description"
          content="Nocturna es la librería online perfecta para los amantes de la fantasía, el terror, los thrillers intensos y el buen manga."
        />
      </Helmet>

      <HeroSection />

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
          {isError && (
            <h3 style={{ color: "red", textAlign: "center" }}>
              Error al cargar los productos
            </h3>
          )}
          {isLoading ? (
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

      <WhyNocturna />
    </>
  );
}
