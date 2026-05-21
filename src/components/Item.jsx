import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Item({
  id,
  titulo,
  autor,
  precio,
  calificacion,
  genero,
  tipo,
  imagen,
}) {
  const producto = {
    id,
    titulo,
    autor,
    precio,
    calificacion,
    genero,
    tipo,
    imagen,
  };
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(producto, 1);
    alert("Agregaste un producto");
  };

  return (
    <div className="bg-primary/50 border-2 border-text-secondary/10 rounded-lg flex flex-col overflow-hidden hover:border-accent-secondary/30 hover:shadow-accent-secondary/30 hover:shadow-2xl hover:scale-105 transition-all duration-400">
      {/* PORTADA */}
      <Link to={`/producto/${id}`}>
        <div className="relative aspect-2/3 overflow-hidden">
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded bg-black/60 text-accent-primary border border-amber-400/30 capitalize">
            {tipo}
          </span>
        </div>
      </Link>

      {/* INFO PROD */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-1">{genero}</p>
        <h3 className="font-titulo font-black text-sm leading-snug mb-1 line-clamp-2">
          {titulo}
        </h3>
        <p className="text-xs text-gray-500 mb-3">{autor}</p>

        {/* Precio y boton */}

        <span className="text-accent-primary font-medium text-sm">
          ${precio.toLocaleString("es-AR")}
        </span>

        <button
          onClick={handleAddToCart}
          className="bg-accent-primary py-2 rounded-4xl mt-3 font-bold hover:bg-amber-200 hover:text-secondary transition-colors duration-200"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
