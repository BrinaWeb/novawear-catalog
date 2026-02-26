import * as Sentry from '@sentry/node';
import { Express } from 'express';

/**
 * Inicializa o Sentry para monitoramento de erros
 */
export const initSentry = (app: Express) => {
  // Só inicializar em produção se tiver DSN configurado
  if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'development',
      tracesSampleRate: 1.0, // Capturar 100% das transações
    });

    // Middleware de request handler (deve ser o primeiro)
    app.use(Sentry.Handlers.requestHandler());
    
    // Middleware de tracing (deve vir depois do requestHandler)
    app.use(Sentry.Handlers.tracingHandler());
    
    console.log('✅ Sentry inicializado para monitoramento de erros');
  } else {
    console.log('⚠️ Sentry não configurado (adicione SENTRY_DSN ao .env)');
  }
};

/**
 * Middleware de error handler do Sentry (deve ser adicionado DEPOIS de todas as rotas)
 */
export const sentryErrorHandler = Sentry.Handlers.errorHandler();
