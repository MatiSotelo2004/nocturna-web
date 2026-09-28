import styles from "./ItemSkeleton.module.css";

export default function ItemSkeleton() {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      {/* Portada Skeleton */}
      <div className={`${styles.coverPlaceholder} skeleton-shimmer`}>
        <div className={`${styles.badgePlaceholder} skeleton-shimmer`} />
      </div>

      {/* Info Skeleton */}
      <div className="card-body d-flex flex-column p-3 justify-content-between flex-grow-1">
        <div>
          <div className={`${styles.genreLine} skeleton-shimmer`} />
          <div className={`${styles.titleLine1} skeleton-shimmer`} />
          <div className={`${styles.titleLine2} skeleton-shimmer`} />
          <div className={`${styles.authorLine} skeleton-shimmer`} />
        </div>

        <div className="mt-auto">
          <div className={`${styles.priceLine} skeleton-shimmer`} />
          <div className={`${styles.btnPlaceholder} skeleton-shimmer`} />
        </div>
      </div>
    </div>
  );
}
