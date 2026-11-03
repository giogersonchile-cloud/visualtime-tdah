'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, TrendingUp, Calendar, User } from 'lucide-react';

const TABS = [
  { href: '/app', label: 'Hoy', icon: Home },
  { href: '/app/progreso', label: 'Progreso', icon: TrendingUp },
  { href: '/app/semana', label: 'Semana', icon: Calendar },
  { href: '/app/perfil', label: 'Perfil', icon: User },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-10 border-t border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur"
      style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex w-full max-w-[520px] items-stretch justify-around px-2 pt-2">
        {TABS.map((tab) => {
          const activo = tab.href === '/app' ? pathname === '/app' : pathname.startsWith(tab.href);
          const Icono = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex min-w-[64px] flex-col items-center gap-1 py-1 text-[11px] font-semibold ${
                activo ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
              }`}
              aria-current={activo ? 'page' : undefined}
            >
              <span
                className={`flex size-9 items-center justify-center rounded-[var(--radius-button)] ${
                  activo ? 'bg-[var(--chip-bg)]' : ''
                }`}
              >
                <Icono size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
