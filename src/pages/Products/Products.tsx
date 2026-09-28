import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ItemList from "@/components/ItemList/ItemList";
import ItemListSkeleton from "@/components/ItemList/ItemListSkeleton";
import { useProducts } from "@/hooks/useProducts";
import { SearchBar } from "@/components/Products/SearchBar";

export default function Products() {
  const {
    productos,
    totalCargados,
    busqueda,
    setBusqueda,
    cargando,
    cargandoMas,
    hayMas,
    error,
    cargarMas,
    verMenos,
  } = useProducts();

  return (
    <section className="py-5">
      <Helmet>
        <title>Catálogo | Nocturna</title>
        <meta
          name="description"
          content="Explora nuestro catálogo de libros de terror, misterio y ciencia ficción. Encuentra tu próxima lectura."
        />
      </Helmet>

      <Container className="transicion-pagina">
        <h1 className="font-serif text-center mb-2 text-light uppercase tracking-wider">
          NUESTRO CATÁLOGO
        </h1>
        <p className="text-text-secondary text-center small mb-4">
          {cargando
            ? "Cargando catálogo..."
            : busqueda
              ? `${productos.length} resultados encontrados`
              : `${totalCargados} títulos cargados`}
        </p>

        <SearchBar value={busqueda} onChange={setBusqueda} />

        {error ? (
          <div
            className="text-center py-4 px-3 my-4 rounded mx-auto"
            style={{
              maxWidth: "600px",
              backgroundColor: "rgba(139, 32, 53, 0.15)",
              border: "1px solid rgba(139, 32, 53, 0.4)",
            }}
          >
            <p className="text-accent-secondary mb-0 fw-semibold">
              Error al cargar los productos: {error}
            </p>
          </div>
        ) : cargando ? (
          <ItemListSkeleton count={8} />
        ) : productos.length > 0 ? (
          <ItemList productos={productos} />
        ) : (
          <div className="text-center py-5">
            <p className="text-text-secondary h5">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}

        {!busqueda && (
          <Row className="mt-5">
            <Col className="text-center d-flex justify-content-center gap-3">
              {totalCargados > 4 && (
                <Button
                  variant="outline-light"
                  className="btn-outline-gold px-4 py-2"
                  onClick={verMenos}
                >
                  Ver menos
                </Button>
              )}

              {hayMas ? (
                <Button
                  variant="gold"
                  className="btn-gold px-4 py-2"
                  onClick={cargarMas}
                  disabled={cargandoMas}
                >
                  {cargandoMas ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    "Cargar más"
                  )}
                </Button>
              ) : (
                totalCargados > 4 && (
                  <Alert
                    variant="dark"
                    className="m-0 bg-secondary text-text-secondary border-0 px-4 py-2 rounded-pill small"
                  >
                    No hay más productos para mostrar.
                  </Alert>
                )
              )}
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
