import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import { CartIcon } from "../../Icons";

export default function CartWidget() {
  const { getCartQuantity } = useCart();
  const cantidad = getCartQuantity();
  return (
    <>
      <Link
        to="/carrito"
        className="relative flex items-center text-text-secondary hover:text-accent-primary transition-colors"
      >
        <CartIcon className="h-7 w-7"/>

        {cantidad > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent-secondary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cantidad}
          </span>
        )}
      </Link>
    </>
  );
}
