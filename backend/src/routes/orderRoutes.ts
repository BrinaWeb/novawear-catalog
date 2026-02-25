import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController';

export const orderRoutes = Router();

// Criar pedido (público - usado pelo frontend)
orderRoutes.post('/', createOrder);

// Rotas admin (em produção, adicionar middleware de autenticação)
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrderById);
orderRoutes.patch('/:id/status', updateOrderStatus);
orderRoutes.delete('/:id', deleteOrder);
