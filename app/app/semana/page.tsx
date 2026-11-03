'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { obtenerRutina, bloquesDelDia, estaCompletado, type Rutina } from '@/lib/rutina';

const DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function inicioDeSemana(fecha: Date): Date {
  const d = new Date(fecha);
  const diff = d.getDate() - d.getDay();
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function Semana() {
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [cargando, setCargando] = useState(true);
  const [offsetSemana, setOffsetSemana] = useState(0);

  useEffect(() => {
    setRutina(obtenerRutina());
    setCargando(false);
  }, []);

  if (cargando) {
    return <div className="h-40 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" aria-busy="true" />;
  }

  if (!rutina) {
    return (
      <div className="pt-16 text-center">
        <p className="text-[14px] text-[var(--text-secondary)]">Arma tu rutina primero para ver tu semana.</p>
      </div>
    );
  }

  const base = inicioDeSemana(new Date());
  base.setDate(base.getDate() + offsetSemana * 7);
  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() + i);
    return d;
  });
  const hoyISO = new Date().toDateString();
  const rango = `${dias[0].getDate()} – ${dias[6].getDate()} ${dias[6].toLocaleDateString('es', { month: 'short' })}`;

  return (
    <div className="flex flex-col pb-16">
      <h1 className="text-[24px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
        Tu semana
      </h1>

      <div className="mt-4 flex items-center justify-between">
        <button type="button" onClick={() => setOffsetSemana((o) => o - 1)} aria-label="Semana anterior" className="flex size-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-secondary)]">
          <ChevronLeft size={18} />
        </button>
        <span className="text-[13px] font-semibold tabular-nums text-[var(--text-secondary)]">{rango}</span>
        <button
          type="button"
          onClick={() => setOffsetSemana((o) => Math.min(0, o + 1))}
          disabled={offsetSemana === 0}
          aria-label="Semana siguiente"
          className="flex size-9 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-secondary)] disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {dias.map((d) => {
          const bloques = bloquesDelDia(rutina, d);
          const esHoy = d.toDateString() === hoyISO;
          return (
            <div
              key={d.toISOString()}
              className={`rounded-[var(--radius-card)] border p-4 ${
                esHoy
                  ? 'border-[1.5px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[var(--surface)]'
              }`}
            >
              <p className="text-[12px] font-bold uppercase tracking-[0.04em] text-[var(--text-secondary)]">
                {DIAS_CORTOS[d.getDay()]} {d.getDate()} {esHoy && '· hoy'}
              </p>
              {bloques.length === 0 ? (
                <p className="mt-1 text-[13px] text-[var(--text-secondary)]">Sin bloques</p>
              ) : (
                <ul className="mt-2 flex flex-col gap-1.5">
                  {bloques.map((b) => {
                    const hecho = estaCompletado(d, b.id);
                    return (
                      <li key={b.id} className="flex items-center gap-2 text-[13px]">
                        <span
                          className={`flex size-4 shrink-0 items-center justify-center rounded-full ${
                            hecho ? 'bg-[var(--accent)]' : 'border border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)]'
                          }`}
                        >
                          {hecho && <Check size={9} strokeWidth={3.5} color="var(--surface)" aria-hidden="true" />}
                        </span>
                        <span className={hecho ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}>
                          {b.hora} · {b.titulo}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
