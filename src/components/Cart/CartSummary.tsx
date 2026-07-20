import { Card } from "react-bootstrap";
import { FaCreditCard } from "react-icons/fa";
import styles from "./CartSummary.module.css";

interface CartSummaryProps {
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  quantity: number;
  onCheckout: () => void;
  onClearCart: () => void;
  children?: React.ReactNode;
}

export default function CartSummary({
  subtotal,
  discountAmount,
  finalTotal,
  quantity,
  onCheckout,
  onClearCart,
  children,
}: CartSummaryProps) {
  return (
    <Card className={`${styles.summaryCard} text-light p-4`}>
      <h3
        className="font-serif h5 mb-4 border-bottom pb-2"
        style={{ borderColor: "rgba(155, 151, 168, 0.15) !important" }}
      >
        Resumen
      </h3>

      <div className="d-flex justify-content-between mb-3 text-text-secondary">
        <span>Subtotal ({quantity} productos)</span>
        <span>${subtotal.toLocaleString("es-AR")}</span>
      </div>

      {children}

      {discountAmount > 0 && (
        <div className="d-flex justify-content-between mb-3 text-success small">
          <span>Descuento</span>
          <span>-${discountAmount.toLocaleString("es-AR")}</span>
        </div>
      )}

      <div
        className="d-flex justify-content-between mb-4 border-top pt-3"
        style={{ borderColor: "rgba(155, 151, 168, 0.15) !important" }}
      >
        <span className="fw-semibold">Total</span>
        <span className="text-accent-primary fw-bold h4 mb-0">
          ${finalTotal.toLocaleString("es-AR")}
        </span>
      </div>

      <div className="d-flex flex-column gap-2">
        <button
          className="btn btn-gold w-100 py-3 d-flex align-items-center justify-content-center gap-2"
          onClick={onCheckout}
        >
          <FaCreditCard />
          <span>Finalizar compra</span>
        </button>

        <button
          onClick={onClearCart}
          className="btn btn-outline-danger w-100 py-2 mt-2"
          style={{ borderRadius: "30px" }}
        >
          Vaciar carrito
        </button>
      </div>
    </Card>
  );
}
