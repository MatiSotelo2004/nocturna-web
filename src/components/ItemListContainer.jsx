import { useState, useEffect } from "react";
import ItemList from "./ItemList";

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se puedo cargar la información de los productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <p className="text-center text-text-secondary py-10">Cargando productos, por favor espere...</p>;
  }
  if (error) {
    return <p className="text-center text-text-secondary py-10">Error:{error}</p>;
  }
  return (<section className="max-w-7xl mx-auto px-6 py-12">
    <h2 className="font-serif text-3xl mb-2 text-center">NUESTRO CATÁLOGO</h2>
    <p className="text-text-secondary text-sm mb-10 text-center" >{productos.length} títulos disponibles</p>
    <ItemList productos={productos}/>
  </section>);
}
