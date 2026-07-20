import { useState, useEffect } from "react";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { getProductsPage } from "@/services/productService";
import { useSearch } from "@/context/SearchContext";
import { Product } from "@/types";

export function useProducts() {
  const [productos, setProductos] = useState<Product[]>([]);
  const { busqueda, setBusqueda } = useSearch();
  const [cargando, setCargando] = useState(true);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [ultimoVisible, setUltimoVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hayMas, setHayMas] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarIniciales = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await getProductsPage();
      setProductos(data.productos);
      setUltimoVisible(data.ultimoDocumento);
      setHayMas(data.hayMas);
    } catch (err: any) {
      setError(err.message || "Error al cargar productos.");
    } finally {
      setCargando(false);
    }
  };

  const cargarMas = async () => {
    if (!hayMas || cargandoMas || !ultimoVisible) return;
    setCargandoMas(true);
    try {
      const data = await getProductsPage(ultimoVisible);
      setProductos((prev) => [...prev, ...data.productos]);
      setUltimoVisible(data.ultimoDocumento);
      setHayMas(data.hayMas);
    } catch (err: any) {
      console.error("Error al cargar más productos:", err);
    } finally {
      setCargandoMas(false);
    }
  };

  const verMenos = () => {
    cargarIniciales();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    cargarIniciales();
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const queryTerm = busqueda.toLowerCase();
    return (
      prod.titulo.toLowerCase().includes(queryTerm) ||
      prod.autor.toLowerCase().includes(queryTerm)
    );
  });

  return {
    productos: productosFiltrados,
    totalCargados: productos.length,
    busqueda,
    setBusqueda,
    cargando,
    cargandoMas,
    hayMas,
    error,
    cargarMas,
    verMenos,
  };
}
