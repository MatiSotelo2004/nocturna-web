import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function CartWidget() {
  const { getCartQuantity } = useCart();
  const cantidad = getCartQuantity();
  return (
    <Link
      to="/carrito"
      className="position-relative d-flex align-items-center text-text-secondary"
      style={{ fontSize: "1.3rem" }}
    >
      <FaShoppingCart />

      {cantidad > 0 && (
        <span 
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
          style={{ 
            backgroundColor: "var(--accent-crimson)", 
            color: "var(--text-light)",
            fontSize: "0.65rem",
            padding: "0.35em 0.5em"
          }}
        >
          {cantidad}
        </span>
      )}
    </Link>
  );
}
