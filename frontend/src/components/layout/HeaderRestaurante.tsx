import { Link, NavLink } from "react-router";
import { useAuth } from "../../context/auth";

const links = [
  { to: "/", label: "Home" },
  { to: "/restaurantes", label: "Restaurantes" },
  { to: "/minhas-reservas", label: "Minhas reservas" },
];

export default function HeaderRestaurante() {
  const { cliente, sair } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/40 backdrop-blur-md">
      <nav className="flex h-20 items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Lugar Marcado - página inicial">
          <img src="/image/logo.png" alt="" className="h-11 w-auto" />
          <span className="hidden font-jmono text-xl text-primary sm:block">Lugar Marcado</span>
        </Link>

        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `text-lg transition-colors ${
                    isActive ? "text-primary" : "text-text-main/80 hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {cliente ? (
          <div className="flex items-center gap-2">
            <Link to="/login" className="flex items-center gap-2 rounded-full px-3 py-2 text-text-main transition-colors hover:bg-white/10 hover:text-primary">
              <i className="fa-solid fa-circle-user text-xl"></i>
              <span className="hidden md:block">{cliente.nome.split(" ")[0]}</span>
            </Link>
            <button type="button" onClick={sair} aria-label="Sair"
              className="rounded-full p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-primary">
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </button>
          </div>
        ) : (
          <Link to="/login" aria-label="Entrar"
            className="flex items-center gap-2 rounded-full px-3 py-2 text-text-main transition-colors hover:bg-white/10 hover:text-primary">
            <i className="fa-solid fa-user text-xl"></i>
            <span className="hidden md:block">Entrar</span>
          </Link>
        )}
      </nav>
    </header>
  );
}