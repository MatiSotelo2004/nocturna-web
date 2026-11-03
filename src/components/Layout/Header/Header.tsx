import { Link, NavLink, useLocation } from "react-router-dom";
import CartWidget from "@/components/Layout/Header/CartWidget";
import { FaBars, FaTimes, FaUser, FaSignInAlt } from "react-icons/fa";
import styles from "./Header.module.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUIStore } from "@/stores/useUIStore";

export default function Header() {
  const location = useLocation();
  const isUserActive = ["/auth", "/dashboard", "/admin"].includes(
    location.pathname,
  );

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${styles.navLinkCustom} ${isActive ? "active" : ""}`;

  const isOpen = useUIStore((state) => state.isMenuOpen);
  const toggleMenu = useUIStore((state) => state.toggleMenu);
  const closeMenu = useUIStore((state) => state.closeMenu);

  //AUTH
  const user = useAuthStore((state) => state.user);
  return (
    <header className="bg-primary p-4 sticky-top z-3">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* BOTON PARA ABRIR MENU (DISPOSITIVOS MOVILES) */}
        <button
          onClick={toggleMenu}
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
          {user ? (
            <Link
              to="/dashboard"
              className={`${styles.userProfileIcon} ${isUserActive ? "active" : ""} d-none d-md-inline-flex`}
              title="Mi Cuenta"
              aria-label="Mi Cuenta"
            >
              <FaUser />
            </Link>
          ) : (
            <Link
              to="/auth"
              className={`${styles.loginLinkBtn} ${isUserActive ? "active" : ""} d-none d-md-inline-flex`}
            >
              <FaSignInAlt style={{ fontSize: "0.85rem" }} />
              <span>Iniciar Sesión</span>
            </Link>
          )}
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
                {user ? (
                  <NavLink
                    to={"/dashboard"}
                    className={linkClass}
                    onClick={closeMenu}
                  >
                    Mi Cuenta
                  </NavLink>
                ) : (
                  <NavLink
                    to={"/auth"}
                    className={linkClass}
                    onClick={closeMenu}
                  >
                    Iniciar Sesión
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
