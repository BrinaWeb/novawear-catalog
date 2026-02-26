import { Router } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from '../controllers/orderController';
import { authenticateAdmin } from '../middleware/auth';

export const orderRoutes = Router();

// Criar pedido (público - usado pelo frontend)
orderRoutes.post('/', createOrder);

// Rotas admin (protegidas com JWT)
orderRoutes.get('/', authenticateJWT, requireAdmin, getAllOrders);
orderRoutes.get('/:id', authenticateJWT, requireAdmin, getOrderById);
orderRoutes.patch('/:id/status', authenticateJWT, requireAdmin, updateOrderStatus);
orderRoutes.delete('/:id', authenticateJWT, requireAdmin, deleteOrder);
