import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { productRoutes } from './routes/productRoutes';
import { orderRoutes } from './routes/orderRoutes';
import authRoutes from './routes/authRoutes';
import { sanitizeInputs } from './middleware/sanitize';
import logger from './config/logger';
import { initSentry, sentryErrorHandler } from './config/sentry';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Inicializar Sentry (deve ser antes de tudo)
initSentry(app);

// Helmet para segurança de headers HTTP com CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting - previne DDoS e força bruta
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limite de 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente em 15 minutos.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// Middlewares de segurança
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL || 'https://novawear-catalog.vercel.app']
  : ['http://localhost:5173', 'http://localhost:8080', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitizar todos os inputs para prevenir XSS
app.use(sanitizeInputs);

// Rotas
app.use('/api/auth', authRoutes);
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

// Error handler do Sentry (deve ser DEPOIS de todas as rotas)
app.use(sentryErrorHandler);

// Error handler global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Erro não tratado:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erro interno do servidor' 
      : err.message,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📦 API de produtos: http://localhost:${PORT}/api/products`);
  console.log(`🛒 API de pedidos: http://localhost:${PORT}/api/orders`);
});
