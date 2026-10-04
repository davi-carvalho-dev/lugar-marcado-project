import { useEffect, useState } from "react";
import { Link } from "react-router";
import CardRestaurante from "../CardRestaurante";
import { listarRestaurantes } from "../../services/api";
import type { Restaurante } from "../../types/Restaurantes";

export default function RestauranteDestaque() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarRestaurantes()
      .then((dados) => setRestaurantes(dados.slice(0, 3)))
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-primary">Em destaque</span>
            <h2 className="mt-2 text-3xl font-semibold text-text-main md:text-4xl">
              Restaurantes perto de você
            </h2>
          </div>

          <Link
            to="/restaurantes"
            className="flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary"
          >
            Ver todos <i className="fa-solid fa-arrow-right text-xs"></i>
          </Link>
      </div>

        {carregando && <p className="text-text-muted">Carregando restaurantes...</p>}
        {erro && <p className="text-red-400">{erro}</p>}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {restaurantes.map((restaurante) => (
            <CardRestaurante key={restaurante.id} restaurante={restaurante} />
          ))}
        </div>
      </div>
    </section>
  );
}