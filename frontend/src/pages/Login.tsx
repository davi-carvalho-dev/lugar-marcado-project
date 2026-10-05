import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth";
import { cadastrarCliente, loginCliente } from "../services/api";

type Modo = "entrar" | "cadastrar";

const inputClasse =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none";

export default function Login() {
  const { cliente, entrar, sair } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Se veio de outra página (ex.: tentou reservar), volta para ela depois do login
  const destino = (location.state as { from?: string } | null)?.from ?? "/minhas-reservas";

  const [modo, setModo] = useState<Modo>("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setErro("");

    try {
      const clienteLogado =
        modo === "entrar"
          ? await loginCliente({ email, senha })
          : await cadastrarCliente({ nome, email, senha });

      entrar(clienteLogado);
      navigate(destino, { replace: true });
    } catch (erroCapturado) {
      setErro(erroCapturado instanceof Error ? erroCapturado.message : "Erro inesperado");
    } finally {
      setEnviando(false);
    }
  }

  function trocarModo(novoModo: Modo) {
    setModo(novoModo);
    setErro("");
  }

  if (cliente) {
    return (
      <section className="grid min-h-dvh place-items-center px-6 pt-20">
        <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary">
            <i className="fa-solid fa-user text-xl"></i>
          </div>
          <h1 className="mt-4 text-2xl font-semibold text-text-main">Olá, {cliente.nome.split(" ")[0]}!</h1>
          <p className="mt-1 text-text-muted">{cliente.email}</p>

          <div className="mt-6 flex flex-col gap-3">
            <Link to="/minhas-reservas"
              className="rounded-full bg-primary py-3 font-medium text-background transition-colors hover:bg-primary-hover">
              Minhas reservas
            </Link>
            <button type="button" onClick={sair}
              className="rounded-full border border-border py-3 text-text-muted transition-colors hover:border-primary hover:text-primary">
              Sair da conta
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid min-h-dvh place-items-center px-6 pt-28 pb-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src="/image/logo.png" alt="" className="mx-auto h-16 w-auto" />
          <h1 className="mt-4 text-3xl font-semibold text-text-main">
            {modo === "entrar" ? "Bem-vindo de volta" : "Crie sua conta"}
          </h1>
          <p className="mt-2 text-text-muted">
            {modo === "entrar" ? "Entre para reservar e acompanhar suas mesas." : "Leva menos de um minuto."}
          </p>
        </div>

        <div className="mb-6 grid grid-cols-2 rounded-full border border-border bg-surface p-1">
          {(["entrar", "cadastrar"] as Modo[]).map((m) => (
            <button key={m} type="button" onClick={() => trocarModo(m)}
              className={`rounded-full py-2 text-sm font-medium transition-colors ${
                modo === m ? "bg-primary text-background" : "text-text-muted hover:text-text-main"
              }`}>
              {m === "entrar" ? "Entrar" : "Criar conta"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-surface p-8">
          {modo === "cadastrar" && (
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm text-text-muted">Nome</label>
              <input id="nome" type="text" autoComplete="name" required value={nome}
                onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" className={inputClasse} />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm text-text-muted">E-mail</label>
            <input id="email" type="email" autoComplete="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="voce@email.com" className={inputClasse} />
          </div>

          <div>
            <label htmlFor="senha" className="mb-2 block text-sm text-text-muted">Senha</label>
            <input id="senha" type="password" required minLength={modo === "cadastrar" ? 6 : undefined}
              autoComplete={modo === "entrar" ? "current-password" : "new-password"}
              value={senha} onChange={(e) => setSenha(e.target.value)}
              placeholder={modo === "cadastrar" ? "Mínimo de 6 caracteres" : "Sua senha"} className={inputClasse} />
          </div>

          {erro && (
            <p className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              <i className="fa-solid fa-circle-exclamation"></i> {erro}
            </p>
          )}

          <button type="submit" disabled={enviando}
            className="w-full rounded-full bg-primary py-3 font-medium text-background transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60">
            {enviando ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
          </button>
        </form>
      </div>
    </section>
  );
}