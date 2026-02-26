import { Router } from 'express';
import { register, login, refreshToken, getProfile } from '../controllers/authController';
import { authenticateJWT } from '../middleware/authenticateJWT';
import { sanitizeMiddleware } from '../middleware/sanitize';

const router = Router();

// Rotas públicas
router.post('/register', sanitizeMiddleware, register);
router.post('/login', sanitizeMiddleware, login);
router.post('/refresh', refreshToken);

// Rotas protegidas
router.get('/profile', authenticateJWT, getProfile);

export default router;
