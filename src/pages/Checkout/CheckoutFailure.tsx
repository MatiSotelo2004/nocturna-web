import { useLocation, Link, useNavigate } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { FaTimesCircle, FaRedo, FaShoppingBag, FaExclamationTriangle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

export default function CheckoutFailure() {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage =
    (location.state?.error as string) ||
    "Hubo un inconveniente al procesar tu compra. Tus productos siguen guardados en el carrito.";

  return (
    <section className="py-5">
      <Helmet>
        <title>Error en la Compra | Nocturna</title>
        <meta
          name="description"
          content="No pudimos completar tu pedido en Nocturna."
        />
      </Helmet>

      <Container className="transicion-pagina" style={{ maxWidth: "650px" }}>
        <Card
          className="bg-secondary text-light p-4 p-md-5 text-center border-0 shadow-lg"
          style={{
            borderRadius: "16px",
            borderColor: "rgba(155, 151, 168, 0.15)",
          }}
        >
          {/* ICONO DE ERROR */}
          <div className="d-inline-flex p-3 rounded-circle mb-3 bg-dark border border-danger mx-auto">
            <FaTimesCircle
              className="text-danger"
              style={{ fontSize: "3rem" }}
            />
          </div>

          <h1 className="font-serif h2 mb-2">No pudimos procesar tu compra</h1>
          <p className="text-text-secondary mb-4">{errorMessage}</p>

          {/* CAJA DE CONSEJOS / MOTIVOS */}
          <div
            className="p-3 rounded text-start mb-4"
            style={{
              backgroundColor: "rgba(13, 13, 15, 0.6)",
              border: "1px solid rgba(220, 53, 69, 0.3)",
            }}
          >
            <div className="d-flex align-items-center gap-2 text-warning mb-2 fw-semibold">
              <FaExclamationTriangle />
              <span>Posibles motivos</span>
            </div>
            <ul className="text-text-secondary small mb-0 ps-3">
              <li>El stock de uno o más productos fue adquirido por otro usuario.</li>
              <li>Ocurrió una interrupción momentánea en la conexión con el servidor.</li>
            </ul>
          </div>

          {/* ACCIONES */}
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button
              onClick={() => navigate("/carrito")}
              className="btn btn-gold d-flex align-items-center justify-content-center gap-2"
            >
              <FaRedo />
              <span>Volver al Carrito y Reintentar</span>
            </button>
            <Link
              to="/productos"
              className="btn btn-outline-gold d-flex align-items-center justify-content-center gap-2"
            >
              <FaShoppingBag />
              <span>Ver otros libros</span>
            </Link>
          </div>
        </Card>
      </Container>
    </section>
  );
}
