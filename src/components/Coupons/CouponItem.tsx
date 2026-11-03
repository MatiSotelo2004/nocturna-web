import { Coupon } from "@/types";
import { FaTrash } from "react-icons/fa";

interface CouponItemProps {
  coupon: Coupon;
  onDelete: (id: string) => void;
}

export default function CouponItem({ coupon, onDelete }: CouponItemProps) {
  return (
    <div
      key={coupon.id}
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
      <p>Código: {coupon.codigo}</p>
      <p>Descuento: {coupon.descuento}%</p>
      <button className="btn-outline-gold" onClick={() => onDelete(coupon.id)}>
        Eliminar <FaTrash />
      </button>
    </div>
  );
}
