import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <Container
      className="py-5 text-center transicion-pagina d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh" }}
    >
      <Helmet>
        <title>Tu Carrito | Nocturna</title>
        <meta
          name="description"
          content="Revisa tu carrito de compras en Nocturna."
        />
      </Helmet>
      <FaShoppingCart
        className="text-text-secondary mb-4"
        style={{ fontSize: "4rem", opacity: 0.3 }}
      />
      <h3 className="font-serif text-light mb-2">Tu carrito está vacío</h3>
      <p
        className="text-text-secondary mb-4 small"
        style={{ maxWidth: "400px" }}
      >
        Explora el catálogo y encuentra tu próxima lectura favorita para
        acompañar tus noches.
      </p>
      <Link to="/productos" className="btn btn-gold px-4 py-2">
        Ir al catálogo
      </Link>
    </Container>
  );
}
