import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { Logout, userData, isAdmin } = useAuth();

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center py-5 transicion-pagina"
      style={{ minHeight: "80vh" }}
    >
      <div
        className={`${styles.profileCard} d-flex flex-column align-items-center`}
      >
        {/* Avatar */}
        <div className={styles.avatarCircle}>
          {userData?.fullName ? getInitials(userData.fullName) : "U"}
        </div>

        <h2 className="text-accent-primary mb-1">Mi Perfil</h2>
        <p className="text-text-secondary mb-4">Bienvenido a Nocturna</p>

        {/* Informacion */}
        <div className={styles.infoSection}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Nombre Completo</span>
            <span className={styles.infoValue}>
              {userData?.fullName || "No disponible"}
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Nombre de Usuario</span>
            <span className={styles.infoValue}>
              @{userData?.userName || "no_user"}
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Correo Electrónico</span>
            <span className={styles.infoValue}>
              {userData?.email || "No disponible"}
            </span>
          </div>

          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Tipo de Cuenta</span>
            <span className={styles.infoValue}>
              {isAdmin ? (
                <span className={`${styles.roleBadge} ${styles.badgeAdmin}`}>
                  Administrador
                </span>
              ) : (
                <span className={`${styles.roleBadge} ${styles.badgeUser}`}>
                  Cliente
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Botones */}
        <div className={styles.actionButtons}>
          {isAdmin && (
            <Link
              to="/admin"
              className="btn btn-gold d-block w-100 text-center py-2 text-decoration-none"
            >
              Panel de Administración
            </Link>
          )}

          <button
            onClick={Logout}
            className={`${styles.btnDangerCustom} w-100 py-2`}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </Container>
  );
}
