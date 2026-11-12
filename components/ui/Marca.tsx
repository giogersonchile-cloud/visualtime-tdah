'use client';

// SELLO DE MARCA (dispositivo ownable de FICHA-ARTE.md) — "eco de marca".
// El tratamiento original usaba mix-blend-mode:soft-light sobre un fondo casi
// blanco (--bg/--surface, L alto): soft-light apenas oscurece/aclara ahí, así
// que el revisor-visual lo marcó imperceptible en las 4 pantallas (landing,
// onboarding, paywall, pantalla principal). Este reemplazo usa una silueta
// SÓLIDA de --accent-2 (sin blend-mode), asomando en diagonal detrás de la
// forma principal en --accent — se ve igual en cualquier fondo y es la firma
// visual repetida en logo, chips de ícono y badges de racha/medalla.

import type { ReactNode } from 'react';

/** Logo de la marca — usado en los headers de landing/onboarding/paywall/login. */
export function LogoMark({ size = 24 }: { size?: number }) {
  const radio = Math.round(size / 3);
  const offset = Math.round(size * 0.28);
  return (
    <span className="relative isolate inline-block shrink-0" style={{ width: size + offset, height: size + offset }}>
      <span
        aria-hidden="true"
        className="absolute rounded-[var(--radius-button)] bg-[var(--accent-2)] opacity-70"
        style={{ width: size, height: size, left: offset, top: offset, borderRadius: radio }}
      />
      <span
        aria-hidden="true"
        className="absolute rounded-[var(--radius-button)] bg-[var(--accent)]"
        style={{ width: size, height: size, left: 0, top: 0, borderRadius: radio }}
      />
    </span>
  );
}

/** Chip de ícono con el mismo eco de marca — reemplaza el soft-light de IconChip. */
export function EcoChip({
  children,
  size = 44,
  tone = 'accent',
}: {
  children: ReactNode;
  size?: number;
  tone?: 'accent' | 'muted';
}) {
  // 2ª ronda tras veredicto: a offset 12%/opacidad 45% se leía como sombra
  // genérica, no como sello reconocible — igualado a la contundencia del LogoMark.
  const offset = Math.round(size * 0.22);
  const ecoColor = tone === 'accent' ? 'var(--accent-2)' : 'var(--text-tertiary)';
  return (
    <span className="relative isolate inline-block shrink-0" style={{ width: size + offset, height: size + offset }}>
      <span
        aria-hidden="true"
        className="absolute rounded-[var(--radius-button)] opacity-80"
        style={{ width: size, height: size, left: offset, top: offset, background: ecoColor }}
      />
      <span className="absolute left-0 top-0" style={{ width: size, height: size }}>
        {children}
      </span>
    </span>
  );
}
