import { Link } from "react-router";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border text-text-muted">
      <div className="grid gap-10 px-6 py-12 lg:px-10 md:grid-cols-3">
        {/* Marca */}
        <div>
          <span className="font-jmono text-xl text-primary">Lugar Marcado</span>
          <p className="mt-3 max-w-xs text-sm leading-relaxed">
            Encontre restaurantes, escolha seu horário e garanta sua mesa em poucos cliques.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text-main">
            Navegação
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/restaurantes" className="hover:text-primary transition-colors">Restaurantes</Link></li>
            <li><Link to="/minhas-reservas" className="hover:text-primary transition-colors">Minhas reservas</Link></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-text-main">
            Contato
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot w-4 text-primary"></i> Rio de Janeiro, RJ
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-envelope w-4 text-primary"></i> contato@lugarmarcado.com
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"
               className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"
               className="grid h-9 w-9 place-items-center rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-border px-6 py-5 text-center text-xs lg:px-10">
        © {ano} Lugar Marcado. Projeto acadêmico desenvolvido por — Davi Carvalho.
      </div>
    </footer>
  );
}