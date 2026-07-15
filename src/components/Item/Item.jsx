import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaShoppingBag } from "react-icons/fa";
import styles from "./Item.module.css";

export default function Item({
  id,
  titulo,
  autor,
  precio,
  calificacion,
  genero,
  tipo,
  imagen,
  stock,
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
    stock,
  };
  const { addToCart } = useCart();

  const isOutOfStock = stock <= 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // Evita navegar al detalle si se hace click en comprar
    if (isOutOfStock) return;
    addToCart(producto, 1);
    alert(`Agregaste 1 copia de "${producto.titulo}" al carrito.`);
  };

  return (
    <div className={`${styles.bookCard} ${isOutOfStock ? styles.outOfStockCard : ""}`}>
      {/* PORTADA */}
      <Link to={`/producto/${id}`} className="text-decoration-none position-relative d-block">
        <div style={{ aspectRatio: "2/3", overflow: "hidden", position: "relative" }}>
          <img
            src={imagen}
            alt={titulo}
            className="w-100 h-100 object-fit-cover"
            style={isOutOfStock ? { filter: "grayscale(1) brightness(0.4)" } : {}}
          />
          {isOutOfStock ? (
            <div 
              className="position-absolute top-50 start-50 translate-middle badge bg-danger text-light px-3 py-2 fw-bold"
              style={{ 
                fontSize: "0.85rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                borderRadius: "4px"
              }}
            >
              Sin Stock
            </div>
          ) : (
            <span 
              className="position-absolute top-0 end-0 m-2 badge"
              style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.75)", 
                color: "var(--accent-gold)",
                border: "1px solid rgba(201, 168, 76, 0.3)",
                textTransform: "capitalize"
              }}
            >
              {tipo}
            </span>
          )}
        </div>
      </Link>

      {/* INFO PROD */}
      <div className="card-body d-flex flex-column p-3 justify-content-between flex-grow-1">
        <div>
          <p 
            className="text-text-secondary text-uppercase mb-1"
            style={{ fontSize: "0.7rem", letterSpacing: "1px" }}
          >
            {genero}
          </p>
          <h3 
            className="text-light h6 mb-1 text-truncate-2"
            style={{ 
              fontWeight: "600",
              lineHeight: "1.3",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              height: "2.6em" // mantiene altura fija para alineación
            }}
          >
            {titulo}
          </h3>
          <p className="text-text-secondary small mb-3">{autor}</p>
        </div>

        <div className="mt-auto">
          <div className="d-flex align-items-center justify-content-between">
            <span className="text-accent-primary fw-semibold h5 mb-0">
              ${precio.toLocaleString("es-AR")}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn w-100 mt-3 d-flex align-items-center justify-content-center gap-2 ${
              isOutOfStock ? "btn-secondary disabled" : "btn-gold"
            }`}
            disabled={isOutOfStock}
            style={isOutOfStock ? { backgroundColor: "rgba(155, 151, 168, 0.2)", color: "var(--text-muted)", border: "none" } : {}}
          >
            {isOutOfStock ? (
              <span>Sin Stock</span>
            ) : (
              <>
                <FaShoppingBag style={{ fontSize: "0.9rem" }} />
                <span>Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
