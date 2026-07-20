import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Spinner } from "react-bootstrap";
import ProductForm from "@/components/ProductForm/ProductForm";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/services/productService";
import ProductTable from "@/components/Admin/ProductTable";
import { Product } from "@/types";

interface ProductFormData extends Omit<
  Product,
  "id" | "precio" | "stock" | "calificacion"
> {
  precio: string;
  stock: string;
  calificacion: string;
}

export default function Admin() {
  const [dataForm, setDataForm] = useState<ProductFormData>({
    titulo: "",
    autor: "",
    descripcion: "",
    genero: "",
    tipo: "",
    precio: "",
    stock: "",
    calificacion: "",
    imagen: "",
  });
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tipoProducto = ["Libro", "Manga", "Comic"];

  // Estados para el CRUD y control de flujo
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const apiKeyImgbb = "be0f52c7f77738c01b17dd458af35dea";

  useEffect(() => {
    getProducts()
      .then((datos) => {
        setProducts(datos);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let imagenUrl = dataForm.imagen || "";

    try {
      if (imagenFile) {
        // Subir la imagen a imgbb
        const formData = new FormData();
        formData.append("image", imagenFile);
        const imgbbResponse = await fetch(
          `https://api.imgbb.com/1/upload?key=${apiKeyImgbb}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const imgbbData = await imgbbResponse.json();
        if (!imgbbData.success) {
          throw new Error("Error al subir la imagen a imgbb");
        }
        imagenUrl = imgbbData.data.url;
        console.log("Imagen subida a imgbb con éxito:", imagenUrl);
      } else if (!isEditMode) {
        alert(
          "Por favor, seleccione una imagen antes de enviar el formulario.",
        );
        setSubmitting(false);
        return;
      }

      const dataToSave: Omit<Product, "id"> = {
        titulo: dataForm.titulo,
        autor: dataForm.autor,
        descripcion: dataForm.descripcion || "",
        genero: dataForm.genero,
        tipo: dataForm.tipo,
        precio: parseFloat(dataForm.precio),
        stock: parseInt(dataForm.stock),
        calificacion: parseFloat(dataForm.calificacion),
        imagen: imagenUrl,
      };

      if (isEditMode && editingProductId) {
        // Actualizar el documento en Firestore
        await updateProduct(editingProductId, dataToSave);
        console.log("Documento actualizado con ID: ", editingProductId);
        alert("Producto actualizado exitosamente!");
      } else {
        // Agregar el documento a Firestore
        const newDocId = await createProduct(dataToSave);
        console.log("Documento agregado con ID: ", newDocId);
        alert("Producto agregado exitosamente!");
      }

      // Recargar listado de productos
      const updatedProducts = await getProducts();
      setProducts(updatedProducts);

      // Cerrar formulario y resetear
      handleCancel();
    } catch (error) {
      console.error("Error al procesar el producto: ", error);
      alert("Error al procesar el producto. Por favor, inténtelo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagenFile(e.target.files[0]);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProductId(product.id);
    setIsEditMode(true);
    setDataForm({
      titulo: product.titulo,
      autor: product.autor,
      descripcion: product.descripcion || "",
      genero: product.genero,
      tipo: product.tipo,
      precio: product.precio.toString(),
      stock: product.stock.toString(),
      calificacion: product.calificacion.toString(),
      imagen: product.imagen,
    });
    setShowForm(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        setLoading(true);
        await deleteProduct(productId);
        console.log("Documento eliminado con ID: ", productId);

        // Actualizar el estado local
        setProducts(products.filter((p) => p.id !== productId));
        alert("Producto eliminado exitosamente!");
      } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingProductId(null);
    setDataForm({
      titulo: "",
      autor: "",
      descripcion: "",
      genero: "",
      tipo: "",
      precio: "",
      stock: "",
      calificacion: "",
      imagen: "",
    });
    setImagenFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (!showForm) {
    return (
      <Container
        className="py-5 transicion-pagina"
        style={{ minHeight: "80vh" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-accent-primary">Panel de Administración</h2>
          <div className="d-flex gap-3">
            <Link to="/gestion-cupones">
              <Button className="btn-gold">Gestionar Cupones</Button>
            </Link>
            <Button
              className="btn-gold"
              onClick={() => {
                setIsEditMode(false);
                setShowForm(true);
              }}
            >
              Agregar Producto
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="warning" />
            <span className="ms-3 text-text-secondary">
              Cargando productos...
            </span>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-5 text-text-secondary">
            No hay productos registrados en el sistema.
          </div>
        ) : (
          <ProductTable
            products={products}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        )}
      </Container>
    );
  }

  return (
    <ProductForm
      dataForm={dataForm}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleFile={handleFile}
      isEditMode={isEditMode}
      loading={submitting}
      tipoProducto={tipoProducto}
      fileInputRef={fileInputRef}
      onCancel={handleCancel}
    />
  );
}
