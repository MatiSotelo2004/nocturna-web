import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";
import { useState } from "react";

export default function Header() {
  const linkClass = ({ isActive }) =>
    `${isActive ? "text-accent-primary font-bold " : "hover:text-accent-primary transition-all duration-300"}`;

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-primary items-center p-6 sticky top-0 z-50 ">
      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex justify-between items-center">
        {/* BOTON PARA ABRIR MENU (DISPOSITIVOS MOVILES) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-text-secondary hover:text-accent-primary transition-colors focus:outline-none md:hidden cursor-pointer"
          aria-label="Abrir menú"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* LOGO */}
        <Link to={"/"} onClick={closeMenu}>
          <span className="text-accent-primary font-titulo tracking-widest text-4xl">
            NOCTURNA
          </span>
        </Link>

        {/* NAVBAR ESCRITORIO */}
        <nav className="text-text-secondary hidden md:flex font-sans">
          <ul className="flex gap-10">
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
        <CartWidget />
      </div>

      {/* MENU SECUNDARIO (DISPOSITIVOS MOVILES) */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-60 opacity-100 mt-4"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="text-text-secondary pt-4">
          <ul className="flex flex-col gap-4 text-center pb-2">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}
