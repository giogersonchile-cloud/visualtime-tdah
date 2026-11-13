'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { X, Lock, ShieldCheck, LifeBuoy } from 'lucide-react';
import { leerRespuestas, type Respuestas } from '@/lib/onboarding';
import { CheckCustom, Hairline } from '@/components/landing/ui';
import { LogoMark, EcoChip } from '@/components/ui/Marca';

type PlanId = 'anual' | 'mensual';

const KEY_PLAN = 'vt_plan_elegido';

function leerPlanGuardado(): PlanId {
  try {
    const v = localStorage.getItem(KEY_PLAN);
    return v === 'mensual' ? 'mensual' : 'anual';
  } catch {
    return 'anual';
  }
}

/** Conteo animado del precio (baseline obligatorio: ningún número héroe estático —
 * 07/14). Cuenta de 0 al valor real en 500ms al montar. */
function PrecioAnimado({ valor, reducedMotion }: { valor: number; reducedMotion: boolean }) {
  const [mostrado, setMostrado] = useState(reducedMotion ? valor : 0);
  useEffect(() => {
    if (reducedMotion) {
      setMostrado(valor);
      return;
    }
    const inicio = performance.now();
    const duracion = 500;
    let raf: number;
    const paso = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion);
      setMostrado(valor * (1 - Math.pow(1 - t, 3)));
      if (t < 1) raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf);
  }, [valor, reducedMotion]);
  return <>${mostrado.toFixed(2)}</>;
}

export default function Paywall() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<Respuestas | null>(null);
  const [plan, setPlanState] = useState<PlanId>('anual');
  const [restauro, setRestauro] = useState<'idle' | 'buscando' | 'sin-compra'>('idle');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setRespuestas(leerRespuestas());
    setPlanState(leerPlanGuardado());
  }, []);

  // h7/flexibilidad: recordar el plan elegido entre visitas (antes siempre
  // reiniciaba en "Anual" aunque el usuario hubiera elegido Mensual antes).
  const setPlan = (p: PlanId) => {
    setPlanState(p);
    try {
      localStorage.setItem(KEY_PLAN, p);
    } catch {
      // sin persistencia disponible (modo privado/cuota) — el flujo sigue igual
    }
  };

  const rutina = respuestas?.p3 || 'rutina';
  const nRespuestas = respuestas ? Object.keys(respuestas).length : 4;

  const empezarPrueba = () => {
    // El checkout real (Hotmart) se conecta en Sesión 6 — por ahora el flujo
    // avanza con estado local, nunca simula un cobro real (50 → C3ter).
    router.push('/login');
  };

  const restaurarCompra = () => {
    // Verificación real contra Hotmart/Supabase llega en Sesión 6 — por ahora
    // el botón SÍ responde y SIEMPRE cierra con un resultado (nunca se queda
    // "Buscando…" sin decir qué pasó — 50 → heurística de estado del sistema).
    setRestauro('buscando');
    window.setTimeout(() => setRestauro('sin-compra'), 1800);
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg)] [font-family:var(--font-body)]">
      {/* Fondo con profundidad — el radial-gradient con color-mix se diluía casi a
          cero sobre un fondo tan claro (--bg); reemplazado por manchas sólidas con
          filter:blur, que sí se perciben a 375px (misma causa raíz que onboarding). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -left-16 -top-20 size-[320px] rounded-full bg-[var(--accent)] opacity-55"
          style={{ filter: 'blur(40px)' }}
        />
        <div
          className="absolute -right-20 top-32 size-[260px] rounded-full bg-[var(--accent-2)] opacity-45"
          style={{ filter: 'blur(40px)' }}
        />
      </div>
      <div className="relative mx-auto w-full max-w-[520px] flex-1 px-4 pb-10 pt-5">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
            <LogoMark size={24} />
            VisualTime TDAH
          </a>
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Cerrar y volver"
            className="flex size-11 items-center justify-center text-[var(--text-secondary)]"
          >
            <X size={20} />
          </button>
        </div>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <h1 className="text-balance text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tu <span className="text-[var(--accent)]">{rutina}</span> ya es tuya, gratis
          </h1>
          <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
            Hecho con tus {nRespuestas} respuestas
          </p>
          {/* Ancla emocional real (FICHA-AVATAR.md, dolor #3 citado): "me cobraron
              antes de los 7 días" es el miedo exacto que este paywall debe disolver
              — la pantalla era puramente transaccional sin nombrar el dolor. */}
          <p className="mt-3 text-[14px] leading-snug text-[var(--text-secondary)]">
            Sabemos que otras apps te cobraron antes de que terminara la prueba.{' '}
            <span className="font-semibold text-[var(--text-primary)]">Aquí no</span> — te avisamos
            antes del día 7, siempre.
          </p>
        </motion.div>

        {/* Visual del valor: value stack — checks con las respuestas reales.
            Hairline degradé (dispositivo ownable de FICHA-ARTE) en el mecanismo. */}
        {/* Value stack + timeline del trial FUSIONADOS en una sola superficie
            (veredicto: 7 bloques apilados era demasiado para un avatar con
            sobrecarga cognitiva — fusionar acorta el recorrido antes del CTA). */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.08 }}
          className="mt-6"
        >
          <Hairline className="p-4 shadow-[0_8px_26px_-8px_rgb(15_118_110_/_0.32)]">
            {/* Rótulo que distingue qué desbloquea la prueba — el titular dice
                "gratis" y, sin esto, los checks de abajo podían leerse como si
                también fueran gratis para siempre (confunde free vs. premium). */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--accent)]">
              Con tu prueba gratis de 7 días
            </p>
            <div className="mt-3 flex flex-col gap-3">
              {[
                'Línea de tiempo visual de tu día',
                'Rutinas recurrentes incluidas, sin límite',
                'Alarmas nativas de tu teléfono',
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <CheckCustom />
                  <span className="text-[14px] text-[var(--text-primary)]">{f}</span>
                </div>
              ))}
            </div>

            {/* Especificidad real (sin inventar números): lo que SÍ podemos
                prometer con certeza sobre la arquitectura 100% local del MVP. */}
            <p className="mt-3 border-t border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] pt-3 text-[14px] text-[var(--text-secondary)]">
              Tus rutinas viven solo en tu teléfono — nunca se venden ni se comparten.
            </p>

            {/* Timeline del trial — superficie HUNDIDA (3er nivel de profundidad). */}
            <div
              className="mt-3 flex flex-col gap-4 rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4"
              style={{ boxShadow: 'inset 0 1px 4px rgb(15 118 110 / 0.16)' }}
            >
              {[
                { nodo: 'lleno', titulo: 'Hoy — acceso completo', sub: 'Todo tu plan, sin límites' },
                { nodo: 'lleno', titulo: 'Día 6 — te avisamos', sub: 'Correo antes de cualquier cobro' },
                {
                  nodo: 'vacio',
                  titulo: `Día 7 — 1er cobro: ${plan === 'anual' ? '$29.99/año' : '$4.99'}`,
                  sub: 'Cancela antes sin costo',
                },
              ].map((n, i) => (
                <div key={n.titulo} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`size-3 rounded-full ${
                        n.nodo === 'lleno' ? 'bg-[var(--accent)]' : 'border-2 border-[var(--accent)] bg-transparent'
                      }`}
                    />
                    {i < 2 && <span className="mt-1 w-[2px] flex-1 bg-[var(--accent)]" />}
                  </div>
                  <div className="pb-1">
                    <p className="text-[14px] font-semibold text-[var(--text-primary)]">{n.titulo}</p>
                    <p className="text-[14px] text-[var(--text-secondary)]">{n.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Hairline>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.24 }}
          className="mt-6 flex flex-col gap-3"
        >
          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setPlan('anual')}
            className={`relative flex min-h-[76px] flex-col justify-center rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors ${
              plan === 'anual'
                ? 'border-[2px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))] shadow-[0_6px_20px_-6px_rgb(15_118_110_/_0.3)]'
                : 'border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-1)]'
            }`}
          >
            <span className="absolute -top-[10px] left-4 rounded-[6px] bg-[var(--accent)] px-2 py-[2px] text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--bg)]">
              Más popular
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[var(--text-primary)]">Anual</span>
              <span className="text-[19px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                <PrecioAnimado valor={2.49} reducedMotion={Boolean(reducedMotion)} />
                <span className="text-[13px] font-medium text-[var(--text-secondary)]">/mes</span>
              </span>
            </div>
            <span className="mt-1 text-[14px] text-[var(--text-secondary)]">Se cobra $29.99/año · 2 meses gratis</span>
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.97 }}
            onClick={() => setPlan('mensual')}
            className={`flex min-h-[76px] flex-col justify-center rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors ${
              plan === 'mensual'
                ? 'border-[2px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))] shadow-[0_6px_20px_-6px_rgb(15_118_110_/_0.3)]'
                : 'border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)] shadow-[var(--shadow-1)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[var(--text-primary)]">Mensual</span>
              <span className="text-[19px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                <PrecioAnimado valor={4.99} reducedMotion={Boolean(reducedMotion)} />
                <span className="text-[13px] font-medium text-[var(--text-secondary)]">/mes</span>
              </span>
            </div>
          </motion.button>
        </motion.div>

        <motion.button
          type="button"
          onClick={empezarPrueba}
          whileTap={{ scale: 0.97 }}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.32 }}
          className="mt-6 flex h-14 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_30%,transparent)]"
        >
          Empezar mis 7 días gratis
        </motion.button>
        {/* Garantía nombrada CERCA del CTA (52 §4 / 50 C2-7): no solo al fondo de
            la pantalla. EcoChip aquí da a esta pantalla su propio punto de
            identidad ownable (antes solo vivía en el logo del header — veredicto
            del revisor: "fuera del acento teal, sin dispositivo visual propio"). */}
        <div className="mt-3 flex items-center justify-center gap-2 text-center text-[14px] text-[var(--text-secondary)]">
          <EcoChip size={26} tone="muted">
            <span className="flex size-[26px] items-center justify-center rounded-full bg-[var(--chip-bg)]">
              <ShieldCheck size={13} color="var(--accent)" aria-hidden="true" />
            </span>
          </EcoChip>
          Cancela cuando quieras · Garantía de 15 días
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-[14px] font-medium text-[var(--text-secondary)]">
          <button type="button" onClick={() => router.push('/')} className="py-2">
            Ahora no
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" onClick={restaurarCompra} disabled={restauro === 'buscando'} className="py-2 disabled:opacity-60">
            {restauro === 'buscando' ? 'Buscando tu compra…' : 'Restaurar compra'}
          </button>
        </div>
        {restauro === 'sin-compra' && (
          // h9 (ayuda a reconocer/diagnosticar/recuperarse del error): el mensaje
          // ahora ofrece una acción de seguimiento, no solo informa que falló.
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 flex flex-col items-center gap-2 text-center"
          >
            <p className="text-[14px] text-[var(--text-secondary)]">
              No encontramos una compra para este dispositivo todavía.
            </p>
            <a
              href="mailto:soporte@visualtimetdah.app"
              className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--accent)]"
            >
              <LifeBuoy size={14} aria-hidden="true" />
              Escribir a soporte
            </a>
          </motion.div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-[var(--text-secondary)]">
          <Lock size={14} aria-hidden="true" />
          <span>Pago seguro con Hotmart</span>
        </div>
      </div>
    </main>
  );
}
