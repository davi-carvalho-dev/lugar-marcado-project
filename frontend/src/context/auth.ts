import { createContext, useContext } from "react";
import type { Cliente } from "../types/Clientes";
 
export type AuthContextType = {
  cliente: Cliente | null;
  entrar: (cliente: Cliente) => void;
  sair: () => void;
};
 
export const AuthContext = createContext<AuthContextType | null>(null);
 
// Hook para qualquer componente saber quem está logado
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth precisa estar dentro do AuthProvider");
  return contexto;
}
 