# NovaWear Backend API

Backend para o e-commerce NovaWear - Loja de camisas masculinas.

## Tecnologias

- **Node.js** + **Express** - Servidor HTTP
- **TypeScript** - Tipagem estática
- **Prisma ORM** - Banco de dados SQLite
- **Zod** - Validação de dados

## Instalação

```bash
# Instalar dependências
npm install

# Configurar banco de dados
npm run db:generate
npm run db:push

# Popular banco com dados iniciais
npm run db:seed

# Iniciar servidor em modo desenvolvimento
npm run dev
```

## Endpoints da API

### Produtos

| Método | Endpoint | Descrição |
|--------|----------|----------|
| GET | `/api/products` | Listar todos os produtos |
| GET | `/api/products/id/:id` | Buscar produto por ID |
| GET | `/api/products/handle/:handle` | Buscar produto por handle |
| POST | `/api/products` | Criar novo produto |
| PUT | `/api/products/:id` | Atualizar produto |
| DELETE | `/api/products/:id` | Deletar produto |

### Pedidos

| Método | Endpoint | Descrição |
|--------|----------|----------|
| POST | `/api/orders` | Criar novo pedido |
| GET | `/api/orders` | Listar todos os pedidos |
| GET | `/api/orders/:id` | Buscar pedido por ID |
| PATCH | `/api/orders/:id/status` | Atualizar status do pedido |
| DELETE | `/api/orders/:id` | Deletar pedido |

### Health Check

| Método | Endpoint | Descrição |
|--------|----------|----------|
| GET | `/api/health` | Verificar status da API |

## Exemplo de Uso

### Criar Pedido

```bash
curl -X POST http://localhost:3001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerPhone": "11999999999",
    "customerName": "João Silva",
    "items": [
      {
        "productId": "abc123",
        "quantity": 2,
        "size": "M",
        "price": 159.90
      }
    ]
  }'
```

## Variáveis de Ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
FRONTEND_URL="http://localhost:5173"
WHATSAPP_NUMBER="5511999999999"
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor em modo desenvolvimento
- `npm run build` - Compila TypeScript para JavaScript
- `npm start` - Inicia servidor em produção
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:migrate` - Executa migrations
- `npm run db:push` - Sincroniza schema com banco
- `npm run db:seed` - Popula banco com dados iniciais
- `npm run db:studio` - Abre Prisma Studio (interface visual)
