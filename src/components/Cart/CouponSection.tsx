import { Coupon } from "@/types";

interface CouponSectionProps {
  couponCode: string;
  setCouponCode: (value: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string;
  couponSuccess: string;
  loadingCoupon: boolean;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
}

export default function CouponSection({
  couponCode,
  setCouponCode,
  appliedCoupon,
  couponError,
  couponSuccess,
  loadingCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CouponSectionProps) {
  return (
    <div
      className="mb-4 border-top pt-3"
      style={{ borderColor: "rgba(155, 151, 168, 0.15)" }}
    >
      <label className="text-text-secondary small mb-2 d-block">
        ¿Tenés un cupón de descuento?
      </label>
      <div className="d-flex gap-2">
        <input
          type="text"
          placeholder="Ingresar código"
          className="form-control customInput py-2 px-3 flex-grow-1"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          disabled={!!appliedCoupon || loadingCoupon}
          style={{ textTransform: "uppercase" }}
        />
        {appliedCoupon ? (
          <button
            type="button"
            className="btn btn-outline-danger px-3 py-2"
            onClick={onRemoveCoupon}
            style={{ borderRadius: "30px" }}
          >
            Quitar
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-gold px-3 py-2"
            onClick={onApplyCoupon}
            disabled={loadingCoupon || !couponCode.trim()}
          >
            {loadingCoupon ? "..." : "Aplicar"}
          </button>
        )}
      </div>
      {couponError && (
        <div className="text-danger small mt-2">{couponError}</div>
      )}
      {couponSuccess && (
        <div className="text-success small mt-2">{couponSuccess}</div>
      )}
    </div>
  );
}