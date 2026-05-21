import { Link, NavLink } from "react-router-dom";
import CartWidget from "./CartWidget";

export default function Header() {
  const linkClass = ({isActive}) =>`${isActive ? "text-accent-primary font-bold " :"hover:text-accent-primary transition-all duration-300"}`;
  

  return (
    <header className="bg-primary flex gap-3 flex-col justify-between items-center p-6 sticky top-0 z-50 md:flex-row">
      <Link to={"/"}>
        <span className="text-accent-primary font-titulo tracking-widest text-4xl">
          NOCTURNA
        </span>
      </Link>

      <nav className="text-text-secondary flex font-sans">
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
      <CartWidget/>
    </header>
  );
}
