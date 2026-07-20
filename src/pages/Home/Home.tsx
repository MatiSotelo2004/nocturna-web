import { useState, useEffect } from "react";
import Item from "@/components/Item/Item";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Helmet } from "react-helmet-async";
import HeroSection from "@/components/Home/HeroSection";
import WhyNocturna from "@/components/Home/WhyNocturna";
import { Product } from "@/types";

export default function Home() {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [destacados, setDestacados] = useState<Product[]>([]);
  const PROD_DESTACADOS = 4;

  useEffect(() => {
    const getDestacados = async () => {
      setCargando(true);
      try {
        const prodDB = collection(db, "productos");
        const prodQuery = query(
          prodDB,
          orderBy("calificacion", "desc"),
          limit(PROD_DESTACADOS),
        );
        const resp = await getDocs(prodQuery);

        const docs = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Product[];
        setDestacados(docs);
      } catch (e: any) {
        setError(e.message);
        console.error(e.message);
      } finally {
        setCargando(false);
      }
    };

    getDestacados();
  }, []);

  if (error) {
    return (
      <Container className="py-5 text-center">
        <Helmet>
          <title>Error | Nocturna</title>
        </Helmet>
        <p className="text-danger h5">Error: {error}</p>
      </Container>
    );
  }

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

      <WhyNocturna />
    </>
  );
}
