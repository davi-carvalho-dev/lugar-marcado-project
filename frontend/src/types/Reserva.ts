import type { Restaurante } from "./Restaurantes";

export type StatusReserva = "CONFIRMADA" | "CANCELADA";

export type Reserva = {
  id: number;
  restaurante: Restaurante;
  nomeCliente: string;
  emailCliente: string;
  dataHora: string;
  quantidadePessoas: number;
  status: StatusReserva;
  criadaEm: string;
};

export type ReservaRequest = {
  restauranteId: number;
  nomeCliente: string;
  emailCliente: string;
  dataHora: string;
  quantidadePessoas: number;
};