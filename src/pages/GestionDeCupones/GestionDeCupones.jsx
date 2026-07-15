import { useState } from "react";
import { db } from "../../firebase/config";
import { getDocs, addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";

export default function GestiondDeCupones() {
  const [cupones, setCupones] = useState([]);
  const [codigo, setCodigo] = useState("");
  const [descuento, setDescuento] = useState("");
  const [crearCupon, setCrearCupon] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dataToSave = {
        codigo: codigo,
        descuento: descuento,
      };
      const res = await addDoc(collection(db, "cupones"), dataToSave);
      console.log("Cupon agregado con el Id:", res.id);
      alert("Cupon agregado con exito");
    } catch (e) {
      console.error(e.message);
    } finally {
      setCodigo("");
      setCrearCupon("");
      setDescuento("");
      setSubmitting(false);
    }
  };

  const handleDelete = async (cuponId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        const res = doc(db, "cupones", cuponId);
        await deleteDoc(res);
        console.log("Documento eliminado con ID: ", cuponId);

        // Actualizar el estado local
        setCupones(cupones.filter((c) => c.id !== cuponId));
        alert("Producto eliminado exitosamente!");
      } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
      }
    }
  };

  useEffect(() => {
    const obtenerCupones = async () => {
      try {
        const res = await getDocs(collection(db, "cupones"));
        const lista = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCupones(lista);
      } catch (e) {
        console.error("Error al obtener los cupones:", e);
        alert("Ocurrió un error al cargar los cupones.");
      }
    };
    obtenerCupones();
  }, [submitting]);

  return (
    <div
      className="transicion-pagina"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3rem",
        paddingTop: "5%",
      }}
    >
      <h2 className="text-accent-primary">Administracion de Cupones</h2>
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {cupones.map((cupon) => {
          return (
            <div
              key={cupon.id}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "auto",
                alignItems: "center",
                border: "solid 1px",
                borderColor: "var(--text-muted)",
                padding: "1rem 5rem",
                marginBottom: "15px",
                borderRadius: ".5rem",
              }}
            >
              <p>Código: {cupon.codigo}</p>
              <p>Descuento: {cupon.descuento}%</p>
              <button
                className="btn-outline-gold"
                onClick={() => handleDelete(cupon.id)}
              >
                Eliminar <FaTrash />
              </button>
            </div>
          );
        })}
        {crearCupon && (
          <form
            onSubmit={(e) => handleSubmit(e)}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              alignItems: "center",
              border: "solid 1px",
              borderColor: "var(--text-muted)",
              padding: "1rem 5rem",
              marginBottom: "15px",
              borderRadius: ".5rem",
              gap: "10px",
            }}
          >
            <label>Código: </label>
            <input
              type="text"
              name="codigo"
              id="codigo"
              required
              className="customInput"
              onChange={(e) => setCodigo(e.target.value)}
              value={codigo}
            />
            <label>Descuento: </label>
            <input
              type="number"
              name="descuento"
              id="descuento"
              className="customInput"
              value={descuento}
              onChange={(e) => {
                setDescuento(e.target.value);
              }}
              max={100}
              min={1}
              step={1}
              required
            />
            <div className="d-flex gap-3">
              <button
                className="btn-outline-gold"
                onClick={() => {
                  setCrearCupon(false);
                  setCodigo("");
                  setDescuento("");
                }}
                disabled={submitting}
              >
                Cancelar
              </button>
              <button className="btn-gold" type="sumbit" disabled={submitting}>
                Guardar
              </button>
            </div>
          </form>
        )}
        <button className="btn-gold" onClick={() => setCrearCupon(true)}>
          Crear Cupon
        </button>
      </section>
    </div>
  );
}
