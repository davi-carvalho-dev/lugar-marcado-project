import { Link } from "react-router";
 
const links = [
  { to: "/", label: "Home" },
  { to: "/restaurantes", label: "Restaurantes" },
  { to: "/minhas-reservas", label: "Minhas reservas" },
];
 
export default function Footer() {
  const ano = new Date().getFullYear();
 
  return (
    <footer className="border-t border-border bg-surface text-text-muted">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 text-center md:grid-cols-3">
        {/* Marca */}
        <div className="flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center gap-3" aria-label="Lugar Marcado - página inicial">
            <img src="/image/logo.png" alt="" className="h-14 w-auto" />
            <span className="font-jmono text-xl text-primary">Lugar Marcado</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Encontre restaurantes, escolha seu horário e garanta sua mesa em poucos cliques.
          </p>
        </div>
 
        {/* Navegação */}
        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text-main">Navegação</h3>
          <ul className="space-y-2 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="transition-colors hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
 
        {/* Contato */}
        <div className="flex flex-col items-center">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text-main">Contato</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-location-dot text-primary"></i> Rio de Janeiro, RJ
            </li>
            <li className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-envelope text-primary"></i> contato@lugarmarcado.com
            </li>
          </ul>
 
          <div className="mt-5 flex justify-center gap-3">
            <a
              href="https://github.com/davi-carvalho-dev/lugar-marcado-project"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-9 w-9 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
 
      <div className="border-t border-border px-6 py-5 text-center text-xs">
        © {ano} Lugar Marcado. Projeto acadêmico — Desenvolvimento Backend.
      </div>
    </footer>
  );
}