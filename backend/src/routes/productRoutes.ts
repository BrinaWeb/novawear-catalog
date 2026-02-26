import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByHandle,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticateAdmin } from '../middleware/auth';
import { authenticateJWT, requireAdmin } from '../middleware/authenticateJWT';

export const productRoutes = Router();

// Rotas públicas
productRoutes.get('/', getAllProducts);
productRoutes.get('/id/:id', getProductById);
productRoutes.get('/handle/:handle', getProductByHandle);

// Rotas admin (protegidas com JWT)
productRoutes.post('/', authenticateJWT, requireAdmin, createProduct);
productRoutes.put('/:id', authenticateJWT, requireAdmin, updateProduct);
productRoutes.delete('/:id', authenticateJWT, requireAdmin, deleteProduct);
