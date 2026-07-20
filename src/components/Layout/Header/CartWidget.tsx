import { useCart } from "@/context/CartContext";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./Header.module.css";

export default function CartWidget() {
  const { getCartQuantity } = useCart();
  const cantidad = getCartQuantity();
  const location = useLocation();
  const isActive = location.pathname === "/carrito";

  return (
    <Link
      to="/carrito"
      className="text-text-secondary position-relative"
      style={{ fontSize: "1.3rem" }}
    >
      <FaShoppingCart
        className={`${styles.navIcons} ${isActive ? "active" : ""}`}
      />

      {cantidad > 0 && (
        <span
          className="position-absolute badge rounded-circle"
          style={{
            backgroundColor: "var(--accent-crimson)",
            color: "var(--text-light)",
            fontSize: "0.65rem",
            padding: "0.35em 0.5em",
          }}
        >
          {cantidad}
        </span>
      )}
    </Link>
  );
}
