'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { X, Lock, ShieldCheck } from 'lucide-react';
import { leerRespuestas, type Respuestas } from '@/lib/onboarding';
import { CheckCustom } from '@/components/landing/ui';

type PlanId = 'anual' | 'mensual';

export default function Paywall() {
  const router = useRouter();
  const [respuestas, setRespuestas] = useState<Respuestas | null>(null);
  const [plan, setPlan] = useState<PlanId>('anual');
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setRespuestas(leerRespuestas());
  }, []);

  const rutina = respuestas?.p3 || 'tu rutina';
  const nRespuestas = respuestas ? Object.keys(respuestas).length : 4;

  const empezarPrueba = () => {
    // El checkout real (Hotmart) se conecta en Sesión 6 — por ahora el flujo
    // avanza con estado local, nunca simula un cobro real (50 → C3ter).
    router.push('/login');
  };

  return (
    <main className="flex min-h-dvh flex-col bg-[var(--bg)] [font-family:var(--font-body)]">
      <div className="relative mx-auto w-full max-w-[520px] flex-1 px-4 pb-10 pt-5">
        <button
          type="button"
          onClick={() => router.push('/onboarding')}
          aria-label="Cerrar"
          className="flex size-11 items-center justify-center text-[var(--text-secondary)]"
        >
          <X size={20} />
        </button>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2"
        >
          <h1 className="text-balance text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tu <span className="text-[var(--accent)]">{rutina}</span> está lista
          </h1>
          <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
            Hecho con tus {nRespuestas} respuestas
          </p>
        </motion.div>

        {/* Visual del valor: value stack — checks con las respuestas reales */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.08 }}
          className="mt-6 flex flex-col gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-4"
        >
          {[
            'Línea de tiempo visual de tu día',
            'Rutinas recurrentes incluidas, sin límite',
            'Alarmas nativas de tu teléfono',
          ].map((f) => (
            <div key={f} className="flex items-center gap-3">
              <CheckCustom />
              <span className="text-[15px] text-[var(--text-primary)]">{f}</span>
            </div>
          ))}
        </motion.div>

        {/* Timeline del trial (50 → C4): el visual default de todo paywall con trial */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.16 }}
          className="mt-6 flex flex-col gap-4"
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
                <p className="text-[15px] font-semibold text-[var(--text-primary)]">{n.titulo}</p>
                <p className="text-[13px] text-[var(--text-secondary)]">{n.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Plan cards */}
        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reducedMotion ? 0 : 0.24 }}
          className="mt-6 flex flex-col gap-3"
        >
          <button
            type="button"
            onClick={() => setPlan('anual')}
            className={`relative flex min-h-[76px] flex-col justify-center rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors ${
              plan === 'anual'
                ? 'border-[2px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))]'
                : 'border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)]'
            }`}
          >
            <span className="absolute -top-[10px] left-4 rounded-[6px] bg-[var(--accent)] px-2 py-[2px] text-[11px] font-bold uppercase tracking-[0.04em] text-[var(--bg)]">
              Más popular
            </span>
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[var(--text-primary)]">Anual</span>
              <span className="text-[22px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                $2.49<span className="text-[13px] font-medium text-[var(--text-secondary)]">/mes</span>
              </span>
            </div>
            <span className="mt-1 text-[13px] text-[var(--text-secondary)]">Se cobra $29.99/año · 2 meses gratis</span>
          </button>

          <button
            type="button"
            onClick={() => setPlan('mensual')}
            className={`flex min-h-[76px] flex-col justify-center rounded-[var(--radius-card)] border px-4 py-3 text-left transition-colors ${
              plan === 'mensual'
                ? 'border-[2px] border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_7%,var(--surface))]'
                : 'border border-[color-mix(in_oklab,var(--text-tertiary)_22%,transparent)] bg-[var(--surface)]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-[var(--text-primary)]">Mensual</span>
              <span className="text-[22px] font-bold tabular-nums text-[var(--text-primary)] [font-family:var(--font-display)]">
                $4.99<span className="text-[13px] font-medium text-[var(--text-secondary)]">/mes</span>
              </span>
            </div>
          </button>
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
        <p className="mt-2 text-center text-[13px] text-[var(--text-secondary)]">
          Cancela cuando quieras · Te avisamos antes del cobro
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-[14px] font-medium text-[var(--text-secondary)]">
          <button type="button" onClick={() => router.push('/')} className="py-2">
            Ahora no
          </button>
          <span aria-hidden="true">·</span>
          <button type="button" className="py-2">
            Restaurar compra
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-[12px] text-[var(--text-secondary)]">
          <Lock size={14} aria-hidden="true" />
          <span>Pago seguro</span>
          <span aria-hidden="true">·</span>
          <ShieldCheck size={14} aria-hidden="true" />
          <span>Garantía de 15 días</span>
        </div>
      </div>
    </main>
  );
}
