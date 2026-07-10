import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <Container className={`${styles.container} transicion-pagina`}>
      <div className={styles.card}>
        <FaExclamationTriangle className={styles.icon} />
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Página No Encontrada</h2>
        <p className={styles.description}>
          Lo sentimos, el recurso que estás buscando no existe, ha sido eliminado o se encuentra temporalmente fuera de servicio.
        </p>
        <Link to="/" className="btn btn-gold px-4 py-2 text-decoration-none">
          Volver al Inicio
        </Link>
      </div>
    </Container>
  );
}
