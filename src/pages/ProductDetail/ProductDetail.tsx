import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

import { Container, Row, Col, Spinner } from "react-bootstrap";
import { FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

import { QuantitySelector } from "@/components/ProductDetail/QuantitySelector";
import { useProductDetail } from "@/hooks/useProductDetail";

export default function ProductDetail() {
  const { producto, cargando, error, cantidad, incrementar, decrementar } =
    useProductDetail();
  const { addToCart } = useCart();

  if (cargando) {
    return (
      <Container className="py-5 text-center text-text-secondary">
        <Helmet>
          <title>Cargando libro... | Nocturna</title>
        </Helmet>
        <Spinner animation="border" variant="warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p className="mt-3">Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (error || !producto) {
    return (
      <Container className="py-5 text-center text-text-secondary">
        <Helmet>
          <title>Error | Nocturna</title>
        </Helmet>
        <p className="h5 text-danger mb-4">{error}</p>
        <Link
          to="/productos"
          className="btn btn-outline-gold d-inline-flex align-items-center gap-2"
        >
          <FaArrowLeft />
          <span>Volver al catálogo</span>
        </Link>
      </Container>
    );
  }
  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(
      `Agregaste ${cantidad} ${cantidad > 1 ? "copias" : "copia"} de "${producto.titulo}" al carrito.`,
    );
  };

  return (
    <section className="py-5">
      <Helmet>
        <title>{`${producto.titulo} | Nocturna`}</title>
        <meta
          name="description"
          content={`Detalles y precio del libro "${producto.titulo}" de ${producto.autor} en Nocturna.`}
        />
      </Helmet>

      <Container className="transicion-pagina">
        {/* BREADCRUMB */}
        <nav className="text-text-secondary small mb-4 d-flex align-items-center gap-2">
          <Link
            to="/productos"
            className="text-decoration-none text-text-secondary nav-link-custom"
          >
            Catálogo
          </Link>
          <span>/</span>
          <span
            className="text-light text-truncate"
            style={{ maxWidth: "250px" }}
          >
            {producto.titulo}
          </span>
        </nav>

        <Row className="gy-5 gx-md-5 align-items-start mt-2">
          {/* PORTADA */}
          <Col xs={12} md={5} lg={4} className="text-center text-md-start">
            <div
              className="d-inline-block p-1 bg-secondary rounded shadow-lg"
              style={{ border: "1px solid rgba(155, 151, 168, 0.15)" }}
            >
              <img
                src={producto.imagen}
                alt={producto.titulo}
                className="img-fluid rounded"
                style={{
                  maxHeight: "480px",
                  objectFit: "cover",
                  width: "100%",
                  maxWidth: "320px",
                }}
              />
            </div>
          </Col>

          {/* DETALLES */}
          <Col xs={12} md={7} lg={8}>
            <div
              className="d-flex align-items-center gap-2 text-text-secondary text-uppercase mb-2"
              style={{ fontSize: "0.8rem", letterSpacing: "1px" }}
            >
              <span>{producto.tipo}</span>
              <span>|</span>
              <span>{producto.genero}</span>
            </div>

            <h1 className="font-serif display-5 fw-bold text-light mb-3">
              {producto.titulo}
            </h1>
            <p
              className="text-text-secondary mb-4"
              style={{ fontSize: "0.95rem", letterSpacing: "1.5px" }}
            >
              Por: <strong className="text-light">{producto.autor}</strong>
            </p>
            <p
              className="text-text-secondary mb-4"
              style={{ lineHeight: "1.7", fontSize: "1rem" }}
            >
              {producto.descripcion}
            </p>

            <hr
              style={{ borderColor: "rgba(155, 151, 168, 0.15)" }}
              className="my-4"
            />

            {/* PANEL DE COMPRA */}
            <div
              className="d-flex flex-column gap-3"
              style={{ maxWidth: "350px" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-text-secondary small">
                  Disponibilidad:
                </span>
                <span
                  className={`fw-semibold ${producto.stock > 0 ? "text-success" : "text-danger"}`}
                >
                  {producto.stock > 0
                    ? `${producto.stock} unidades`
                    : "Sin stock"}
                </span>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-text-secondary small">
                  Precio unitario:
                </span>
                <span className="text-accent-primary fw-bold h3 mb-0">
                  ${producto.precio.toLocaleString("es-AR")}
                </span>
              </div>

              {producto.stock > 0 && (
                <>
                  <QuantitySelector
                    cantidad={cantidad}
                    onIncrement={incrementar}
                    onDecrement={decrementar}
                  />

                  <button
                    onClick={handleAddToCart}
                    className="btn btn-gold py-3 w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <FaShoppingBag />
                    <span>Agregar al carrito</span>
                  </button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
