import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { getProducts } from "../services/productsServices";

export default function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    document.title = "Catálogo | Nocturna";
    getProducts()
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
    <h1 className="font-serif text-3xl mb-2 text-center">NUESTRO CATÁLOGO</h1>
    <p className="text-text-secondary text-sm mb-10 text-center" >{productos.length} títulos disponibles</p>
    <ItemList productos={productos}/>
  </section>);
}
