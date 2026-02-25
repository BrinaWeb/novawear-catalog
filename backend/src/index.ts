import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { productRoutes } from './routes/productRoutes';
import { orderRoutes } from './routes/orderRoutes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Rotas
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NovaWear API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📦 API de produtos: http://localhost:${PORT}/api/products`);
  console.log(`🛒 API de pedidos: http://localhost:${PORT}/api/orders`);
});
