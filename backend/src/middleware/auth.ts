import { Request, Response, NextFunction } from 'express';

// Middleware de autenticação simples com API Key
// Para produção, considere usar JWT ou OAuth
export const authenticateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;

  // Se não houver API_KEY configurada, permite acesso (desenvolvimento)
  if (!validApiKey) {
    return next();
  }

  // Verifica se a API key é válida
  if (apiKey === validApiKey) {
    return next();
  }

  return res.status(401).json({ 
    error: 'Não autorizado',
    message: 'API key inválida ou ausente' 
  });
};

// Middleware para rotas administrativas (criar, editar, deletar)
export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const adminKey = req.headers['x-admin-key'];
  const validAdminKey = process.env.ADMIN_KEY;

  // Se não houver ADMIN_KEY configurada, bloqueia acesso
  if (!validAdminKey) {
    return res.status(503).json({ 
      error: 'Serviço não configurado',
      message: 'Autenticação administrativa não configurada' 
    });
  }

  // Verifica se a admin key é válida
  if (adminKey === validAdminKey) {
    return next();
  }

  return res.status(403).json({ 
    error: 'Acesso negado',
    message: 'Apenas administradores podem acessar esta rota' 
  });
};
