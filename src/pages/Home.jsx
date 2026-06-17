import { useState, useEffect } from "react";
import Item from "../components/Item";
import { Link } from "react-router-dom";
import { getProducts } from "../services/productsServices";

export default function Home() {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    document.title = "Nocturna | Librería Online para Noctámbulos";
    getProducts()
      .then((prod) => {
        const mejores = [...prod]
          .sort((a, b) => b.calificacion - a.calificacion)
          .slice(0, 4);
        setDestacados(mejores);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  
  if (error) {
    return (
      <p className="text-center text-text-secondary py-10">Error:{error}</p>
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-linear-to-br from-[#1c0a0a] via-secondary to-[#0a0a1c]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 transicion-pagina">
          <p className="text-xs tracking-[4px] text-accent-primary mb-6">
            ✦ TU PRÓXIMA HISTORIA FAVORITA TE ESPERA
          </p>

          <h1 className="font-serif text-5xl md:text-7xl mb-6 max-w-3xl">
            Historias que esperan{" "}
            <em className="text-accent-primary">la noche</em>
          </h1>

          <p className="text-text-secondary text-lg max-w-xl mb-10">
            Libros, manga y mucho más para los que leen cuando el mundo duerme.
            Fantasía, terror, thriller y todo lo que enciende la imaginación.
          </p>

          <div className="flex">
            <Link
              to="/productos"
              className="bg-accent-primary text-black text-sm font-medium tracking-wider px-8 py-3 rounded hover:bg-amber-300 transition-colors"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESTACADOS ── */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-[3px] text-accent-primary uppercase mb-2">
              Selección editorial
            </p>
            <h2 className="font-serif text-3xl">
              Los más valorados
            </h2>
          </div>
        </div>

        {cargando ? (
          <p className="text-center text-text-secondary py-10">
            Cargando productos, por favor espere...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {destacados.map((producto) => (
              <Item key={producto.id} {...producto} />
            ))}
          </div>
        )}

      </section>

      {/* ── SOBRE NOSOTROS ── */}
      <section className="border-y border-mist-800 py-16 px-6 text-center">
        <p className="text-xs tracking-[4px] text-accent-primary uppercase mb-4">
          ¿Por qué Nocturna?
        </p>
        <h2 className="font-serif text-3xl mb-6 max-w-xl mx-auto">
          Un espacio para los que leen cuando el mundo duerme
        </h2>
        <p className="text-text-secondary text-sm max-w-lg mx-auto">
          Seleccionamos cada título con cuidado. Desde clásicos atemporales
          hasta los mangas más aclamados, Nocturna es tu librería de cabecera.
        </p>
        
      </section>
    </>
  );
}
