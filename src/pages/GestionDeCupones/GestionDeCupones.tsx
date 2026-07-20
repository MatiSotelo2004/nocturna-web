import { ChangeEvent, useState } from "react";
import { db } from "@/firebase/config";
import {
  getDocs,
  addDoc,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, SubmitEvent } from "react";
import CouponItem from "@/components/Coupons/CouponItem";
import CouponForm from "@/components/Coupons/CouponForm";
import { Coupon } from "@/types";

export default function GestiondDeCupones() {
  const [cupones, setCupones] = useState<Coupon[]>([]);
  const [newCupon, setNewCupon] = useState({
    codigo: "",
    descuento: "",
  });
  const [crearCupon, setCrearCupon] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const dataToSave: Omit<Coupon, "id"> = {
        codigo: newCupon.codigo,
        descuento: parseInt(newCupon.descuento),
      };
      const res = await addDoc(collection(db, "cupones"), dataToSave);
      console.log("Cupon agregado con el Id:", res.id);
      alert("Cupon agregado con exito");
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setNewCupon({
        codigo: "",
        descuento: "",
      });
      setCrearCupon(false);
      setSubmitting(false);
    }
  };

  const handleDelete = async (cuponId: string) => {
    if (window.confirm("¿Está seguro de que desea eliminar este producto?")) {
      try {
        const res = doc(db, "cupones", cuponId);
        await deleteDoc(res);
        console.log("Documento eliminado con ID: ", cuponId);

        // Actualizar el estado local
        setCupones(cupones.filter((c: Coupon) => c.id !== cuponId));
        alert("Producto eliminado exitosamente!");
      } catch (error) {
        console.error("Error al eliminar el producto: ", error);
        alert("Error al eliminar el producto. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const handleCancel = () => {
    setNewCupon({
      codigo: "",
      descuento: "",
    });
    setCrearCupon(false);
    setSubmitting(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCupon({ ...newCupon, [name]: value });
  };

  useEffect(() => {
    const obtenerCupones = async () => {
      try {
        const res = await getDocs(collection(db, "cupones"));
        const lista = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Coupon[];
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
            <CouponItem key={cupon.id} coupon={cupon} onDelete={handleDelete} />
          );
        })}

        {crearCupon && (
          <CouponForm
            coupon={newCupon}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            onChange={handleChange}
            submitting={submitting}
          />
        )}

        <button className="btn-gold" onClick={() => setCrearCupon(true)}>
          Crear Cupon
        </button>
      </section>
    </div>
  );
}
