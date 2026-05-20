import { Link } from "react-router-dom";

export default function Header() {
  const linkClass = "hover:text-accent-primary transition-all duration-300";

  return (
    <header className="bg-primary flex justify-between items-center p-6 sticky top-0 z-50">
      <Link to={"/"}>
        <span className="text-accent-primary font-titulo tracking-widest text-4xl">
          NOCTURNA
        </span>
      </Link>

      <nav className="text-text-secondary flex font-sans">
        <ul className="flex gap-10">
          <li>
            <Link to={"/"} className={linkClass}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to={"/productos"} className={linkClass}>
              Productos
            </Link>
          </li>
          <li>
            <Link to={"/sobre-nosotros"} className={linkClass}>
              Sobre Nosotros
            </Link>
          </li>
        </ul>
      </nav>
      <p className="mr-6">Carrito</p>
    </header>
  );
}
