import type { Restaurante } from "../types/Restaurantes";

const API_URL = "http://localhost:8080";

export async function listarRestaurantes(): Promise<Restaurante[]> {
  const resposta = await fetch(`${API_URL}/restaurantes`);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os restaurantes");
  }

  return resposta.json();
}