# Lugar Marcado
 
Aplicação web para **reserva em restaurantes**. O cliente encontra restaurantes, consulta a disponibilidade e reserva a mesa no dia e horário que preferir.
 
Projeto desenvolvido para a avaliação **da disciplina Desenvolvimento Backend (2026.2)**, curso de Análise e Desenvolvimento de Sistemas, Universidade Veiga de Almeida.
 
**Autor:** Davi Bonfin de Carvalho
 
---
 
## Status
 
| Parte | Situação |
|---|---|
| Frontend (React/Typescript) | ✅ Interface concluída, usando dados de exemplo (mock) |
| Backend (Spring Boot) | 🚧 Em desenvolvimento |
| Banco de dados (MySQL) | 🚧 Em desenvolvimento |
| Docker | 🚧 Em desenvolvimento |
| Integração front ↔ API | ⏳ Pendente |
 
---
 
## Tecnologias
 
**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS v4
- React Router
- Font Awesome
**Backend**
- Java 26
- Spring Boot (Spring Web, Spring Data JPA, Bean Validation)
- MySQL 8
**Infraestrutura**
- Docker e Docker Compose
---
 
## Estrutura do projeto
 
```
lugar-marcado-project/
├── frontend/                 # Aplicação React
│   ├── public/               # Arquivos estáticos (imagens, ícones)
│   └── src/
│       ├── components/
│       │   ├── home/         # Seções da página inicial (Hero, Como Funciona, Destaques)
│       │   ├── layout/       # Header, Footer e Layout compartilhado
│       │   ├── CardRestaurante.tsx
│       │   └── FormReserva.tsx
│       ├── pages/            # Telas (uma por rota)
│       ├── services/         # Acesso a dados (mock e, depois, chamadas à API)
│       ├── types/            # Tipos TypeScript (formato dos dados da API)
│       ├── App.tsx           # Definição das rotas
│       └── main.tsx          # Ponto de entrada
├── backend/                  # API REST em Spring Boot
└── docker-compose.yml
```
 
---
 
## Frontend
 
### Rotas
 
| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Apresentação, como funciona e restaurantes em destaque |
| `/restaurantes` | Restaurantes | Lista de todos os restaurantes |
| `/restaurantes/:id` | Detalhe do restaurante | Informações e formulário de reserva |
| `/minhas-reservas` | Minhas reservas | Lista e cancelamento das reservas do cliente |
| `/login` | Login | Acesso do cliente |
 
Header e Footer são compartilhados por todas as páginas através de um componente `Layout` com `<Outlet />` do React Router.
 
### Dados de exemplo
 
Enquanto a API não está pronta, os restaurantes vêm de `src/services/restaurantesMock.ts`. O formato segue o tipo `Restaurante` (`src/types/Restaurante.ts`), que é o mesmo formato que a API vai devolver. Na integração, basta trocar o mock por uma chamada `fetch` ao backend.
 
### Como rodar
 
```bash
cd frontend
npm install
npm run dev
```
 
Acesse `http://localhost:5173`.
 
---
 
## Backend (planejado)
 
### Entidades
 
**Restaurante**
| Campo | Tipo |
|---|---|
| id | Long |
| nome | String |
| descricao | String |
| culinaria | String |
| bairro | String |
| cidade | String |
| faixaPreco | Integer (1 a 4) |
| avaliacao | Double |
| imagemUrl | String |
 
**Reserva**
| Campo | Tipo |
|---|---|
| id | Long |
| restaurante | Restaurante (ManyToOne) |
| nomeCliente | String |
| emailCliente | String |
| dataHora | LocalDateTime |
| quantidadePessoas | Integer |
| status | Enum (CONFIRMADA, CANCELADA) |
 
### Endpoints
 
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/restaurantes` | Lista restaurantes (filtro opcional `?bairro=`) |
| GET | `/restaurantes/{id}` | Busca um restaurante |
| POST | `/restaurantes` | Cadastra restaurante |
| PUT | `/restaurantes/{id}` | Atualiza restaurante |
| DELETE | `/restaurantes/{id}` | Remove restaurante |
| GET | `/reservas` | Lista reservas (filtro opcional `?email=`) |
| GET | `/reservas/{id}` | Busca uma reserva |
| POST | `/reservas` | Cria reserva |
| PATCH | `/reservas/{id}/cancelar` | Cancela reserva |
 
### Arquitetura
 
Organização em camadas:
 
```
controller  →  recebe as requisições HTTP
service     →  regras de negócio (ex.: não permitir reserva no passado)
repository  →  acesso ao banco via Spring Data JPA
model       →  entidades JPA
dto         →  objetos de entrada e saída da API
```
 
---
 
## Próximas versões
 
- Busca de restaurantes próximos com a API do Google Maps
- Autenticação de clientes
- Controle de capacidade de mesas por horário
 