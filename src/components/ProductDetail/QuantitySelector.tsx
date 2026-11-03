import { FaMinus, FaPlus } from "react-icons/fa";

interface QuantitySelectorProps {
  cantidad: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantitySelector({
  cantidad,
  onIncrement,
  onDecrement,
}: QuantitySelectorProps) {
  return (
    <div
      className="d-flex align-items-center justify-content-between border rounded p-2 bg-secondary"
      style={{ borderColor: "rgba(155, 151, 168, 0.2)" }}
    >
      <span className="text-text-secondary small ps-1">Cantidad:</span>
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-sm text-light p-1 border-0"
          onClick={onDecrement}
          style={{ fontSize: "0.9rem" }}
        >
          <FaMinus />
        </button>
        <span
          className="text-light fw-bold px-2"
          style={{ fontSize: "1.1rem" }}
        >
          {cantidad}
        </span>
        <button
          className="btn btn-sm text-light p-1 border-0"
          onClick={onIncrement}
          style={{ fontSize: "0.9rem" }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
