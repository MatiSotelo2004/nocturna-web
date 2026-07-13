import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner, Alert, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import ItemList from "../../components/ItemList/ItemList";
import { collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSearch } from "../../context/SearchContext";
import styles from "./Products.module.css";

const PRODUCTOS_POR_PAGINA = 4;

export default function Products() {
  const [productos, setProductos] = useState([]);
  const { busqueda, setBusqueda } = useSearch();
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] = useState(null);
  const [hayMas, setHayMas] = useState(true);
  const [error, setError] = useState(null);

  const obtenerProductosIniciales = () => {
    const productosDB = collection(db, "productos");
    const q = query(productosDB, limit(PRODUCTOS_POR_PAGINA));
    getDocs(q)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos(productosData);
        const ultimoDoc = resp.docs[resp.docs.length - 1];
        setUltimoVisible(ultimoDoc);
        setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
      })
      .catch((err) => {
        console.error("Error al obtener productos: ", err);
        setError(err.message);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const obtenerMasProductos = () => {
    if (!hayMas || cargandoMas) return;
    setCargandoMas(true);
    const productosDB = collection(db, "productos");
    const q = query(
      productosDB,
      startAfter(ultimoVisible),
      limit(PRODUCTOS_POR_PAGINA)
    );
    getDocs(q)
      .then((resp) => {
        const productosData = resp.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProductos((productosAnteriores) => [
          ...productosAnteriores,
          ...productosData,
        ]);
        const ultimoDoc = resp.docs[resp.docs.length - 1];
        setUltimoVisible(ultimoDoc);
        setHayMas(resp.docs.length === PRODUCTOS_POR_PAGINA);
      })
      .catch((err) => {
        console.error("Error al cargar mas productos: ", err);
      })
      .finally(() => {
        setCargandoMas(false);
      });
  };

  const verMenos = () => {
    obtenerProductosIniciales();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    obtenerProductosIniciales();
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const titulo = prod.titulo ? prod.titulo.toLowerCase() : "";
    const autor = prod.autor ? prod.autor.toLowerCase() : "";
    const queryTerm = busqueda.toLowerCase();
    return titulo.includes(queryTerm) || autor.includes(queryTerm);
  });

  if (cargando) {
    return (
      <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3 text-text-secondary small">Cargando productos, por favor espere...</p>
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
      <Helmet>
        <title>Catálogo | Nocturna</title>
        <meta name="description" content="Explora nuestro catálogo de libros de terror, misterio y ciencia ficción. Encuentra tu próxima lectura." />
      </Helmet>
      
      <Container className="transicion-pagina">
        <h1 className="font-serif text-center mb-2 text-light uppercase tracking-wider">
          NUESTRO CATÁLOGO
        </h1>
        <p className="text-text-secondary text-center small mb-4">
          {busqueda
            ? `${productosFiltrados.length} resultados encontrados`
            : `${productos.length} títulos cargados`}
        </p>

        {/* BARRA DE BÚSQUEDA */}
        <Row className="mb-5 justify-content-center">
          <Col xs={12} md={6}>
            <div className={styles.searchContainer}>
              <Form.Control
                type="text"
                placeholder="Buscar por título o autor..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className={`${styles.searchInput} w-100`}
                aria-label="Buscar productos por nombre"
              />
              <FaSearch className={styles.searchIcon} />
            </div>
          </Col>
        </Row>

        {productosFiltrados.length > 0 ? (
          <ItemList productos={productosFiltrados} />
        ) : (
          <div className="text-center py-5">
            <p className="text-text-secondary h5">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}

        {/* PAGINACIÓN */}
        {!busqueda && (
          <Row className="mt-5">
            <Col className="text-center d-flex justify-content-center gap-3">
              {/* El botón "Ver menos" solo aparece si hay más de una página cargada */}
              {productos.length > PRODUCTOS_POR_PAGINA && (
                <Button 
                  variant="outline-light" 
                  className="btn-outline-gold px-4 py-2" 
                  onClick={verMenos}
                >
                  Ver menos
                </Button>
              )}
              
              {/* Botón "Cargar más" */}
              {hayMas ? (
                <Button 
                  variant="gold" 
                  className="btn-gold px-4 py-2" 
                  onClick={obtenerMasProductos} 
                  disabled={cargandoMas}
                >
                  {cargandoMas ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                  ) : (
                    "Cargar más"
                  )}
                </Button>
              ) : (
                productos.length > PRODUCTOS_POR_PAGINA && (
                  <Alert variant="dark" className="m-0 bg-secondary text-text-secondary border-0 px-4 py-2 rounded-pill small">
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


