import { ChangeEvent, FormEvent } from "react";

interface NewCouponType {
  codigo: string;
  descuento: string;
}

interface CouponFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  submitting: boolean;
  coupon: NewCouponType;
}

export default function CouponForm({
  onSubmit,
  onChange,
  onCancel,
  submitting,
  coupon,
}: CouponFormProps) {
  return (
    <form
      onSubmit={onSubmit}
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
        onChange={onChange}
        value={coupon.codigo}
      />
      <label>Descuento: </label>
      <input
        type="number"
        name="descuento"
        id="descuento"
        className="customInput"
        value={coupon.descuento}
        onChange={onChange}
        max={100}
        min={1}
        step={1}
        required
      />
      <div className="d-flex gap-3">
        <button
          className="btn-outline-gold"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancelar
        </button>
        <button className="btn-gold" type="submit" disabled={submitting}>
          Guardar
        </button>
      </div>
    </form>
  );
}
