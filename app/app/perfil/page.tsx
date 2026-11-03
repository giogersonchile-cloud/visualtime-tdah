'use client';

import { useRouter } from 'next/navigation';
import { Bell, Shield, FileText, LogOut, ChevronRight } from 'lucide-react';

const OPCIONES = [
  { icon: Bell, label: 'Notificaciones y alarmas', href: '#' },
  { icon: Shield, label: 'Privacidad y datos', href: '/privacidad' },
  { icon: FileText, label: 'Términos y condiciones', href: '/terminos' },
];

export default function Perfil() {
  const router = useRouter();

  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-[24px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
        Tu perfil
      </h1>

      <div className="mt-6 flex flex-col gap-2">
        {OPCIONES.map((op) => {
          const Icono = op.icon;
          return (
            <a
              key={op.label}
              href={op.href}
              className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[var(--surface)] px-4 py-3.5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]">
                <Icono size={18} color="var(--accent)" aria-hidden="true" />
              </span>
              <span className="flex-1 text-[14px] font-medium text-[var(--text-primary)]">{op.label}</span>
              <ChevronRight size={16} color="var(--text-secondary)" aria-hidden="true" />
            </a>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => router.push('/')}
        className="mt-6 flex items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_25%,transparent)] py-3 text-[14px] font-semibold text-[var(--text-secondary)]"
      >
        <LogOut size={16} aria-hidden="true" />
        Cerrar sesión
      </button>

      <p className="mt-6 text-center text-[12px] text-[var(--text-secondary)]">
        VisualTime TDAH · tus datos viven en este teléfono
      </p>
    </div>
  );
}
