'use client';

import { useEffect, useState } from 'react';
import { Flame, Award, TrendingUp } from 'lucide-react';
import { obtenerRutina, calcularRacha, bloquesDelDia, estaCompletado, type Rutina } from '@/lib/rutina';

const HITOS = [7, 14, 30, 90];

export default function Progreso() {
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setRutina(obtenerRutina());
    setCargando(false);
  }, []);

  if (cargando) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true">
        <div className="h-7 w-32 animate-pulse rounded-[var(--radius-button)] bg-[var(--surface-2)]" />
        <div className="h-24 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" />
      </div>
    );
  }

  if (!rutina) {
    return (
      <div className="pt-16 text-center">
        <p className="text-[14px] text-[var(--text-secondary)]">
          Arma tu rutina primero para empezar a ver tu progreso.
        </p>
      </div>
    );
  }

  const racha = calcularRacha(rutina);
  const proximoHito = HITOS.find((h) => h > racha) ?? HITOS[HITOS.length - 1];
  const faltan = Math.max(0, proximoHito - racha);

  // Últimos 7 días: % de cumplimiento por día (para la mini-gráfica de barras)
  const ultimos7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const bloques = bloquesDelDia(rutina, d);
    const hechos = bloques.filter((b) => estaCompletado(d, b.id)).length;
    const pct = bloques.length ? Math.round((hechos / bloques.length) * 100) : 0;
    return { dia: d.toLocaleDateString('es', { weekday: 'short' }).slice(0, 1).toUpperCase(), pct };
  });

  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-[24px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
        Tu progreso
      </h1>

      <div className="mt-6 flex items-center gap-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 shadow-[0_4px_16px_-8px_rgb(15_118_110_/_0.25)]">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)]">
          <Flame size={26} color="var(--accent-2)" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[28px] font-bold leading-none tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
            {racha} <span className="text-[14px] font-semibold text-[var(--text-secondary)]">días</span>
          </p>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
            {faltan > 0 ? `${faltan} días para tu medalla de ${proximoHito}` : '¡Hito alcanzado!'}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} color="var(--accent)" aria-hidden="true" />
          <h2 className="text-[14px] font-bold text-[var(--text-primary)]">Tu última semana</h2>
        </div>
        <div className="mt-4 flex items-end justify-between gap-2">
          {ultimos7.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-20 w-full items-end overflow-hidden rounded-[8px] bg-[var(--surface-2)]">
                <div
                  className="w-full rounded-[8px] bg-[var(--accent)] transition-[height] duration-300 ease-out"
                  style={{ height: `${Math.max(6, d.pct)}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-[var(--text-secondary)]">{d.dia}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2">
          <Award size={16} color="var(--accent)" aria-hidden="true" />
          <h2 className="text-[14px] font-bold text-[var(--text-primary)]">Medallas</h2>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {HITOS.map((h) => {
            const lograda = racha >= h;
            return (
              <div
                key={h}
                className={`flex flex-col items-center gap-1.5 rounded-[var(--radius-card)] border p-3 ${
                  lograda
                    ? 'border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_8%,var(--surface))]'
                    : 'border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[var(--surface-2)] opacity-60'
                }`}
              >
                <Award size={18} color={lograda ? 'var(--accent-2)' : 'var(--text-secondary)'} aria-hidden="true" />
                <span className="text-[11px] font-bold text-[var(--text-primary)]">{h}d</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
