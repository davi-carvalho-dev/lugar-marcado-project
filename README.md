# Lugar Marcado

Aplicação web para **reserva de mesas em restaurantes**. O cliente cria sua conta, encontra restaurantes, consulta as informações de cada um, reserva a mesa no dia e horário que preferir e acompanha ou cancela suas reservas.

Projeto desenvolvido para a avaliação **N1 da disciplina Desenvolvimento Backend (2026.2)**, curso de Análise e Desenvolvimento de Sistemas, Universidade Veiga de Almeida.

**Autor:** Davi Bonfim de Carvalho

---

## Status

| Parte | Situação |
|---|---|
| Backend (Spring Boot) | ✅ API REST de clientes, restaurantes e reservas |
| Banco de dados (MySQL) | ✅ Tabelas criadas automaticamente pelo JPA, com dados iniciais |
| Docker | ✅ MySQL rodando via Docker Compose |
| Frontend (React) | ✅ Home, listagem, detalhe com reserva, minhas reservas e login |
| Integração front ↔ API | ✅ Todas as telas consomem a API |

---

## Funcionalidades

- Cadastro e login de clientes, com senha criptografada (BCrypt)
- Listagem de restaurantes com filtro por bairro
- Página de detalhe do restaurante
- Reserva com escolha de data, horário (almoço e jantar) e número de pessoas, disponível só para clientes logados
- Consulta das reservas do cliente com status (confirmada, cancelada, concluída)
- Cancelamento de reservas, mantendo o histórico

---

## Tecnologias

**Backend**
- Java (JDK 21 ou superior; desenvolvido com o JDK 26)
- Spring Boot 4.1 (Spring Web, Spring Data JPA, Bean Validation)
- Spring Security Crypto (BCrypt)
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
│       ├── config/           # Dados iniciais e configuração do BCrypt
│       ├── controller/       # Endpoints HTTP
│       ├── dto/              # Formato dos dados de entrada e saída da API
│       ├── model/            # Entidades (tabelas)
│       ├── repository/       # Acesso ao banco
│       └── service/          # Regras de negócio
└── frontend/                 # Aplicação React
    ├── public/               # Imagens e logo
    └── src/
        ├── components/       # Header, Footer, cards, formulário e seções da home
        ├── context/          # Estado de autenticação (cliente logado)
        ├── pages/            # Uma tela por rota
        ├── services/         # Chamadas à API
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

**Cliente**
| Campo | Tipo |
|---|---|
| id | Long (PK) |
| nome | String |
| email | String (único) |
| senha | String (hash BCrypt) |
| criadoEm | LocalDateTime |

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

**Autenticação**
| Método | Endpoint | Descrição |
|---|---|---|
| POST | `/auth/cadastro` | Cria a conta do cliente |
| POST | `/auth/login` | Valida e-mail e senha |

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

**Clientes**
- Nome, e-mail e senha são obrigatórios; a senha precisa ter pelo menos 6 caracteres.
- Não é possível criar duas contas com o mesmo e-mail.
- A senha é guardada como hash BCrypt e nunca é devolvida pela API.
- O login devolve a mesma mensagem para e-mail inexistente e senha errada, sem revelar quais e-mails estão cadastrados.

**Reservas**
- Todos os campos da reserva são obrigatórios, e o e-mail precisa ter formato válido.
- A reserva só pode ser feita para uma data e hora **futuras**.
- A quantidade de pessoas deve estar entre **1 e 20**.
- A reserva precisa apontar para um restaurante existente.
- Cancelar não apaga a reserva: o status passa para `CANCELADA`, mantendo o histórico.
- Não é possível cancelar uma reserva já cancelada nem uma reserva cuja data já passou.

### Respostas de erro

| Código | Quando acontece |
|---|---|
| `400 Bad Request` | Dados inválidos (campo vazio, e-mail inválido, data no passado, quantidade fora do limite) ou tentativa de cancelar reserva que já passou |
| `401 Unauthorized` | E-mail ou senha inválidos no login |
| `404 Not Found` | Restaurante ou reserva inexistente |
| `409 Conflict` | E-mail já cadastrado ou reserva já cancelada |

---

## Frontend

### Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | Home | Apresentação, como funciona e restaurantes em destaque |
| `/restaurantes` | Restaurantes | Lista com filtro por bairro |
| `/restaurantes/:id` | Detalhe | Informações do restaurante e formulário de reserva |
| `/minhas-reservas` | Minhas reservas | Consulta e cancelamento das reservas do cliente |
| `/login` | Login | Entrar ou criar conta |

Header e Footer são compartilhados por todas as páginas através de um componente `Layout` com `<Outlet />` do React Router. O cliente logado fica disponível para toda a aplicação por um Context (`AuthProvider`).

---

## Próximas versões

- Autenticação com token JWT e Spring Security
- Busca de restaurantes próximos com a API do Google Maps
- Cadastro, edição e remoção de restaurantes pela API (painel do restaurante)
- Controle de capacidade de mesas por horário
- Galeria de fotos por restaurante
