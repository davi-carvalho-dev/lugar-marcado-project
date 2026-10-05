import { useState, type ReactNode } from "react";
import { AuthContext } from "./auth";
import type { Cliente } from "../types/Clientes";
 
function lerClienteSalvo(): Cliente | null {
  try {
    const salvo = localStorage.getItem("cliente");
    return salvo ? JSON.parse(salvo) : null;
  } catch {
    return null;
  }
}
 
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [cliente, setCliente] = useState<Cliente | null>(lerClienteSalvo);
 
  function entrar(novoCliente: Cliente) {
    localStorage.setItem("cliente", JSON.stringify(novoCliente));
    localStorage.setItem("emailCliente", novoCliente.email);
    setCliente(novoCliente);
  }
 
  function sair() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("emailCliente");
    setCliente(null);
  }
 
  return <AuthContext.Provider value={{ cliente, entrar, sair }}>{children}</AuthContext.Provider>;
}
 