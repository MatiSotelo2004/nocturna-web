import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ItemDetailContainer() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("Error al cargar el producto");
        }
        return respuesta.json();
      })
      .then((datos) => {
        const encontrado = datos.find((p) => p.id === parseInt(id));
        if (!encontrado) {
          throw new Error("No se pudo encontrar el producto");
        }
        setProducto(encontrado);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  const incrementar = () => {
    if (cantidad < producto.stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, cantidad);
    alert(
      `Agregaste ${cantidad} ${cantidad > 1 ? "copias" : "copia"} de "${producto.titulo}"`,
    );
  };

  if (cargando) {
    return (
      <p className="text-center text-text-secondary py-10">
        Cargando, por favor espere...
      </p>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-center text-text-secondary py-10">{error}</p>
        <Link
          to="/productos"
          className="hover:text-accent-primary transition-colors duration-200"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <nav className="text-xs text-text-secondary mb-8 flex items-center gap-2 justify-center md:justify-normal">
        <Link
          to="/productos"
          className="hover:text-accent-primary transition-colors"
        >
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-text-secondary">{producto.titulo}</span>
      </nav>

      <div className="flex flex-col items-center text-center gap-8 md:text-left md:flex-row md:items-start">
        <img
          src={producto.imagen}
          alt={producto.titulo}
          className="w-50 md:min-w-sm rounded-lg shadow-accent-secondary/20 shadow-2xl"
        />
        <div className="flex flex-col">
          <div className="flex gap-2 text-text-secondary capitalize mb-3 justify-center md:justify-normal md:mb-0">
            <span>{producto.tipo}</span>
            <span>|</span>
            <span>{producto.genero}</span>
          </div>
          <h2 className="font-titulo text-4xl font-black">{producto.titulo}</h2>
          <p className="py-8">{producto.descripcion}</p>
          <div className="flex flex-col items-center">
            <p className="font-semibold">
              {producto.stock > 0
                ? `${producto.stock} unidades disponibles`
                : "Sin stock"}
            </p>
            <p className="text-4xl text-accent-primary">${producto.precio}</p>
            <div className="mt-4 flex gap-5 items-center">
              <button className="cursor-pointer" onClick={decrementar}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12L18 12"
                      stroke="#ffffff"
                      stroke-width="2.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
              <p className="text-2xl">{cantidad}</p>
              <button className="cursor-pointer" onClick={incrementar}>
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M6 12H18M12 6V18"
                      stroke="#ffffff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-accent-primary py-3 px-10 rounded-full mt-5 hover:bg-yellow-200 hover:text-secondary hover:scale-105 transition-all transform duration-300"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
