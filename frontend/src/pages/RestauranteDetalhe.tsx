import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import FormReserva from "../components/FormReserva";
import { buscarRestaurante } from "../services/api";
import type { Restaurante } from "../types/Restaurantes";

export default function RestauranteDetalhe() {
  const { id } = useParams();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    buscarRestaurante(Number(id))
      .then(setRestaurante)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, [id]);

  if (carregando) {
    return <p className="min-h-dvh px-6 pt-32 text-center text-text-muted">Carregando...</p>;
  }

  if (erro || !restaurante) {
    return (
      <div className="min-h-dvh px-6 pt-32 text-center">
        <h1 className="text-3xl font-semibold text-text-main">{erro || "Restaurante não encontrado"}</h1>
        <Link to="/restaurantes" className="mt-6 inline-block text-primary hover:underline">
          ← Voltar para restaurantes
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="relative isolate h-[50vh] min-h-80">
        <img src={restaurante.imagemUrl} alt={restaurante.nome}
          className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/20"></div>

        <div className="mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-10">
          <Link to="/restaurantes" className="mb-4 text-sm text-text-muted hover:text-primary">
            ← Todos os restaurantes
          </Link>
          <span className="w-fit rounded-full bg-background/70 px-3 py-1 text-xs text-text-main backdrop-blur-sm">
            {restaurante.culinaria}
          </span>
          <h1 className="mt-3 text-4xl font-semibold text-text-main md:text-6xl">{restaurante.nome}</h1>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-10 lg:grid-cols-[1fr_420px]">
        <div>
          <div className="flex flex-wrap gap-6 text-text-muted">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-star text-primary"></i> {restaurante.avaliacao.toFixed(1)}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-primary"></i>
              {restaurante.bairro}, {restaurante.cidade}
            </span>
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-wallet text-primary"></i>
              <span className="tracking-widest">{"$".repeat(restaurante.faixaPreco)}</span>
            </span>
          </div>

          <h2 className="mt-10 text-sm uppercase tracking-[0.2em] text-primary">Sobre</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-text-muted">{restaurante.descricao}</p>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <FormReserva restauranteId={restaurante.id} />
        </aside>
      </div>
    </div>
  );
}