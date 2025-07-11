# Backend - NLW Agents

API REST desenvolvida com Fastify e TypeScript.

## Tecnologias

- **Fastify** - Framework web
- **TypeScript** - Linguagem de programação
- **PostgreSQL** - Banco de dados
- **DrizzleORM** - ORM
- **Docker** - Containerização
- **Zod** - Validação de schemas

## Como executar

### Pré-requisitos
- Node.js
- Docker
- pnpm

### Configuração

1. Clone o repositório e acesse a pasta do servidor:
```bash
cd server
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie o banco de dados:
```bash
docker compose up -d
```

4. Configure as variáveis de ambiente criando um arquivo `.env`:
```env
PORT=3333
DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
```

5. Execute as migrações:
```bash
pnpm db:migrate
```

6. (Opcional) Execute o seed:
```bash
pnpm db:seed
```

7. Inicie o servidor:
```bash
pnpm dev
```

## Rotas da API

### Salas
- `GET /rooms` - Lista todas as salas com contagem de perguntas
- `POST /rooms` - Cria uma nova sala
  ```json
  {
    "name": "Nome da sala",
    "description": "Descrição da sala"
  }
  ```

### Perguntas
- `GET /rooms/:roomId/questions` - Lista perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria uma pergunta em uma sala
  ```json
  {
    "question": "Texto da pergunta"
  }
  ```

## Estrutura de pastas

```
src/
├── db/
│   ├── connection.ts    # Conexão com banco
|   ├── seed.ts          # Seeds para popular o banco de dados
│   └── schema/          # Esquemas do banco de dados
├── http/
│   └── routes/          # Rotas da API
├── env.ts               # Validação de variáveis de ambiente
└── server.ts            # Configuração do servidor
```

## Scripts disponíveis

- `pnpm dev` - Inicia servidor em modo desenvolvimento
- `pnpm lint` - Executa linter
- `pnpm format` - Formata código
- `pnpm db:generate` - Gera migrações
- `pnpm db:migrate` - Executa migrações
- `pnpm db:seed` - Executa seed do banco