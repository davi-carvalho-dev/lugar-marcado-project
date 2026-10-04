import { useEffect, useState } from "react";
import CardRestaurante from "../components/CardRestaurante";
import { listarRestaurantes } from "../services/api";
import type { Restaurante } from "../types/Restaurantes";

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [bairro, setBairro] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  function buscar(filtro?: string) {
    setCarregando(true);
    setErro("");

    listarRestaurantes(filtro)
      .then(setRestaurantes)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    buscar();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    buscar(bairro.trim() || undefined);
  }

  function limpar() {
    setBairro("");
    buscar();
  }

  return (
    <section className="min-h-dvh pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">Explore</span>
        <h1 className="mt-2 text-4xl font-semibold text-text-main md:text-5xl">Restaurantes</h1>
        <p className="mt-3 text-text-muted">Encontre o lugar ideal e reserve sua mesa.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <i className="fa-solid fa-location-dot absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"></i>
            <input
              type="text"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              placeholder="Filtrar por bairro (ex.: Centro, Urca)"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Buscar
          </button>

          {bairro && (
            <button
              type="button"
              onClick={limpar}
              className="rounded-full border border-border px-6 py-3 text-text-muted transition-colors hover:border-primary hover:text-primary"
            >
              Limpar
            </button>
          )}
        </form>

        <div className="mt-10">
          {carregando && <p className="text-text-muted">Carregando restaurantes...</p>}

          {erro && <p className="text-red-400">{erro}</p>}

          {!carregando && !erro && restaurantes.length === 0 && (
            <p className="text-text-muted">Nenhum restaurante encontrado nesse bairro.</p>
          )}

          {!carregando && !erro && restaurantes.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {restaurantes.map((restaurante) => (
                <CardRestaurante key={restaurante.id} restaurante={restaurante} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}