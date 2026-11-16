'use client';

// Aviso de cookies (47-LEGAL-FISCAL-Y-PRIVACIDAD.md §2.6): "Aceptar" y "Rechazar" del MISMO
// tamaño y prominencia — rechazar debe costar lo mismo que aceptar. Ninguna cookie de analítica
// se instala antes de este consentimiento (ver lib/analytics.ts: iniciarAnalytics() no hace nada
// sin él).
import { useEffect, useState } from 'react';
import {
  aceptarAnalytics,
  rechazarAnalytics,
  tieneRespuestaDeConsentimiento,
  iniciarAnalytics,
  marcarQaDesdeUrl,
  capturarOrigen,
} from '@/lib/analytics';

export function CookieConsent() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    marcarQaDesdeUrl();
    capturarOrigen();
    iniciarAnalytics(); // no hace nada si no hay consentimiento previo — ver lib/analytics.ts
    setMostrar(!tieneRespuestaDeConsentimiento());
  }, []);

  if (!mostrar) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] px-4 py-4 shadow-[0_-8px_24px_rgb(0_0_0_/_0.08)]"
    >
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-[var(--text-secondary)]">
          Usamos cookies para entender cómo se usa la app y mejorarla. No vendemos tus datos.{' '}
          <a href="/privacidad" className="underline">
            Más info
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => {
              rechazarAnalytics();
              setMostrar(false);
            }}
            className="h-11 flex-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] px-4 text-[14px] font-medium text-[var(--text-primary)] sm:flex-none"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={() => {
              aceptarAnalytics();
              setMostrar(false);
            }}
            className="h-11 flex-1 rounded-[var(--radius-button)] bg-[var(--accent)] px-4 text-[14px] font-semibold text-[var(--bg)] sm:flex-none"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
