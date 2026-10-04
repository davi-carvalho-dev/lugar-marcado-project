# Lugar Marcado
 
Aplicação web para **reserva de mesas em restaurantes**. O cliente encontra restaurantes, consulta as informações de cada um e reserva a mesa no dia e horário que preferir.
 
Projeto desenvolvido para a avaliação **N1 da disciplina Desenvolvimento Backend (2026.2)**, curso de Análise e Desenvolvimento de Sistemas, Universidade Veiga de Almeida.
 
**Autor:** Davi Bonfim de Carvalho
 
---
 
## Status
 
| Parte | Situação |
|---|---|
| Backend (Spring Boot) | ✅ API REST de restaurantes e reservas concluída |
| Banco de dados (MySQL) | ✅ Tabelas criadas automaticamente pelo JPA, com dados iniciais |
| Docker | ✅ MySQL rodando via Docker Compose |
| Frontend (React) | ✅ Interface concluída (home, layout, rotas e cards) |
| Integração front ↔ API | ⏳ Em andamento |
 
---
 
## Tecnologias
 
**Backend**
- Java (JDK 21 ou superior; desenvolvido com o JDK 26)
- Spring Boot 4.1 (Spring Web, Spring Data JPA, Bean Validation)
- Hibernate
- MySQL 8.4
**Frontend**
- React + TypeScript (Vite)
- Tailwind CSS v4
- React Router
- Font Awesome
**Infraestrutura**
- Docker e Docker Compose
---
 
## Estrutura do projeto
 
```
lugar-marcado-project/
├── docker-compose.yml        # Banco MySQL
├── backend/                  # API REST em Spring Boot
│   └── src/main/java/com/lugarmarcado/backend/
│       ├── config/           # Dados iniciais
│       ├── controller/       # Endpoints HTTP
│       ├── dto/              # Formato dos dados recebidos pela API
│       ├── model/            # Entidades (tabelas)
│       ├── repository/       # Acesso ao banco
│       └── service/          # Regras de negócio
└── frontend/                 # Aplicação React
    ├── public/               # Imagens e arquivos estáticos
    └── src/
        ├── components/       # Header, Footer, cards e seções da home
        ├── pages/            # Uma tela por rota
        ├── services/         # Acesso a dados
        └── types/            # Tipos TypeScript
```
 
---
 
## Como rodar
 
### Pré-requisitos
- Docker Desktop
- JDK 21 ou superior
- Node.js 20 ou superior
### 1. Banco de dados
 
Na raiz do projeto:
 
```bash
docker compose up -d
```
 
Isso sobe um MySQL na porta `3306` com o banco `lugar_marcado` já criado.
 
### 2. Backend
 
```bash
cd backend
./mvnw spring-boot:run        # Linux/macOS
.\mvnw.cmd spring-boot:run    # Windows
```
 
A API fica disponível em `http://localhost:8080`. Na primeira execução, o Hibernate cria as tabelas e três restaurantes de exemplo são cadastrados automaticamente.
 
### 3. Frontend
 
```bash
cd frontend
npm install
npm run dev
```
 
Acesse `http://localhost:5173`.
 
---
 
## Backend
 
### Arquitetura em camadas
 
```
Requisição HTTP
      ↓
Controller   → recebe a requisição e devolve a resposta
      ↓
DTO          → define e valida os dados de entrada
      ↓
Service      → aplica as regras de negócio
      ↓
Repository   → lê e grava no banco via Spring Data JPA
      ↓
MySQL
```
 
Cada camada tem uma única responsabilidade. O controller não acessa o banco diretamente, e as regras de negócio ficam concentradas no service.
 
### Modelo de dados
 
**Restaurante**
| Campo | Tipo |
|---|---|
| id | Long (PK) |
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
| id | Long (PK) |
| restaurante | Restaurante (FK `restaurante_id`, ManyToOne) |
| nomeCliente | String |
| emailCliente | String |
| dataHora | LocalDateTime |
| quantidadePessoas | Integer |
| status | Enum: `CONFIRMADA`, `CANCELADA` |
| criadaEm | LocalDateTime |
 
Um restaurante pode ter várias reservas; cada reserva pertence a um único restaurante.
 
### Endpoints
 
**Restaurantes**
| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/restaurantes` | Lista todos os restaurantes |
| GET | `/restaurantes?bairro=Centro` | Filtra por bairro (sem diferenciar maiúsculas) |
| GET | `/restaurantes/{id}` | Busca um restaurante |
 
**Reservas**
| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/reservas` | Cria uma reserva |
| GET | `/reservas` | Lista todas as reservas |
| GET | `/reservas?email=cliente@email.com` | Lista as reservas de um cliente |
| GET | `/reservas/{id}` | Busca uma reserva |
| PATCH | `/reservas/{id}/cancelar` | Cancela uma reserva |
 
### Exemplo: criar reserva
 
**Requisição**
```http
POST /reservas
Content-Type: application/json
 
{
  "restauranteId": 1,
  "nomeCliente": "Davi",
  "emailCliente": "davi@email.com",
  "dataHora": "2026-10-10T20:00:00",
  "quantidadePessoas": 2
}
```
 
**Resposta: `201 Created`**
```json
{
  "id": 1,
  "restaurante": { "id": 1, "nome": "Casa Brasa", "bairro": "Centro", "...": "..." },
  "nomeCliente": "Davi",
  "emailCliente": "davi@email.com",
  "dataHora": "2026-10-10T20:00:00",
  "quantidadePessoas": 2,
  "status": "CONFIRMADA",
  "criadaEm": "2026-10-04T11:45:28"
}
```
 
### Regras de negócio
 
- Todos os campos da reserva são obrigatórios.
- O e-mail precisa ter formato válido.
- A reserva só pode ser feita para uma data e hora **futuras**.
- A quantidade de pessoas deve estar entre **1 e 20**.
- A reserva precisa apontar para um restaurante existente.
- Cancelar não apaga a reserva: o status passa para `CANCELADA`, mantendo o histórico.
- Não é possível cancelar uma reserva já cancelada nem uma reserva cuja data já passou.
### Respostas de erro
 
| Código | Quando acontece |
|---|---|
| `400 Bad Request` | Dados inválidos (campo vazio, e-mail inválido, data no passado, quantidade fora do limite) ou tentativa de cancelar reserva que já passou |
| `404 Not Found` | Restaurante ou reserva inexistente |
| `409 Conflict` | Tentativa de cancelar uma reserva já cancelada |
 
---
 
## Frontend
 
### Rotas
 
| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Apresentação, como funciona e restaurantes em destaque |
| `/restaurantes` | Restaurantes | Lista de todos os restaurantes |
| `/restaurantes/:id` | Detalhe | Informações do restaurante e formulário de reserva |
| `/minhas-reservas` | Minhas reservas | Consulta e cancelamento das reservas do cliente |
| `/login` | Login | Acesso do cliente |
 
Header e Footer são compartilhados por todas as páginas através de um componente `Layout` com `<Outlet />` do React Router.
 
---
 
## Próximas versões
 
- Busca de restaurantes próximos com a API do Google Maps
- Cadastro, edição e remoção de restaurantes pela API
- Autenticação de clientes
- Controle de capacidade de mesas por horário
- Galeria de fotos por restaurante
