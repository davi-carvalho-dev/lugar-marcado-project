import type { Restaurante } from "../types/Restaurantes";

const API_URL = "http://localhost:8080";

export async function listarRestaurantes(bairro?: string): Promise<Restaurante[]> {
  const url = bairro
    ? `${API_URL}/restaurantes?bairro=${encodeURIComponent(bairro)}`
    : `${API_URL}/restaurantes`;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os restaurantes");
  }

  return resposta.json();
}