import { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Gestion.module.css";

export default function Gestion() {
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
  const tipoProducto = ["Libro", "Manga", "Comic"];
  const [loading, setLoading] = useState(false);
  const apiKeyImgbb = "be0f52c7f77738c01b17dd458af35dea";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!imagenFile) {
      alert("Por favor, seleccione una imagen antes de enviar el formulario.");
      setLoading(false);
      return;
    }
    try {
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
      //   recuperar la URL de la imagen subida y parsear los datos del formulario para guardarlos en Firestore
      const imagenUrl = imgbbData.data.url;
      console.log("Imagen subida a imgbb con éxito:", imagenUrl);
      const dataToSave = {
        ...dataForm,
        imagen: imagenUrl,
        precio: parseFloat(dataForm.precio),
        stock: parseInt(dataForm.stock),
        calificacion: parseFloat(dataForm.calificacion),
      };

      // Agregar el documento a Firestore

      const docRef = await addDoc(collection(db, "productos"), dataToSave);
      console.log("Documento agregado con ID: ", docRef.id);
      alert("Producto agregado exitosamente!");
    } catch (error) {
      console.error("Error al agregar documento: ", error);
      alert("Error al agregar el producto. Por favor, inténtelo de nuevo.");
    } finally {
      setLoading(false);
      // Resetear el formulario después de agregar el producto
      setDataForm({
        titulo: "",
        autor: "",
        descripcion: "",
        genero: "",
        tipo: "",
        precio: 0,
        stock: 0,
        calificacion: 0,
      });
      setImagenFile(null);
    }
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "80vh" }}
    >
      <div className={`${styles.formContainer} w-100 d-flex flex-column align-items-center gap-3`} style={{ maxWidth: "500px"}}>
        <h2 className="text-accent-primary">Subir nuevo producto</h2>
        <Form onSubmit={handleSubmit} className="text-text-secondary d-flex flex-column">
          {/* Titulo */}
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del producto"
              value={dataForm.titulo}
              onChange={(e) =>
                setDataForm({ ...dataForm, titulo: e.target.value })
              }
              className={styles.customInput}
              required
            ></Form.Control>
          </Form.Group>
          {/* Autor */}
          <Form.Group className="mb-3" controlId="formAutor">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el autor del producto"
              value={dataForm.autor}
              onChange={(e) =>
                setDataForm({ ...dataForm, autor: e.target.value })
              }
              className={styles.customInput}
              required
            ></Form.Control>
          </Form.Group>
          {/* Descripcion */}
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción del producto"
              type="text"
              value={dataForm.descripcion}
              onChange={(e) =>
                setDataForm({ ...dataForm, descripcion: e.target.value })
              }
              className={`${styles.customInput} resize-none`}
              style={{ resize: "none" }}
            ></Form.Control>
          </Form.Group>
          {/* Genero */}
          <Form.Group className="mb-3" controlId="formGenero">
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el género del producto"
              value={dataForm.genero}
              onChange={(e) =>
                setDataForm({ ...dataForm, genero: e.target.value })
              }
              required
              className={styles.customInput}
            ></Form.Control>
          </Form.Group>
          {/* Imagen */}
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>imágen</Form.Label>
            <Form.Control
              type="file"
              placeholder="Cargue la imágen del producto"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files[0])}
              required
              className={styles.customInput}
            ></Form.Control>
          </Form.Group>
          {/* Tipo */}
          <Form.Group className="mb-3" controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              value={dataForm.tipo}
              onChange={(e) =>
                setDataForm({ ...dataForm, tipo: e.target.value })
              }
              required
              className={styles.customInput}
            >
              <option value="">Seleccione un tipo</option>
              {tipoProducto.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {/* Precio */}
          <Form.Group className="mb-3" controlId="formPrecio">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              min="0"
              step="0.01"
              value={dataForm.precio}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  precio: e.target.value,
                })
              }
              required
              className={styles.customInput}
            ></Form.Control>
          </Form.Group>
          {/* Stock */}
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={dataForm.stock}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  stock: e.target.value,
                })
              }
              required
              className={styles.customInput}
            ></Form.Control>
          </Form.Group>
          {/* Calificacion */}
          <Form.Group className="mb-3" controlId="formCalificacion">
            <Form.Label>Calificación</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={dataForm.calificacion}
              onChange={(e) =>
                setDataForm({
                  ...dataForm,
                  calificacion: e.target.value,
                })
              }
              required
              className={styles.customInput}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="btn-gold">
            {loading ? "Subiendo..." : "Subir Producto"}
          </Button>
        </Form>
      </div>
    </Container>
  );
}
