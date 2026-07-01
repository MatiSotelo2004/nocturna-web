import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import styles from "./Header.module.css";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
  const linkClass = ({ isActive }) =>
    `${styles.navLinkCustom} ${isActive ? "active" : ""}`;

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  //AUTH
  const { user } = useAuth();
  return (
    <header className="bg-primary p-4 sticky-top z-3">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* BOTON PARA ABRIR MENU (DISPOSITIVOS MOVILES) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn text-text-secondary d-md-none border-0 p-0"
          aria-label="Abrir menú"
          style={{ fontSize: "1.5rem" }}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <Link to={"/"} onClick={closeMenu} className="text-decoration-none">
          <span className="text-accent-primary font-serif fs-2 tracking-wider fw-bold">
            NOCTURNA
          </span>
        </Link>

        {/* NAVBAR ESCRITORIO */}
        <nav className="d-none d-md-flex align-items-center">
          <ul className="d-flex gap-4 list-unstyled mb-0">
            <li>
              <NavLink to={"/"} className={linkClass}>
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to={"/productos"} className={linkClass}>
                Productos
              </NavLink>
            </li>
            <li>
              <NavLink to={"/sobre-nosotros"} className={linkClass}>
                Sobre Nosotros
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ICONOS DERECHA */}
        <div className="d-flex align-items-center gap-3">
          <Link
            to="/Auth"
            className="text-text-secondary"
            style={{ fontSize: "1.3rem" }}
          >
            {user ? (
              <FaUser className={styles.navIcons} />
            ) : (
              <button className={styles.loginBtn}>Iniciar Sesión</button>
            )}
          </Link>
          <CartWidget />
        </div>
      </div>

      {/* MENU SECUNDARIO (DISPOSITIVOS MOVILES) */}
      {isOpen && (
        <div className="d-md-none">
          <nav className="text-text-secondary">
            <ul className="d-flex flex-column gap-3 text-center pb-2 list-unstyled mt-3 mb-0">
              <li>
                <NavLink to={"/"} className={linkClass} onClick={closeMenu}>
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/productos"}
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Productos
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/sobre-nosotros"}
                  className={linkClass}
                  onClick={closeMenu}
                >
                  Sobre Nosotros
                </NavLink>
              </li>
              <li>
                <NavLink to={"/Auth"} className={linkClass} onClick={closeMenu}>
                  Iniciar Sesión
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
