import { useState, useRef, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import ProductForm from "../../components/ProductForm/ProductForm";
import { getProducts } from "../../services/productService";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Admin() {
  const [dataForm, setDataForm] = useState({
    titulo: "",
    autor: "",
    descripcion: "",
    genero: "",
    tipo: "",
    precio: "",
    stock: "",
    calificacion: "",
  });
  const [imagenFile, setImagenFile] = useState(null);
  const fileInputRef = useRef(null);
  const tipoProducto = ["Libro", "Manga", "Comic"];

  // Estados para el CRUD y control de flujo
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

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

  const handleSubmit = async (e) => {
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

      const dataToSave = {
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
        const docRef = doc(db, "productos", editingProductId);
        await updateDoc(docRef, dataToSave);
        console.log("Documento actualizado con ID: ", editingProductId);
        alert("Producto actualizado exitosamente!");
      } else {
        // Agregar el documento a Firestore
        const docRef = await addDoc(collection(db, "productos"), dataToSave);
        console.log("Documento agregado con ID: ", docRef.id);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleFile = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleEdit = (product) => {
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

  const handleDelete = async (productId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        setLoading(true);
        const docRef = doc(db, "productos", productId);
        await deleteDoc(docRef);
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
          <div
            className="table-responsive"
            style={{
              backgroundColor: "rgba(26, 26, 31, 0.9)",
              border: "1px solid rgba(155, 151, 168, 0.15)",
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Table hover variant="dark" className="align-middle mb-0">
              <thead>
                <tr className="text-accent-primary">
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Tipo</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.imagen}
                        alt={product.titulo}
                        style={{
                          width: "50px",
                          height: "65px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/50x65?text=No+Image";
                        }}
                      />
                    </td>
                    <td className="fw-semibold text-light">{product.titulo}</td>
                    <td>{product.autor}</td>
                    <td>{product.tipo}</td>
                    <td className="text-accent-primary">
                      ${product.precio.toLocaleString("es-AR")}
                    </td>
                    <td>{product.stock}</td>
                    <td className="text-end">
                      <Button
                        variant="link"
                        className="text-accent-primary me-2 p-0 text-decoration-none"
                        onClick={() => handleEdit(product)}
                        style={{ fontWeight: "600" }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="link"
                        className="text-accent-secondary p-0 text-decoration-none"
                        onClick={() => handleDelete(product.id)}
                        style={{ fontWeight: "600" }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
