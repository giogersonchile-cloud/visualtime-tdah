'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { Check, Plus, Flame, X, Pencil, Trash2, Award } from 'lucide-react';
import {
  obtenerRutina,
  bloquesDelDia,
  estaCompletado,
  alternarCompletado,
  calcularRacha,
  insightDelPatron,
  porcentajeHoy,
  agregarBloque,
  editarBloque,
  eliminarBloque,
  type Rutina,
  type Bloque,
} from '@/lib/rutina';

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const HITOS_RACHA = [7, 14, 30, 90];

const variantesLista = {
  oculto: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const variantesItem = {
  oculto: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const } },
};

function Toast({ mensaje, onCerrar }: { mensaje: string; onCerrar: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onCerrar, 3200);
    return () => clearTimeout(t);
  }, [onCerrar]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      role="alert"
      className="fixed inset-x-4 bottom-20 z-30 mx-auto max-w-[480px] rounded-[var(--radius-button)] bg-[var(--text-primary)] px-4 py-3 text-center text-[13px] font-medium text-[var(--bg)] shadow-[0_8px_24px_-6px_rgb(0_0_0_/_0.3)]"
    >
      {mensaje}
    </motion.div>
  );
}

function CelebracionRacha({ dias, onCerrar }: { dias: number; onCerrar: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-4 bg-[rgb(15_23_21_/_0.55)] px-6 text-center"
      onClick={onCerrar}
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
        className="relative isolate flex size-24 items-center justify-center overflow-hidden rounded-full bg-[var(--accent-2)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(120% 120% at 25% 15%, var(--accent) 0%, transparent 70%)',
            mixBlendMode: 'soft-light',
            opacity: 0.6,
          }}
        />
        <Award size={44} color="var(--bg)" aria-hidden="true" />
      </motion.div>
      <h2 className="text-[26px] font-bold text-[var(--bg)] [font-family:var(--font-display)]">
        {dias} días de racha
      </h2>
      <p className="max-w-[260px] text-[14px] text-[color-mix(in_oklab,var(--bg)_80%,transparent)]">
        Nueva medalla desbloqueada. Tu rutina ya es un hábito.
      </p>
      <p className="text-[12px] text-[color-mix(in_oklab,var(--bg)_60%,transparent)]">Toca para continuar</p>
    </motion.div>
  );
}

function FormularioBloque({
  inicial,
  onCerrar,
  onGuardado,
  onError,
}: {
  inicial: Bloque | null;
  onCerrar: () => void;
  onGuardado: () => void;
  onError: () => void;
}) {
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [hora, setHora] = useState(inicial?.hora ?? '09:00');
  const [duracion, setDuracion] = useState(inicial?.duracionMin ?? 30);
  const esEdicion = Boolean(inicial);

  const guardar = () => {
    if (!titulo.trim()) return;
    const resultado = esEdicion
      ? editarBloque(inicial!.id, { titulo: titulo.trim(), hora, duracionMin: duracion })
      : agregarBloque({ titulo: titulo.trim(), hora, duracionMin: duracion, dias: [new Date().getDay()] });
    if (!resultado.ok) return onError();
    onGuardado();
  };

  const eliminar = () => {
    if (!inicial) return;
    const resultado = eliminarBloque(inicial.id);
    if (!resultado.ok) return onError();
    onGuardado();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-20 flex items-end justify-center bg-[rgb(15_23_21_/_0.35)] px-4 pb-4"
      onClick={onCerrar}
    >
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[520px] rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 shadow-[0_12px_40px_-10px_rgb(15_118_110_/_0.35)]"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            {esEdicion ? 'Editar bloque' : 'Nuevo bloque'}
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
            {esEdicion ? 'Guardar cambios' : 'Agregar a hoy'}
          </button>
          {esEdicion && (
            <button
              type="button"
              onClick={eliminar}
              className="flex h-11 items-center justify-center gap-2 text-[14px] font-semibold text-[var(--error)]"
            >
              <Trash2 size={15} aria-hidden="true" /> Eliminar bloque
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PorcentajeAnimado({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(0);
  const previo = useRef(0);
  useEffect(() => {
    const desde = previo.current;
    const hasta = valor;
    previo.current = valor;
    const inicio = performance.now();
    const duracion = 500;
    let raf: number;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion);
      setMostrado(Math.round(desde + (hasta - desde) * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valor]);
  return <>{mostrado}%</>;
}

export default function Hoy() {
  const [cargando, setCargando] = useState(true);
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [version, setVersion] = useState(0);
  const [bloqueEditando, setBloqueEditando] = useState<Bloque | 'nuevo' | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [celebracion, setCelebracion] = useState<number | null>(null);
  const rachaAnterior = useRef<number | null>(null);
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
    const resultado = alternarCompletado(hoy, id);
    if (!resultado.ok) {
      setToast('No se pudo guardar. Intenta de nuevo.');
      return;
    }
    setVersion((v) => v + 1);
    const nuevaRacha = calcularRacha(rutina, hoy);
    if (rachaAnterior.current !== null && nuevaRacha > rachaAnterior.current && HITOS_RACHA.includes(nuevaRacha)) {
      setCelebracion(nuevaRacha);
    }
    rachaAnterior.current = nuevaRacha;
  };

  // Inicialización perezosa del ref (sin useEffect: los hooks no pueden vivir después
  // de los `return` tempranos de arriba — mutar un ref en el cuerpo del render es seguro
  // porque es idempotente y no dispara un re-render).
  if (rachaAnterior.current === null) rachaAnterior.current = racha;

  return (
    <motion.div initial="oculto" animate="visible" variants={variantesLista} className="flex flex-col pb-16">
      <motion.div variants={variantesItem} className="flex items-center justify-between">
        <div>
          <p className="text-[13px] font-semibold text-[var(--text-secondary)]">
            {DIAS_SEMANA[hoy.getDay()]} {hoy.getDate()}
          </p>
          <h1 className="text-[24px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tu día de hoy
          </h1>
        </div>
        {racha > 0 && (
          <span className="relative isolate flex items-center gap-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--accent-2)_14%,transparent)] px-3 py-1.5 text-[13px] font-bold text-[var(--accent-2)]">
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(120% 160% at 15% 0%, var(--accent) 0%, transparent 65%)',
                mixBlendMode: 'soft-light',
                opacity: 0.5,
              }}
            />
            <Flame size={14} aria-hidden="true" />
            {racha}
          </span>
        )}
      </motion.div>

      {/* Dato de hoy — anillo (M0.1 pieza 1) */}
      <motion.div variants={variantesItem} className="mt-6 flex flex-col items-center">
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
              <PorcentajeAnimado valor={pct} />
            </span>
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">de hoy</span>
          </div>
        </div>
      </motion.div>

      {/* La línea de tiempo — acción de 1 tap (M0.1 pieza 2) */}
      <motion.div variants={variantesItem} className="mt-8 flex items-center justify-between">
        <h2 className="text-[15px] font-bold text-[var(--text-primary)]">{rutina.nombre}</h2>
        <button
          type="button"
          onClick={() => setBloqueEditando('nuevo')}
          className="flex items-center gap-1 text-[13px] font-semibold text-[var(--accent)]"
        >
          <Plus size={15} aria-hidden="true" /> Agregar
        </button>
      </motion.div>

      {bloques.length === 0 ? (
        <motion.div
          variants={variantesItem}
          className="mt-4 rounded-[var(--radius-card)] border border-dashed border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] p-5 text-center"
        >
          <p className="text-[14px] text-[var(--text-secondary)]">
            Hoy no tienes bloques programados. Agrega uno con el botón de arriba.
          </p>
        </motion.div>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {bloques.map((b) => {
            const hecho = estaCompletado(hoy, b.id);
            return (
              <motion.li key={b.id} variants={variantesItem} className="flex items-stretch gap-2">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => marcar(b.id)}
                  className={`flex flex-1 items-center gap-3 rounded-[var(--radius-card)] border px-4 py-3 text-left shadow-[0_4px_16px_-8px_rgb(15_118_110_/_0.25)] transition-colors ${
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
                </motion.button>
                <button
                  type="button"
                  onClick={() => setBloqueEditando(b)}
                  aria-label={`Editar ${b.titulo}`}
                  className="flex w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] text-[var(--text-secondary)]"
                >
                  <Pencil size={15} aria-hidden="true" />
                </button>
              </motion.li>
            );
          })}
        </ul>
      )}

      {/* El insight — M0.1 pieza 4 */}
      {insight && (
        <motion.div
          variants={variantesItem}
          className="mt-6 rounded-[var(--radius-card)] border border-transparent p-4"
          style={{
            background:
              'linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(135deg, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%) border-box',
            borderWidth: 1,
          }}
        >
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">{insight}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {bloqueEditando && (
          <FormularioBloque
            inicial={bloqueEditando === 'nuevo' ? null : bloqueEditando}
            onCerrar={() => setBloqueEditando(null)}
            onGuardado={() => {
              setBloqueEditando(null);
              setVersion((v) => v + 1);
            }}
            onError={() => setToast('No se pudo guardar. Intenta de nuevo.')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{toast && <Toast mensaje={toast} onCerrar={() => setToast(null)} />}</AnimatePresence>

      <AnimatePresence>
        {celebracion !== null && (
          <CelebracionRacha dias={celebracion} onCerrar={() => setCelebracion(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
