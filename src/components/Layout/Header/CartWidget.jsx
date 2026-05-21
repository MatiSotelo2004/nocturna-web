import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartWidget() {
  const { getCartQuantity } = useCart();
  const cantidad = getCartQuantity();
  return (
    <>
      <Link
        to="/carrito"
        className="relative flex items-center text-text-secondary hover:text-accent-primary transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.886-7.145A60.114 60.114 0 003.27 5.272M7.5 14.25L5.106 5.272M7.5 14.25l-1.5 6m13.5-6l1.5 6M15 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>

        {cantidad > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent-secondary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cantidad}
          </span>
        )}
      </Link>
    </>
  );
}
