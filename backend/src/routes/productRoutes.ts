import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByHandle,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';

export const productRoutes = Router();

// Rotas públicas
productRoutes.get('/', getAllProducts);
productRoutes.get('/id/:id', getProductById);
productRoutes.get('/handle/:handle', getProductByHandle);

// Rotas admin (em produção, adicionar middleware de autenticação)
productRoutes.post('/', createProduct);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);
