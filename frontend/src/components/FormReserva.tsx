import { useState } from "react";
import { Link } from "react-router";
import { criarReserva } from "../services/api";
import type { Reserva } from "../types/Reserva";

type Props = {
  restauranteId: number;
};

// Data/hora atual no formato que o input datetime-local entende: "2026-10-04T19:46"
function agoraLocal() {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  return agora.toISOString().slice(0, 16);
}

const inputClasse =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none";

export default function FormReserva({ restauranteId }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataHora, setDataHora] = useState("");
  const [pessoas, setPessoas] = useState(2);

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [reservaCriada, setReservaCriada] = useState<Reserva | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    try {
      const reserva = await criarReserva({
        restauranteId,
        nomeCliente: nome,
        emailCliente: email,
        dataHora,
        quantidadePessoas: pessoas,
      });
      localStorage.setItem("emailCliente", email);
      setReservaCriada(reserva);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setEnviando(false);
    }
  }

  if (reservaCriada) {
    const data = new Date(reservaCriada.dataHora);

    return (
      <div className="rounded-2xl border border-primary/40 bg-surface p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <i className="fa-solid fa-check text-2xl"></i>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-text-main">Reserva confirmada!</h3>
        <p className="mt-2 text-text-muted">
          {reservaCriada.restaurante.nome} ·{" "}
          {data.toLocaleDateString("pt-BR")} às{" "}
          {data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} ·{" "}
          {reservaCriada.quantidadePessoas}{" "}
          {reservaCriada.quantidadePessoas === 1 ? "pessoa" : "pessoas"}
        </p>
        <p className="mt-1 text-sm text-text-muted">Código da reserva: #{reservaCriada.id}</p>

        <Link
          to="/minhas-reservas"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Ver minhas reservas
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-8">
      <div>
        <h3 className="text-2xl font-semibold text-text-main">Reserve sua mesa</h3>
        <p className="mt-1 text-sm text-text-muted">A confirmação é imediata.</p>
      </div>

      <div>
        <label htmlFor="nome" className="mb-2 block text-sm text-text-muted">Nome</label>
        <input id="nome" type="text" autoComplete="name" required value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome" className={inputClasse} />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-text-muted">E-mail</label>
        <input id="email" type="email" autoComplete="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com" className={inputClasse} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="dataHora" className="mb-2 block text-sm text-text-muted">Data e horário</label>
          <input id="dataHora" type="datetime-local" autoComplete="datetime" required min={agoraLocal()} value={dataHora}
            onChange={(e) => setDataHora(e.target.value)}
            className={`${inputClasse} [color-scheme:dark]`} />
        </div>

        <div>
          <label htmlFor="pessoas" className="mb-2 block text-sm text-text-muted">Pessoas</label>
          <input id="pessoas" type="number" autoComplete="off" required min={1} max={20} value={pessoas}
            onChange={(e) => setPessoas(Number(e.target.value))}
            className={inputClasse} />
        </div>
      </div>

      {erro && (
        <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <i className="fa-solid fa-circle-exclamation"></i> {erro}
        </p>
      )}

      <button type="submit" disabled={enviando}
        className="w-full rounded-full bg-primary py-3 font-medium text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">
        {enviando ? "Reservando..." : "Confirmar reserva"}
      </button>
    </form>
  );
}