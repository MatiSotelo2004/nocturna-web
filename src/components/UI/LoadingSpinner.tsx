import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  text?: string;
  size?: "sm" | "md" | "lg";
  minHeight?: string;
  className?: string;
}

export default function LoadingSpinner({
  text,
  size = "md",
  minHeight,
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      className={`${styles.spinnerContainer} ${className}`}
      style={minHeight ? { minHeight } : undefined}
      role="status"
      aria-label={text || "Cargando"}
    >
      <div className={`${styles.spinnerWrapper} ${styles[size]}`}>
        <div className={styles.outerRing} />
        <div className={styles.innerRing} />
        <div className={styles.centerGlow} />
      </div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
}
