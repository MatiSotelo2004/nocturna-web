import { Container, Form, Button } from "react-bootstrap";
import styles from "./ProductForm.module.css";
import { Product } from "@/types";
import { ChangeEvent, FormEvent, Ref } from "react";

interface ProductFormData extends Omit<
  Product,
  "id" | "precio" | "stock" | "calificacion"
> {
  precio: string;
  stock: string;
  calificacion: string;
}
interface ProductFormProps {
  dataForm: ProductFormData;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleFile: (e: ChangeEvent<HTMLInputElement>) => void;
  isEditMode: boolean;
  loading: boolean;
  tipoProducto: string[];
  fileInputRef: Ref<HTMLInputElement>;
  onCancel: () => void;
}

export default function ProductForm({
  dataForm,
  handleChange,
  handleSubmit,
  handleFile,
  isEditMode,
  loading,
  tipoProducto,
  fileInputRef,
  onCancel,
}: ProductFormProps) {
  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5 transicion-pagina"
      style={{ minHeight: "80vh" }}
    >
      <div
        className={`${styles.formContainer} w-100 d-flex flex-column align-items-center gap-3`}
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-accent-primary">
          {isEditMode ? "Editar Producto" : "Subir Nuevo Producto"}
        </h2>
        <Form
          onSubmit={handleSubmit}
          className="text-text-secondary d-flex flex-column"
        >
          {/* Titulo */}
          <Form.Group className="mb-3" controlId="formTitulo">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título del producto"
              value={dataForm.titulo}
              onChange={handleChange}
              className={styles.customInput}
              name="titulo"
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
              onChange={handleChange}
              className={styles.customInput}
              name="autor"
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
              onChange={handleChange}
              className={`${styles.customInput} resize-none`}
              style={{ resize: "none" }}
              name="descripcion"
            ></Form.Control>
          </Form.Group>
          {/* Genero */}
          <Form.Group className="mb-3" controlId="formGenero">
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el género del producto"
              value={dataForm.genero}
              onChange={handleChange}
              required
              className={styles.customInput}
              name="genero"
            ></Form.Control>
          </Form.Group>
          {/* Imagen */}
          <Form.Group className="mb-3" controlId="formImagen">
            <Form.Label>Imagen {isEditMode && "(Opcional)"}</Form.Label>
            <Form.Control
              type="file"
              placeholder="Cargue la imagen del producto"
              accept="image/*"
              onChange={handleFile}
              required={!isEditMode}
              ref={fileInputRef}
              className={styles.customInput}
              name="imagen"
            ></Form.Control>
          </Form.Group>
          {/* Tipo */}
          <Form.Group className="mb-3" controlId="formTipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              value={dataForm.tipo}
              onChange={handleChange}
              required
              className={styles.customInput}
              name="tipo"
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
              onChange={handleChange}
              required
              className={styles.customInput}
              name="precio"
            ></Form.Control>
          </Form.Group>
          {/* Stock */}
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={dataForm.stock}
              onChange={handleChange}
              required
              className={styles.customInput}
              name="stock"
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
              onChange={handleChange}
              required
              className={styles.customInput}
              name="calificacion"
            ></Form.Control>
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end mt-3">
            {onCancel && (
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
                className="btn-outline-gold"
              >
                Cancelar
              </Button>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
              className="btn-gold"
            >
              {loading
                ? "Guardando..."
                : isEditMode
                  ? "Guardar Cambios"
                  : "Subir Producto"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}
