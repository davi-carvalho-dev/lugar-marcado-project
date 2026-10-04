import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router";
import { cancelarReserva, listarReservasPorEmail } from "../services/api";
import type { Reserva } from "../types/Reserva";
 
function emailSalvo() {
  return localStorage.getItem("emailCliente") ?? "";
}
 
export default function MinhasReservas() {
  const [email, setEmail] = useState(emailSalvo);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [buscou, setBuscou] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [cancelandoId, setCancelandoId] = useState<number | null>(null);
 
  function buscar(emailBusca: string) {
    setCarregando(true);
    setErro("");
 
    listarReservasPorEmail(emailBusca)
      .then((dados) => {
        setReservas(dados);
        setBuscou(true);
        localStorage.setItem("emailCliente", emailBusca);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }
 
  // Se já tem e-mail salvo (de uma reserva feita), busca automaticamente ao abrir a página
  useEffect(() => {
    const salvo = emailSalvo();
    if (!salvo) return;
 
    listarReservasPorEmail(salvo)
      .then((dados) => {
        setReservas(dados);
        setBuscou(true);
      })
      .catch((e) => setErro(e.message));
  }, []);
 
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email.trim()) buscar(email.trim());
  }
 
  async function handleCancelar(id: number) {
    if (!confirm("Tem certeza que deseja cancelar esta reserva?")) return;
 
    setCancelandoId(id);
    setErro("");
 
    try {
      const atualizada = await cancelarReserva(id);
      // Troca só a reserva cancelada na lista, sem buscar tudo de novo
      setReservas((lista) => lista.map((r) => (r.id === id ? atualizada : r)));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado");
    } finally {
      setCancelandoId(null);
    }
  }
 
  return (
    <section className="min-h-dvh pt-32 pb-20">
      <div className="mx-auto max-w-4xl px-6">
        <span className="text-sm uppercase tracking-[0.2em] text-primary">Sua agenda</span>
        <h1 className="mt-2 text-4xl font-semibold text-text-main md:text-5xl">Minhas reservas</h1>
        <p className="mt-3 text-text-muted">Digite o e-mail usado na reserva para consultar e cancelar.</p>
 
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"></i>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-4 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-3 font-medium text-background transition-colors hover:bg-primary-hover"
          >
            Buscar
          </button>
        </form>
 
        {erro && (
          <p className="mt-6 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            <i className="fa-solid fa-circle-exclamation"></i> {erro}
          </p>
        )}
 
        <div className="mt-10 space-y-4">
          {carregando && <p className="text-text-muted">Buscando reservas...</p>}
 
          {!carregando && buscou && reservas.length === 0 && (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center">
              <p className="text-text-muted">Nenhuma reserva encontrada para esse e-mail.</p>
              <Link to="/restaurantes" className="mt-4 inline-block text-primary hover:underline">
                Encontrar um restaurante →
              </Link>
            </div>
          )}
 
          {!carregando &&
            reservas.map((reserva) => {
              const data = new Date(reserva.dataHora);
              const passou = data < new Date();
              const cancelada = reserva.status === "CANCELADA";
              const podeCancelar = !cancelada && !passou;
 
              return (
                <article
                  key={reserva.id}
                  className={`flex flex-col gap-5 overflow-hidden rounded-2xl border border-border bg-surface sm:flex-row ${
                    cancelada ? "opacity-60" : ""
                  }`}
                >
                  <img
                    src={reserva.restaurante.imagemUrl}
                    alt={reserva.restaurante.nome}
                    className="h-40 w-full object-cover sm:h-auto sm:w-48"
                  />
 
                  <div className="flex flex-1 flex-col justify-between gap-4 p-6 sm:pl-0">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <h2 className="text-xl font-semibold text-text-main">{reserva.restaurante.nome}</h2>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                            cancelada
                              ? "bg-red-400/15 text-red-300"
                              : passou
                                ? "bg-border text-text-muted"
                                : "bg-green-400/15 text-green-300"
                          }`}
                        >
                          {cancelada ? "Cancelada" : passou ? "Concluída" : "Confirmada"}
                        </span>
                      </div>
 
                      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
                        <span className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar text-primary"></i>
                          {data.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "long" })}
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="fa-regular fa-clock text-primary"></i>
                          {data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-user-group text-primary"></i>
                          {reserva.quantidadePessoas} {reserva.quantidadePessoas === 1 ? "pessoa" : "pessoas"}
                        </span>
                        <span className="flex items-center gap-2">
                          <i className="fa-solid fa-location-dot text-primary"></i>
                          {reserva.restaurante.bairro}
                        </span>
                      </div>
                    </div>
 
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-text-muted">Código #{reserva.id}</span>
 
                      {podeCancelar && (
                        <button
                          type="button"
                          onClick={() => handleCancelar(reserva.id)}
                          disabled={cancelandoId === reserva.id}
                          className="rounded-full border border-red-400/40 px-4 py-2 text-sm text-red-300 transition-colors hover:bg-red-400/10 disabled:opacity-60"
                        >
                          {cancelandoId === reserva.id ? "Cancelando..." : "Cancelar reserva"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}