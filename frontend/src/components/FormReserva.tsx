import { useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/auth";
import { criarReserva } from "../services/api";
import type { Reserva } from "../types/Reserva";

type Props = {
  restauranteId: number;
};

// Horários de funcionamento: almoço e jantar, a cada 30 min
const HORARIOS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

// Data de hoje no formato do input date: "2026-10-04"
function hojeLocal() {
  const agora = new Date();
  agora.setMinutes(agora.getMinutes() - agora.getTimezoneOffset());
  return agora.toISOString().slice(0, 10);
}

// Se a data for hoje, só mostra os horários que ainda não passaram
function horariosDisponiveis(data: string) {
  if (data !== hojeLocal()) return HORARIOS;

  const agora = new Date();
  const minutosAgora = agora.getHours() * 60 + agora.getMinutes();

  return HORARIOS.filter((h) => {
    const [hora, minuto] = h.split(":").map(Number);
    return hora * 60 + minuto > minutosAgora;
  });
}

const inputClasse =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none";

export default function FormReserva({ restauranteId }: Props) {
  const { cliente } = useAuth();
  const location = useLocation();

  const [nome, setNome] = useState(cliente?.nome ?? "");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [pessoas, setPessoas] = useState(2);

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [reservaCriada, setReservaCriada] = useState<Reserva | null>(null);

  const horarios = data ? horariosDisponiveis(data) : [];

  // Sem login, não dá para reservar
  if (!cliente) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <i className="fa-solid fa-lock text-xl"></i>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-text-main">Entre para reservar</h3>
        <p className="mt-2 text-text-muted">Faça login ou crie sua conta para garantir sua mesa.</p>
        <Link
          to="/login"
          state={{ from: location.pathname }}
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
        >
          Entrar ou criar conta
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cliente) return;

    setEnviando(true);
    setErro("");

    try {
      const reserva = await criarReserva({
        restauranteId,
        nomeCliente: nome,
        emailCliente: cliente.email,
        dataHora: `${data}T${horario}:00`,
        quantidadePessoas: pessoas,
      });
      setReservaCriada(reserva);
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : "Erro inesperado");
    } finally {
      setEnviando(false);
    }
  }

  if (reservaCriada) {
    const dataReserva = new Date(reservaCriada.dataHora);

    return (
      <div className="rounded-2xl border border-primary/40 bg-surface p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
          <i className="fa-solid fa-check text-2xl"></i>
        </div>
        <h3 className="mt-4 text-2xl font-semibold text-text-main">Reserva confirmada!</h3>
        <p className="mt-2 text-text-muted">
          {reservaCriada.restaurante.nome} · {dataReserva.toLocaleDateString("pt-BR")} às{" "}
          {dataReserva.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} ·{" "}
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
        <label htmlFor="nome" className="mb-2 block text-sm text-text-muted">Nome da reserva</label>
        <input
          id="nome"
          type="text"
          autoComplete="name"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className={inputClasse}
        />
      </div>

      <div>
        <span className="mb-2 block text-sm text-text-muted">E-mail</span>
        <p className="flex items-center gap-2 rounded-xl border border-border bg-background/50 px-4 py-3 text-text-muted">
          <i className="fa-solid fa-envelope text-primary"></i> {cliente.email}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="data" className="mb-2 block text-sm text-text-muted">Data</label>
          <input
            id="data"
            type="date"
            required
            min={hojeLocal()}
            value={data}
            onChange={(e) => {
              setData(e.target.value);
              setHorario("");
            }}
            className={`${inputClasse} [color-scheme:dark]`}
          />
        </div>

        <div>
          <label htmlFor="pessoas" className="mb-2 block text-sm text-text-muted">Pessoas</label>
          <input
            id="pessoas"
            type="number"
            required
            min={1}
            max={20}
            value={pessoas}
            onChange={(e) => setPessoas(Number(e.target.value))}
            className={inputClasse}
          />
        </div>
      </div>

      {data && (
        <div>
          <span className="mb-2 block text-sm text-text-muted">Horário</span>

          {horarios.length === 0 ? (
            <p className="text-sm text-text-muted">Não há mais horários hoje. Escolha outra data.</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {horarios.map((h) => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHorario(h)}
                  className={`rounded-lg border py-2 text-sm transition-colors ${
                    horario === h
                      ? "border-primary bg-primary text-background"
                      : "border-border text-text-main hover:border-primary"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {erro && (
        <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          <i className="fa-solid fa-circle-exclamation"></i> {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando || !horario}
        className="w-full rounded-full bg-primary py-3 font-medium text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? "Reservando..." : horario ? "Confirmar reserva" : "Escolha data e horário"}
      </button>
    </form>
  );
}