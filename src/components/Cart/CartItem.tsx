import { Card, Row, Col } from "react-bootstrap";
import { useCart } from "@/context/CartContext";
import styles from "./CartItem.module.css";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function CartItem() {
  const { cart, substractCart, incrementCart, removeFromCart } = useCart();

  return (
    <>
      {cart.map((item) => (
        <Card key={item.id} className={`${styles.cartCard} text-light p-3`}>
          <Row className="g-3 align-items-center">
            {/* IMAGEN */}
            <Col xs={3} sm={2}>
              <img
                src={item.imagen}
                alt={item.titulo}
                className="img-fluid rounded"
                style={{
                  maxHeight: "100px",
                  objectFit: "scale-down",
                  width: "100%",
                }}
              />
            </Col>
            {/* INFO TITULO */}
            <Col xs={6} sm={7}>
              <h3 className="font-serif h6 mb-1 text-truncate">
                {item.titulo}
              </h3>
              <p className="text-text-secondary small mb-2">{item.autor}</p>
              <Row>
                <Col xs={3}>
                  <p className="text-text-secondary">Cantidad:</p>
                </Col>
                <Col>
                  <div
                    style={{
                      display: "flex",
                      gap: "2rem",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className={styles.plusminusButton}
                      onClick={() => substractCart(item.id)}
                    >
                      <FaMinusCircle />
                    </button>

                    <strong className="text-light">{item.quantity}</strong>
                    <button
                      className={styles.plusminusButton}
                      onClick={() => incrementCart(item.id)}
                    >
                      <FaPlusCircle />
                    </button>
                  </div>
                </Col>
              </Row>
            </Col>
            {/* PRECIO Y ELIMINAR */}
            <Col
              xs={3}
              sm={3}
              className="text-end d-flex flex-column align-items-end justify-content-between h-100"
            >
              <button
                onClick={() => removeFromCart(item.id)}
                className={`${styles.trashBtn} mb-3`}
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
    </>
  );
}
