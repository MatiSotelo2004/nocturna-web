import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getProductById } from "../services/productsServices";
import { MinusIcon, PlusIcon } from "../components/Icons";

export default function ItemDetailContainer() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    document.title = "Cargando libro... | Nocturna";
    getProductById(id)
      .then((datos) => {
        setProducto(datos);
        if (datos && datos.titulo) {
          document.title = `${datos.titulo} | Nocturna`;
        }
      })
      .catch((error) => {
        setError(error.message);
        document.title = "Error | Nocturna";
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
    <section className="max-w-5xl mx-auto px-6 py-12 transicion-pagina">
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
          <h1 className="font-titulo text-4xl font-black">{producto.titulo}</h1>
          <p className="py-8">{producto.descripcion}</p>
          <div className="flex flex-col items-center">
            <p className="font-semibold">
              {producto.stock > 0
                ? `${producto.stock} unidades disponibles`
                : "Sin stock"}
            </p>
            <p className="text-4xl text-accent-primary">${producto.precio.toLocaleString("es-AR")}</p>
            <div className="mt-4 flex gap-5 items-center">
              <button className="cursor-pointer" onClick={decrementar}>
                <MinusIcon className="w-7 h-7"/>
              </button>
              <p className="text-2xl">{cantidad}</p>
              <button className="cursor-pointer" onClick={incrementar}>
                <PlusIcon className="w-7 h-7"/>
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
