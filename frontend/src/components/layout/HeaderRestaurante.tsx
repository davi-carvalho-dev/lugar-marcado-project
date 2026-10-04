import { Link } from "react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/restaurantes", label: "Restaurantes" },
  { to: "/minhas-reservas", label: "Minhas reservas" },
];

export default function HeaderRestaurante() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/40 backdrop-blur-md border-b border-white/10">
      <nav className="flex items-center justify-between h-20 px-6 lg:px-10">
        <Link to="/" className="font-jmono text-xl text-primary">Logo</Link>

        <ul className="flex gap-8">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className="text-text-main/80 hover:text-primary transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="/login" aria-label="Entrar" className="p-2 rounded-full text-text-main hover:text-primary hover:bg-white/10 transition-colors">
          <i className="fa-solid fa-user text-xl"></i>
        </Link>
      </nav>
    </header>
  );
}