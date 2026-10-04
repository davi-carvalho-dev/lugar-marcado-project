import type { Restaurante } from "../types/Restaurantes";
import type { Reserva, ReservaRequest } from "../types/Reserva";
 
const API_URL = "http://localhost:8080";
 
// Lê a mensagem de erro que o Spring devolve
async function extrairErro(resposta: Response, padrao: string): Promise<string> {
  try {
    const corpo = await resposta.json();
    if (corpo.errors?.length) return corpo.errors[0].defaultMessage;
    if (corpo.message) return corpo.message;
  } catch {
    // resposta sem JSON
  }
  return padrao;
}
 
// ---------- Restaurantes ----------
 
export async function listarRestaurantes(bairro?: string): Promise<Restaurante[]> {
  const url = bairro
    ? `${API_URL}/restaurantes?bairro=${encodeURIComponent(bairro)}`
    : `${API_URL}/restaurantes`;
 
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error("Não foi possível carregar os restaurantes");
  return resposta.json();
}
 
export async function buscarRestaurante(id: number): Promise<Restaurante> {
  const resposta = await fetch(`${API_URL}/restaurantes/${id}`);
  if (resposta.status === 404) throw new Error("Restaurante não encontrado");
  if (!resposta.ok) throw new Error("Não foi possível carregar o restaurante");
  return resposta.json();
}
 
// ---------- Reservas ----------
 
export async function criarReserva(dados: ReservaRequest): Promise<Reserva> {
  const resposta = await fetch(`${API_URL}/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
 
  if (!resposta.ok) {
    throw new Error(await extrairErro(resposta, "Não foi possível criar a reserva"));
  }
  return resposta.json();
}
 
export async function listarReservasPorEmail(email: string): Promise<Reserva[]> {
  const resposta = await fetch(`${API_URL}/reservas?email=${encodeURIComponent(email)}`);
  if (!resposta.ok) throw new Error("Não foi possível carregar suas reservas");
  return resposta.json();
}
 
export async function cancelarReserva(id: number): Promise<Reserva> {
  const resposta = await fetch(`${API_URL}/reservas/${id}/cancelar`, { method: "PATCH" });
 
  if (!resposta.ok) {
    throw new Error(await extrairErro(resposta, "Não foi possível cancelar a reserva"));
  }
  return resposta.json();
}