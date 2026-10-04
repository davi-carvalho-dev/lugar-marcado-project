import type { Restaurante } from "../types/Restaurantes";


// Dados de mentira, no mesmo formato da API.
// Quando o backend estiver pronto, troque o uso deste array por:
//   fetch("http://localhost:8080/restaurantes").then((res) => res.json())
export const restaurantesMock: Restaurante[] = [
  {
    id: 1,
    nome: "Casa Brasa",
    descricao: "Cortes na parrilla, carta de vinhos sul-americanos e ambiente à luz de velas.",
    culinaria: "Carnes",
    bairro: "Centro",
    cidade: "Rio de Janeiro",
    faixaPreco: 3,
    avaliacao: 4.7,
    imagemUrl: "/image/casa-brasa.jpg",
  },
  {
    id: 2,
    nome: "Trattoria Lume",
    descricao: "Massas frescas feitas na casa e receitas clássicas do norte da Itália.",
    culinaria: "Italiana",
    bairro: "Botafogo",
    cidade: "Rio de Janeiro",
    faixaPreco: 2,
    avaliacao: 4.5,
    imagemUrl: "/image/trattoria-lume.jpg",
  },
  {
    id: 3,
    nome: "Maré Alta",
    descricao: "Frutos do mar do dia, moquecas e drinks autorais com vista para a baía.",
    culinaria: "Frutos do mar",
    bairro: "Urca",
    cidade: "Rio de Janeiro",
    faixaPreco: 3,
    avaliacao: 4.8,
    imagemUrl: "/image/mare-alta.jpg",
  },
];