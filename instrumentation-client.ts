// Sentry en el navegador — captura errores de React/JS del lado del cliente.
// Sin DSN (todavía no se creó el proyecto en sentry.io) simplemente no hace nada.
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Session Replay apagado: no hay necesidad de grabar sesiones de usuarios para
  // una app sin IA ni flujos complejos — solo aumentaría el uso gratuito sin razón.
});
