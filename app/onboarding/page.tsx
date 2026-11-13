'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, Check, X } from 'lucide-react';
import { PREGUNTAS, guardarRespuestas, type Respuestas } from '@/lib/onboarding';
import { rutinaDesdeRespuesta, guardarRutina } from '@/lib/rutina';
import { Hairline } from '@/components/landing/ui';
import { LogoMark, EcoChip } from '@/components/ui/Marca';
import { Sparkles } from 'lucide-react';

const PAUSA_SELECCION_MS = 320;
const DURACION_LOADING_MS = 5200;

/** JERARQUÍA DE ÉNFASIS (50/55): resalta la palabra clave de la pregunta en acento. */
function TituloConAcento({ texto, acento }: { texto: string; acento: string }) {
  const i = texto.toLowerCase().indexOf(acento.toLowerCase());
  if (i === -1) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, i)}
      <span className="text-[var(--accent)]">{texto.slice(i, i + acento.length)}</span>
      {texto.slice(i + acento.length)}
    </>
  );
}

function ProgresoBar({ pct }: { pct: number }) {
  return (
    // Surco "hundido" (tercer nivel de profundidad, --surface-2 + sombra interior) —
    // subido a 8px tras veredicto del revisor: a 3px la sombra interior no se percibía.
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]"
      style={{ boxShadow: 'inset 0 1.5px 3px rgb(15 118 110 / 0.28)' }}
    >
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
  respuestaGuardada,
  onAtras,
  onResponder,
}: {
  indice: number;
  total: number;
  /** La respuesta que ya había dado antes a ESTA pregunta (si volvió con "atrás") —
   * sin esto, la opción elegida se "olvidaba" al navegar hacia atrás (h3/h6). */
  respuestaGuardada: string | null;
  onAtras: () => void;
  onResponder: (valor: string) => void;
}) {
  const pregunta = PREGUNTAS[indice];
  const esOpcionPredefinida = respuestaGuardada ? pregunta.opciones.includes(respuestaGuardada) : false;
  const [seleccionada, setSeleccionada] = useState<string | null>(esOpcionPredefinida ? respuestaGuardada : null);
  const [otraCosaAbierta, setOtraCosaAbierta] = useState(Boolean(respuestaGuardada && !esOpcionPredefinida));
  const [textoLibre, setTextoLibre] = useState(respuestaGuardada && !esOpcionPredefinida ? respuestaGuardada : '');
  const [hintVacio, setHintVacio] = useState(false);
  const reducedMotion = useReducedMotion();
  // Endowed progress (Nunes & Drèze 2006): la barra arranca en 8%, nunca en 0.
  const pct = 8 + (indice / total) * 92;

  useEffect(() => {
    setSeleccionada(esOpcionPredefinida ? respuestaGuardada : null);
    setOtraCosaAbierta(Boolean(respuestaGuardada && !esOpcionPredefinida));
    setTextoLibre(respuestaGuardada && !esOpcionPredefinida ? respuestaGuardada : '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice]);

  const elegir = (opcion: string) => {
    if (seleccionada) return; // bloquea doble-tap durante la pausa
    setSeleccionada(opcion);
    window.setTimeout(() => onResponder(opcion), PAUSA_SELECCION_MS);
  };

  // Atajo de teclado (h7/flexibilidad): teclas 1-4 eligen la opción
  // correspondiente — antes solo el mouse/tap funcionaba para las opciones
  // predefinidas (el input "Otra cosa" ya respondía a Enter).
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (otraCosaAbierta) return;
      const n = Number(e.key);
      if (n >= 1 && n <= pregunta.opciones.length) {
        e.preventDefault();
        elegir(pregunta.opciones[n - 1]);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otraCosaAbierta, seleccionada]);

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
        <TituloConAcento texto={pregunta.pregunta} acento={pregunta.acento} />
      </h1>
      {pregunta.microcopy && (
        <p className="mt-2 text-[13px] text-[var(--text-secondary)]">{pregunta.microcopy}</p>
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
              className={`flex min-h-14 items-center justify-between rounded-[var(--radius-button)] border px-4 py-3 text-left text-[16px] font-medium shadow-[0_6px_18px_-4px_rgb(15_118_110_/_0.32)] transition-colors ${
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
            className="py-2 text-left text-[13px] font-medium text-[var(--text-secondary)] underline underline-offset-2"
          >
            Otra cosa (escribe la tuya)
          </button>
        )}
        {otraCosaAbierta && (
          // form (no solo button+input sueltos): Enter ahora envía — antes solo
          // funcionaba el mouse sobre "Continuar" (h7/flexibilidad).
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (!textoLibre.trim()) {
                setHintVacio(true);
                return;
              }
              onResponder(textoLibre.trim());
            }}
          >
            <input
              autoFocus
              type="text"
              value={textoLibre}
              onChange={(e) => {
                setTextoLibre(e.target.value);
                if (hintVacio) setHintVacio(false);
              }}
              placeholder="Escribe tu rutina"
              className="h-14 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
            />
            {hintVacio && (
              <p className="text-[13px] text-[var(--error)]">Escribe el nombre de tu rutina para continuar.</p>
            )}
            {/* CTA vivo SIEMPRE habilitado (nunca disabled por defecto) — valida
                al enviar y muestra el hint en vez de bloquear el botón. */}
            <button
              type="submit"
              className="flex h-13 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-semibold text-[var(--bg)]"
            >
              Continuar
            </button>
          </form>
        )}
      </div>

      {/* Tarjeta de contexto (Hairline degradé — dispositivo ownable, 55 gate G).
          Llena el espacio vacío bajo las opciones con ayuda real, no relleno. */}
      <motion.div
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.2 }}
        className="mt-8"
      >
        <Hairline className="flex items-start gap-3 p-4 shadow-[0_6px_18px_-6px_rgb(15_118_110_/_0.22)]">
          {/* EcoChip aquí repite el sello de marca fuera del logo del header —
              el revisor lo marcó como viviendo SOLO en el logo de 24px. */}
          <EcoChip size={36}>
            <span className="flex size-9 items-center justify-center rounded-[var(--radius-button)] bg-[var(--chip-bg)]">
              <Sparkles size={17} strokeWidth={2} color="var(--accent)" aria-hidden="true" />
            </span>
          </EcoChip>
          {/* pt-3 (no pt-1): el EcoChip mide 44px total (36px + el eco offset de
              8px) — pt-1 dejaba el ícono 2-3px más arriba que la primera línea
              de texto (desalineado, veredicto del revisor). */}
          <p className="pt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">Con tus respuestas</span> armamos tu
            línea de tiempo al instante — nada se comparte ni se publica sin que tú lo decidas.
          </p>
        </Hairline>
      </motion.div>
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
  const [confirmarSalida, setConfirmarSalida] = useState(false);
  const respuestas = useRef<Partial<Respuestas>>({});

  const responder = (valor: string) => {
    const id = PREGUNTAS[indice].id;
    respuestas.current = { ...respuestas.current, [id]: valor };
    if (indice + 1 < PREGUNTAS.length) {
      setIndice(indice + 1);
    } else {
      guardarRespuestas(respuestas.current as Respuestas);
      guardarRutina(rutinaDesdeRespuesta(respuestas.current.p3));
      setPaso('loading');
    }
  };

  const atras = () => setIndice((i) => Math.max(0, i - 1));

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg)] [font-family:var(--font-body)]">
      {/* Fondo con profundidad — 4ª ronda: el radial-gradient con color-mix se diluye
          casi a cero sobre un fondo tan claro (--bg) sin importar el % de alpha,
          porque la interpolación hacia "transparent" apaga el color mucho antes del
          borde. Técnica reemplazada: manchas SÓLIDAS con filter:blur — el color no
          se diluye por interpolación, así que SÍ se percibe a 375px. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -right-16 -top-24 size-[340px] rounded-full bg-[var(--accent)] opacity-70"
          style={{ filter: 'blur(22px)' }}
        />
        {/* Reposicionada: a "top-48" quedaba detrás de las tarjetas de opciones
            (opacas, la tapaban por completo) — el revisor veía plano justo el
            hueco bajo la tarjeta de ayuda, donde SÍ hay canvas visible. */}
        <div
          className="absolute -left-20 -bottom-24 size-[280px] rounded-full bg-[var(--accent)] opacity-60"
          style={{ filter: 'blur(22px)' }}
        />
      </div>
      <header className="mx-auto flex w-full max-w-[520px] items-center justify-between px-4 pt-5">
        <a href="/" className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <LogoMark size={24} />
          VisualTime TDAH
        </a>
        {/* Affordance explícita de salida (h3/control y libertad) — antes solo
            existía el logo-link del header, poco reconocible como "salir".
            Confirma si ya respondió algo: salir a mitad de camino borra esas
            respuestas (viven solo en un ref hasta terminar el recorrido) —
            una acción destructiva disfrazada de neutra, ahora con aviso.
            Modal propio con los tokens de marca, no window.confirm() nativo
            (rompía el tono calmado de la ficha — veredicto del revisor). */}
        <button
          type="button"
          onClick={() => {
            if (indice === 0) {
              router.push('/');
            } else {
              setConfirmarSalida(true);
            }
          }}
          className="flex size-11 items-center justify-center text-[var(--text-secondary)]"
          aria-label="Salir del recorrido de inicio"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </header>

      {/* justify-center: evita el hueco vacío grande bajo la tarjeta de ayuda en
          preguntas cortas — el bloque de pregunta se centra en el alto disponible
          en vez de quedar pegado arriba con todo el resto del viewport vacío. */}
      <div className="mx-auto flex w-full max-w-[520px] flex-1 flex-col justify-center px-4 pb-10 pt-6">
        <AnimatePresence mode="wait">
          {paso === 'pregunta' ? (
            <PantallaPregunta
              key={`p-${indice}`}
              indice={indice}
              total={PREGUNTAS.length}
              respuestaGuardada={respuestas.current[PREGUNTAS[indice].id] ?? null}
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

      <AnimatePresence>
        {confirmarSalida && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-20 flex items-end justify-center bg-[var(--scrim)] px-4 pb-4 sm:items-center"
            onClick={() => setConfirmarSalida(false)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[420px] rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 shadow-[0_12px_40px_-10px_rgb(15_118_110_/_0.35)]"
            >
              <h2 className="text-[18px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
                ¿Seguro que quieres salir?
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                Vas a perder lo que ya respondiste.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="flex h-12 items-center justify-center rounded-[var(--radius-button)] bg-[var(--error)] text-[15px] font-semibold text-[var(--bg)]"
                >
                  Sí, salir
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmarSalida(false)}
                  className="flex h-12 items-center justify-center rounded-[var(--radius-button)] text-[15px] font-semibold text-[var(--text-primary)]"
                >
                  Seguir respondiendo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
