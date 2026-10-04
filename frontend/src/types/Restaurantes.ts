// Formato de um restaurante, igual ao que a API Spring vai devolver.
// Quando o backend estiver pronto, o JSON de GET /restaurantes deve seguir este formato.
export type Restaurante = {
  id: number;
  nome: string;
  descricao: string;
  culinaria: string;
  bairro: string;
  cidade: string;
  faixaPreco: 1 | 2 | 3 | 4; // $ a $$$$
  avaliacao: number; // 0 a 5
  imagemUrl: string;
};