import { Link } from "react-router";
import type { Restaurante } from "../types/Restaurantes";

type Props = {
  restaurante: Restaurante;
};

export default function CardRestaurante({ restaurante }: Props) {
  const preco = "$".repeat(restaurante.faixaPreco);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-primary/60">
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurante.imagemUrl}
          alt={restaurante.nome}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-xs text-text-main backdrop-blur-sm">
          {restaurante.culinaria}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-text-main">{restaurante.nome}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm text-primary">
            <i className="fa-solid fa-star text-xs"></i>
            {restaurante.avaliacao.toFixed(1)}
          </span>
        </div>

        <p className="mt-1 flex items-center gap-2 text-sm text-text-muted">
          <i className="fa-solid fa-location-dot text-xs"></i>
          {restaurante.bairro} · <span className="tracking-widest">{preco}</span>
        </p>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-text-muted">
          {restaurante.descricao}
        </p>

        <Link
          to={`/restaurantes/${restaurante.id}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Reservar mesa
          <i className="fa-solid fa-arrow-right text-xs"></i>
        </Link>
      </div>
    </article>
  );
}