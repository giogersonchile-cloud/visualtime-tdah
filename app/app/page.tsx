'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Check, Plus, Flame, X } from 'lucide-react';
import {
  obtenerRutina,
  bloquesDelDia,
  estaCompletado,
  alternarCompletado,
  calcularRacha,
  insightDelPatron,
  porcentajeHoy,
  agregarBloque,
  type Rutina,
} from '@/lib/rutina';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function FormularioBloque({ onCerrar, onAgregado }: { onCerrar: () => void; onAgregado: () => void }) {
  const [titulo, setTitulo] = useState('');
  const [hora, setHora] = useState('09:00');
  const [duracion, setDuracion] = useState(30);

  const guardar = () => {
    if (!titulo.trim()) return;
    agregarBloque({ titulo: titulo.trim(), hora, duracionMin: duracion, dias: [new Date().getDay()] });
    onAgregado();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      className="fixed inset-0 z-20 flex items-end justify-center bg-[rgb(15_23_21_/_0.35)] px-4 pb-4"
      onClick={onCerrar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 shadow-[0_12px_40px_-10px_rgb(15_118_110_/_0.35)]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            Nuevo bloque
          </h2>
          <button type="button" onClick={onCerrar} aria-label="Cerrar" className="flex size-9 items-center justify-center text-[var(--text-secondary)]">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <input
            autoFocus
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="¿Qué vas a hacer?"
            className="h-12 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--bg)] px-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
          />
          <div className="flex gap-3">
            <input
              type="time"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
              className="h-12 flex-1 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--bg)] px-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
            <input
              type="number"
              min={5}
              step={5}
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value) || 30)}
              className="h-12 w-24 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--bg)] px-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
          </div>
          <button
            type="button"
            disabled={!titulo.trim()}
            onClick={guardar}
            className="mt-1 flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)] disabled:opacity-50"
          >
            Agregar a hoy
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Hoy() {
  const [cargando, setCargando] = useState(true);
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [version, setVersion] = useState(0);
  const [formularioAbierto, setFormularioAbierto] = useState(false);
  const reducedMotion = useReducedMotion();
  const hoy = new Date();

  useEffect(() => {
    setRutina(obtenerRutina());
    setCargando(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  if (cargando) {
    return (
      <div className="flex flex-col gap-4" aria-busy="true" aria-live="polite">
        <div className="h-7 w-40 animate-pulse rounded-[var(--radius-button)] bg-[var(--surface-2)]" />
        <div className="h-28 w-28 animate-pulse self-center rounded-full bg-[var(--surface-2)]" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" />
        ))}
      </div>
    );
  }

  if (!rutina) {
    return (
      <div className="flex flex-col items-center gap-4 pt-16 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-[var(--chip-bg)]">
          <Flame size={28} color="var(--accent)" aria-hidden="true" />
        </div>
        <h1 className="text-[22px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
          Todavía no tienes una rutina
        </h1>
        <p className="max-w-[280px] text-[14px] text-[var(--text-secondary)]">
          Respondiste el recorrido de inicio en otro momento o en otro navegador — arma tu primera
          rutina en 2 minutos.
        </p>
        <a
          href="/onboarding"
          className="mt-2 flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-[15px] font-semibold text-[var(--bg)]"
        >
          Armar mi rutina
        </a>
      </div>
    );
  }

  const bloques = bloquesDelDia(rutina, hoy);
  const racha = calcularRacha(rutina, hoy);
  const insight = insightDelPatron(rutina);
  const pct = porcentajeHoy(rutina, hoy);
  const circunferencia = 2 * Math.PI * 46;

  const marcar = (id: string) => {
    alternarCompletado(hoy, id);
    setVersion((v) => v + 1);
  };

  return (
    <div className="flex flex-col pb-16">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[var(--text-secondary)]">
            {DIAS_SEMANA[hoy.getDay()]} {hoy.getDate()}
          </p>
          <h1 className="text-[24px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tu día de hoy
          </h1>
        </div>
        {racha > 0 && (
          <span className="flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)] px-3 py-1.5 text-[13px] font-bold text-[var(--accent-2)]">
            <Flame size={14} aria-hidden="true" />
            {racha}
          </span>
        )}
      </div>

      {/* Dato de hoy — anillo (M0.1 pieza 1) */}
      <div className="mt-6 flex flex-col items-center">
        <div className="relative size-28">
          <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
            <circle cx="56" cy="56" r="46" fill="none" strokeWidth="8" stroke="color-mix(in oklab, var(--accent) 14%, transparent)" />
            <motion.circle
              cx="56"
              cy="56"
              r="46"
              fill="none"
              strokeWidth="8"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeDasharray={circunferencia}
              initial={{ strokeDashoffset: circunferencia }}
              animate={{ strokeDashoffset: circunferencia - (circunferencia * pct) / 100 }}
              transition={{ duration: reducedMotion ? 0 : 0.6, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[22px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
              {pct}%
            </span>
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">de hoy</span>
          </div>
        </div>
      </div>

      {/* La línea de tiempo — acción de 1 tap (M0.1 pieza 2) */}
      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[var(--text-primary)]">{rutina.nombre}</h2>
        <button
          type="button"
          onClick={() => setFormularioAbierto(true)}
          className="flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)]"
        >
          <Plus size={15} aria-hidden="true" /> Agregar
        </button>
      </div>

      {bloques.length === 0 ? (
        <div className="mt-4 rounded-[var(--radius-card)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] p-5 text-center">
          <p className="text-[14px] text-[var(--text-secondary)]">
            Hoy no tienes bloques programados. Agrega uno con el botón de arriba.
          </p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {bloques.map((b) => {
            const hecho = estaCompletado(hoy, b.id);
            return (
              <motion.li key={b.id} whileTap={{ scale: 0.98 }}>
                <button
                  type="button"
                  onClick={() => marcar(b.id)}
                  className={`flex w-full items-center gap-3 rounded-[var(--radius-card)] border px-4 py-3 text-left shadow-[0_4px_16px_-8px_rgb(15_118_110_/_0.25)] transition-colors ${
                    hecho
                      ? 'border-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)] bg-[var(--surface-2)]'
                      : 'border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)]'
                  }`}
                >
                  <span className="w-12 shrink-0 text-[12px] font-semibold tabular-nums text-[var(--text-secondary)]">
                    {b.hora}
                  </span>
                  <span
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full ${
                      hecho ? 'bg-[var(--accent)]' : 'border-2 border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)]'
                    }`}
                  >
                    {hecho && <Check size={14} strokeWidth={3} color="var(--surface)" aria-hidden="true" />}
                  </span>
                  <span className="flex-1">
                    <p className={`text-[15px] font-semibold ${hecho ? 'text-[var(--text-secondary)] line-through' : 'text-[var(--text-primary)]'}`}>
                      {b.titulo}
                    </p>
                    <p className="text-[12px] text-[var(--text-secondary)]">{b.duracionMin} min</p>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}

      {/* El insight — M0.1 pieza 4 */}
      {insight && (
        <div className="mt-6 rounded-[var(--radius-card)] border border-transparent p-4" style={{
          background: 'linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(135deg, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%) border-box',
          borderWidth: 1,
        }}>
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{insight}</p>
        </div>
      )}

      <AnimatePresence>
        {formularioAbierto && (
          <FormularioBloque
            onCerrar={() => setFormularioAbierto(false)}
            onAgregado={() => {
              setFormularioAbierto(false);
              setVersion((v) => v + 1);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
