import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[70vh] gap-6 px-6 transicion-pagina">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-mist-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.886-7.145A60.114 60.114 0 003.27 5.272M7.5 14.25L5.106 5.272M7.5 14.25l-1.5 6m13.5-6l1.5 6M15 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
          />
        </svg>

        <div className="text-center">
          <h3 className="font-serif text-2xl mb-2">Tu carrito está vacío</h3>
          <p className="text-text-secondary text-sm">
            Explorá el catálogo y encontrá tu próxima lectura.
          </p>
        </div>

        <Link
          to="/productos"
          className="bg-accent-primary text-black text-sm font-medium tracking-wider px-6 py-3 rounded hover:bg-amber-300 transition-colors"
        >
          Ir al catálogo
        </Link>
      </section>
    );
  }
  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-12 transicion-pagina">
        <h1 className="font-serif text-3xl mb-10">Carrito de compras</h1>

        <div className="flex flex-col gap-4 mb-10">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-primary/20 border border-mist-800 rounded-lg p-4"
            >
              <img
                src={item.imagen}
                alt={item.titulo}
                className="w-16 h-24 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-serif text-sm mb-1">{item.titulo}</h3>
                <p className="text-mist-600 text-xs mb-2">{item.autor}</p>
                <p className="text-text-secondary text-xs">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <p className="text-accent-primary font-medium text-sm">
                ${(item.precio * item.quantity).toLocaleString("es-AR")}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-mist-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-text-secondary text-sm mb-1">Total</p>

            <p className="font-serif text-3xl text-accent-primary">
              ${getCartTotal()}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={clearCart}
              className="cursor-pointer text-sm text-text-secondary border border-mist-800 px-4 py-2 rounded hover:border-accent-secondary hover:text-accent-secondary transition-colors"
            >
              Vaciar carrito
            </button>
            <button
              className="cursor-pointer bg-accent-primary text-black text-sm font-medium px-6 py-2 rounded hover:bg-amber-300 transition-colors"
              onClick={() => {
                alert("¡Gracias por su compra!");
                clearCart();
              }}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
