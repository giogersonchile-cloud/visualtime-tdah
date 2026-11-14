'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';
// global-error reemplaza TODO el árbol, incluido el layout raíz — sin este
// import los tokens de color (--bg, --text-primary...) no existen aquí.
import './globals.css';

// Red de seguridad: si algo revienta el árbol de React por completo (fuera de
// cualquier error boundary propio), esto captura el error en Sentry y muestra
// una pantalla honesta en vez de la pantalla blanca de Next.js.
export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="es">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-[var(--bg)] px-6 text-center">
        <h1 className="text-xl font-bold text-[var(--text-primary)]">
          Algo salió mal
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Ya nos enteramos de esto. Intenta recargar la página.
        </p>
      </body>
    </html>
  );
}
