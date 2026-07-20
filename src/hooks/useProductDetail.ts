import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "@/services/productService";
import { Product } from "@/types";

export function useProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Product>();
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string>("");
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó un ID de producto válido.");
      setCargando(false);
      return;
    }

    getProductById(id)
      .then((datos) => {
        if (datos) setProducto(datos);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, [id]);

  const incrementar = () => {
    if (producto && cantidad < producto.stock) setCantidad((prev) => prev + 1);
  };

  const decrementar = () => {
    if (cantidad > 1) setCantidad((prev) => prev - 1);
  };

  return { producto, cargando, error, cantidad, incrementar, decrementar };
}
