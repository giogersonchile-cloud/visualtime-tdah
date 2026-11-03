'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, Check } from 'lucide-react';
import { PREGUNTAS, guardarRespuestas, type Respuestas } from '@/lib/onboarding';

const PAUSA_SELECCION_MS = 320;
const DURACION_LOADING_MS = 5200;

function ProgresoBar({ pct }: { pct: number }) {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--text-tertiary)_15%,transparent)]">
      <motion.div
        className="h-full rounded-full bg-[var(--accent)]"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      />
    </div>
  );
}

function PantallaPregunta({
  indice,
  total,
  onAtras,
  onResponder,
}: {
  indice: number;
  total: number;
  onAtras: () => void;
  onResponder: (valor: string) => void;
}) {
  const pregunta = PREGUNTAS[indice];
  const [seleccionada, setSeleccionada] = useState<string | null>(null);
  const [otraCosaAbierta, setOtraCosaAbierta] = useState(false);
  const [textoLibre, setTextoLibre] = useState('');
  const reducedMotion = useReducedMotion();
  // Endowed progress (Nunes & Drèze 2006): la barra arranca en 8%, nunca en 0.
  const pct = 8 + (indice / total) * 92;

  useEffect(() => {
    setSeleccionada(null);
    setOtraCosaAbierta(false);
    setTextoLibre('');
  }, [indice]);

  const elegir = (opcion: string) => {
    if (seleccionada) return; // bloquea doble-tap durante la pausa
    setSeleccionada(opcion);
    window.setTimeout(() => onResponder(opcion), PAUSA_SELECCION_MS);
  };

  return (
    <motion.div
      key={pregunta.id}
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex w-full flex-col"
    >
      <div className="flex h-11 items-center gap-3">
        {indice > 0 ? (
          <button
            type="button"
            onClick={onAtras}
            aria-label="Volver a la pregunta anterior"
            className="flex size-11 shrink-0 items-center justify-center text-[var(--text-secondary)]"
          >
            <ChevronLeft size={22} />
          </button>
        ) : (
          <span className="size-11 shrink-0" aria-hidden="true" />
        )}
        <ProgresoBar pct={pct} />
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-[var(--text-secondary)]">
          {Math.round(pct)}%
        </span>
      </div>

      <h1 className="mt-6 text-balance text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-display)]">
        {pregunta.pregunta}
      </h1>
      {pregunta.microcopy && (
        <p className="mt-2 text-[14px] text-[var(--text-secondary)]">{pregunta.microcopy}</p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {pregunta.opciones.map((opcion, i) => {
          const activo = seleccionada === opcion;
          return (
            <motion.button
              key={opcion}
              type="button"
              onClick={() => elegir(opcion)}
              whileTap={{ scale: 0.97 }}
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : i * 0.05, duration: 0.2 }}
              className={`flex min-h-14 items-center justify-between rounded-[var(--radius-button)] border px-4 py-3 text-left text-[16px] font-medium transition-colors ${
                activo
                  ? 'border-[var(--accent)] border-[1.5px] bg-[color-mix(in_oklab,var(--accent)_10%,var(--surface))] text-[var(--text-primary)]'
                  : 'border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] text-[var(--text-primary)]'
              }`}
            >
              <span>{opcion}</span>
              {activo && (
                <motion.span
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex size-5 items-center justify-center rounded-full bg-[var(--accent)]"
                >
                  <Check size={13} strokeWidth={3} color="var(--surface)" />
                </motion.span>
              )}
            </motion.button>
          );
        })}

        {pregunta.otraCosa && !otraCosaAbierta && (
          <button
            type="button"
            onClick={() => setOtraCosaAbierta(true)}
            className="py-2 text-left text-[14px] font-medium text-[var(--text-secondary)] underline underline-offset-2"
          >
            Otra cosa (escribe la tuya)
          </button>
        )}
        {otraCosaAbierta && (
          <div className="flex flex-col gap-3">
            <input
              autoFocus
              type="text"
              value={textoLibre}
              onChange={(e) => setTextoLibre(e.target.value)}
              placeholder="Escribe tu rutina"
              className="h-14 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
            <button
              type="button"
              disabled={!textoLibre.trim()}
              onClick={() => onResponder(textoLibre.trim())}
              className="flex h-13 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)] disabled:opacity-50"
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const LINEAS_LOADING = (r: Partial<Respuestas>) => [
  `Analizando lo que más te frustra: ${r.p1 ?? ''}`,
  `Ajustando tu horario: te cuesta arrancar ${r.p2?.toLowerCase() ?? ''}`,
  `Armando tu ${r.p3 ?? 'rutina'}`,
  'Preparando tu línea de tiempo',
];

function PantallaLoading({ respuestas, onListo }: { respuestas: Partial<Respuestas>; onListo: () => void }) {
  const lineas = LINEAS_LOADING(respuestas);
  const [activa, setActiva] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const porLinea = DURACION_LOADING_MS / lineas.length;
    const timers: number[] = [];
    lineas.forEach((_, i) => {
      timers.push(window.setTimeout(() => setActiva(i + 1), porLinea * (i + 1)));
    });
    timers.push(window.setTimeout(onListo, DURACION_LOADING_MS + 400));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pct = Math.min(100, Math.round((activa / lineas.length) * 100));
  const circunferencia = 2 * Math.PI * 50;

  return (
    <div
      aria-live="polite"
      aria-busy={activa < lineas.length}
      className="flex w-full flex-col items-center pt-10"
    >
      <div className="relative size-28">
        <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
          <circle cx="56" cy="56" r="50" fill="none" strokeWidth="9" stroke="color-mix(in oklab, var(--accent) 14%, transparent)" />
          <motion.circle
            cx="56"
            cy="56"
            r="50"
            fill="none"
            strokeWidth="9"
            stroke="var(--accent)"
            strokeLinecap="round"
            strokeDasharray={circunferencia}
            initial={{ strokeDashoffset: circunferencia }}
            animate={{ strokeDashoffset: circunferencia - (circunferencia * pct) / 100 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-[24px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
          {pct}%
        </div>
      </div>

      {/* h3, no h2: es un estado de proceso transitorio (50 → B1), no un titular de
          venta — no lleva la jerarquía de énfasis (acento) de las pantallas que venden. */}
      <h3 className="mt-6 text-[22px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
        Construyendo tu rutina…
      </h3>

      <ul className="mt-8 flex w-full flex-col gap-4">
        {lineas.map((linea, i) => {
          const estado = i < activa ? 'hecha' : i === activa ? 'activa' : 'pendiente';
          return (
            <li key={linea} className="flex items-start gap-3">
              {estado === 'hecha' ? (
                <motion.span
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
                >
                  <Check size={13} strokeWidth={3} color="var(--surface)" />
                </motion.span>
              ) : estado === 'activa' ? (
                <span className="relative mt-1.5 flex size-5 shrink-0 items-center justify-center">
                  <motion.span
                    className="size-2.5 rounded-full bg-[var(--accent)]"
                    animate={reducedMotion ? {} : { opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </span>
              ) : (
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-[color-mix(in_oklab,var(--text-tertiary)_40%,transparent)]" />
              )}
              <span
                className={`text-[15px] leading-snug ${
                  estado === 'pendiente' ? 'text-[var(--text-secondary)] opacity-40' : 'text-[var(--text-primary)]'
                }`}
              >
                {linea}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Onboarding() {
  const router = useRouter();
  const [paso, setPaso] = useState<'pregunta' | 'loading'>('pregunta');
  const [indice, setIndice] = useState(0);
  const respuestas = useRef<Partial<Respuestas>>({});

  const responder = (valor: string) => {
    const id = PREGUNTAS[indice].id;
    respuestas.current = { ...respuestas.current, [id]: valor };
    if (indice + 1 < PREGUNTAS.length) {
      setIndice(indice + 1);
    } else {
      guardarRespuestas(respuestas.current as Respuestas);
      setPaso('loading');
    }
  };

  const atras = () => setIndice((i) => Math.max(0, i - 1));

  return (
    <main className="flex min-h-dvh flex-col bg-[var(--bg)] [font-family:var(--font-body)]">
      <header className="mx-auto w-full max-w-[520px] px-4 pt-5">
        <a href="/" className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <span aria-hidden="true" className="size-6 rounded-[8px] bg-[var(--accent)]" />
          VisualTime TDAH
        </a>
      </header>

      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col px-4 pb-10 pt-6">
        <AnimatePresence mode="wait">
          {paso === 'pregunta' ? (
            <PantallaPregunta
              key={`p-${indice}`}
              indice={indice}
              total={PREGUNTAS.length}
              onAtras={atras}
              onResponder={responder}
            />
          ) : (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <PantallaLoading respuestas={respuestas.current} onListo={() => router.push('/paywall')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
