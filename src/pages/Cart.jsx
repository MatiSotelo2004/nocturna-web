import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaTrash, FaShoppingCart, FaCreditCard, FaArrowLeft } from "react-icons/fa";

export default function Cart() {
  const { cart, clearCart, getCartTotal, removeFromCart } = useCart();

  useEffect(() => {
    document.title = "Tu Carrito | Nocturna";
  }, []);

  if (cart.length === 0) {
    return (
      <Container className="py-5 text-center transicion-pagina d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "60vh" }}>
        <FaShoppingCart className="text-text-secondary mb-4" style={{ fontSize: "4rem", opacity: 0.3 }} />
        <h3 className="font-serif text-light mb-2">Tu carrito está vacío</h3>
        <p className="text-text-secondary mb-4 small" style={{ maxWidth: "400px" }}>
          Explora el catálogo y encuentra tu próxima lectura favorita para acompañar tus noches.
        </p>
        <Link to="/productos" className="btn btn-gold px-4 py-2">
          Ir al catálogo
        </Link>
      </Container>
    );
  }

  return (
    <section className="py-5">
      <Container className="transicion-pagina">
        <h1 className="font-serif text-light mb-5">Carrito de compras</h1>

        <Row className="g-4">
          {/* LISTA DE PRODUCTOS */}
          <Col xs={12} lg={8}>
            <div className="d-flex flex-column gap-3 mb-4">
              {cart.map((item) => (
                <Card 
                  key={item.id} 
                  className="bg-secondary text-light border-0 p-3" 
                  style={{ border: "1px solid rgba(155, 151, 168, 0.15) !important" }}
                >
                  <Row className="g-3 align-items-center">
                    <Col xs={3} sm={2}>
                      <img
                        src={item.imagen}
                        alt={item.titulo}
                        className="img-fluid rounded"
                        style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
                      />
                    </Col>
                    <Col xs={6} sm={7}>
                      <h3 className="font-serif h6 mb-1 text-truncate">{item.titulo}</h3>
                      <p className="text-text-secondary small mb-2">{item.autor}</p>
                      <p className="text-text-secondary mb-0 small">
                        Cantidad: <strong className="text-light">{item.quantity}</strong>
                      </p>
                    </Col>
                    <Col xs={3} sm={3} className="text-end d-flex flex-column align-items-end justify-content-between h-100">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn text-text-secondary hover-crimson p-0 border-0 mb-3"
                        style={{ fontSize: "1.1rem" }}
                        title="Eliminar del carrito"
                      >
                        <FaTrash />
                      </button>
                      <span className="text-accent-primary fw-semibold">
                        ${(item.precio * item.quantity).toLocaleString("es-AR")}
                      </span>
                    </Col>
                  </Row>
                </Card>
              ))}
            </div>

            <Link to="/productos" className="btn btn-outline-gold d-inline-flex align-items-center gap-2 mb-4">
              <FaArrowLeft style={{ fontSize: "0.8rem" }} />
              <span>Seguir comprando</span>
            </Link>
          </Col>

          {/* RESUMEN DE COMPRA */}
          <Col xs={12} lg={4}>
            <Card className="bg-secondary text-light border-0 p-4" style={{ border: "1px solid rgba(155, 151, 168, 0.15) !important" }}>
              <h3 className="font-serif h5 mb-4 border-bottom pb-2" style={{ borderColor: "rgba(155, 151, 168, 0.15) !important" }}>
                Resumen
              </h3>
              
              <div className="d-flex justify-content-between mb-3 text-text-secondary">
                <span>Subtotal ({cart.length} productos)</span>
                <span>${getCartTotal().toLocaleString("es-AR")}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4 border-top pt-3" style={{ borderColor: "rgba(155, 151, 168, 0.15) !important" }}>
                <span className="fw-semibold">Total</span>
                <span className="text-accent-primary fw-bold h4 mb-0">
                  ${getCartTotal().toLocaleString("es-AR")}
                </span>
              </div>

              <div className="d-flex flex-column gap-2">
                <button
                  className="btn btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => {
                    alert("¡Gracias por su compra!");
                    clearCart();
                  }}
                >
                  <FaCreditCard />
                  <span>Finalizar compra</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="btn btn-outline-danger w-100 py-2 mt-2"
                  style={{ borderRadius: "30px" }}
                >
                  Vaciar carrito
                </button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
