import { Request, Response, NextFunction } from 'express';
import DOMPurify from 'isomorphic-dompurify';

/**
 * Middleware para sanitizar inputs e prevenir XSS
 */
export const sanitizeInputs = (req: Request, res: Response, next: NextFunction) => {
  // Sanitizar body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitizar query params
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitizar params
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

/**
 * Sanitiza recursivamente um objeto
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return DOMPurify.sanitize(obj, { 
      ALLOWED_TAGS: [], // Remove todas as tags HTML
      ALLOWED_ATTR: [] // Remove todos os atributos
    });
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (obj !== null && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }
    return sanitized;
  }

  return obj;
}
