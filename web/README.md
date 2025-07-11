# Frontend - Web

Frontend da aplicação desenvolvido com React, Vite, TypeScript e TailwindCSS.

## 🚀 Tecnologias

- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e dev server ultra-rápido
- **TailwindCSS** - Framework CSS utility-first
- **Shadcn/ui** - Componentes de UI reutilizáveis
- **React Query** - Gerenciamento de estado
- **React Router DOM** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Biome** - Linter e formatter

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base do Shadcn
│   └── *.tsx           # Componentes específicos da aplicação
├── http/               # Camada de comunicação com API
│   ├── types/          # Tipos TypeScript para requests/responses
│   └── use-*.ts        # Custom hooks para requisições
├── lib/                # Utilitários e configurações
├── pages/              # Páginas da aplicação
├── app.tsx             # Componente raiz da aplicação
├── env.ts              # Validação de variáveis de ambiente
└── main.tsx            # Ponto de entrada da aplicação
```

## ⚙️ Configuração

### Pré-requisitos

- Node.js 18+
- pnpm (recomendado)

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   VITE_API_URL=http://localhost:3333
   ```

### Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev

# Build para produção
pnpm build

# Linting
pnpm lint

# Correção automática de lint
pnpm lint:fix
```
