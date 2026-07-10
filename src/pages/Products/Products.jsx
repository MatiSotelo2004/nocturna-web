import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ItemList from "../../components/ItemList/ItemList";
import { getProducts } from "../../services/productService";

export default function Products() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    document.title = "Catálogo | Nocturna";
    getProducts()
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <Container className="py-5 text-center text-text-secondary">
        <div className="spinner-border text-accent-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando productos, por favor espere...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center text-text-secondary">
        <p className="h5 text-danger">Error: {error}</p>
      </Container>
    );
  }

  return (
    <section className="py-5">
      <Container className="transicion-pagina">
        <h1 className="font-serif text-center mb-2 text-light uppercase tracking-wider">
          NUESTRO CATÁLOGO
        </h1>
        <p className="text-text-secondary text-center small mb-5">
          {productos.length} títulos disponibles
        </p>
        <ItemList productos={productos} />
      </Container>
    </section>
  );
}
