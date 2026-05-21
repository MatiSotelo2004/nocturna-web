import { useState, useEffect } from "react";
import Item from "../components/Item";

export default function Home() {
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta) {
          throw new Error("No se pudo cargar los productos");
        }
        return respuesta.json();
      })
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

  if (cargando) {
    return (
      <p className="text-center text-text-secondary py-10">
        Cargando productos, por favor espere...
      </p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-text-secondary py-10">Error:{error}</p>
    );
  }

  return (
    <section>
      <h2>PRODUCTOS DESTACADOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {destacados.map((prod) => (
          <Item key={prod.id} {...prod} />
        ))}
      </div>
    </section>
  );
}
