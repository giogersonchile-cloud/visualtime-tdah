'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';

type Estado = 'idle' | 'enviando' | 'enviado' | 'error';

export default function Login() {
  const [email, setEmail] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [segundos, setSegundos] = useState(0);
  const reducedMotion = useReducedMotion();

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || estado === 'enviando') return;
    setEstado('enviando');
    // El envío real de magic link (Supabase Auth) se conecta en Sesión 6 —
    // por ahora el estado es local, nunca se finge una verificación real.
    window.setTimeout(() => {
      setEstado('enviado');
      setSegundos(60);
      const tick = () =>
        setSegundos((s) => {
          if (s <= 1) return 0;
          window.setTimeout(tick, 1000);
          return s - 1;
        });
      window.setTimeout(tick, 1000);
    }, 900);
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[var(--bg)] px-4 pt-14 [font-family:var(--font-body)]">
      {/* Fondo con profundidad (mesh sutil del acento) — nunca fill plano, 55 gate G */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(700px 420px at 50% -10%, color-mix(in oklab, var(--accent) 7%, transparent) 0%, transparent 60%)',
        }}
      />
      <div className="w-full max-w-[400px]">
        <a href="/" className="flex items-center gap-2 text-[16px] font-semibold text-[var(--text-primary)]">
          <span aria-hidden="true" className="relative isolate size-6 overflow-hidden rounded-[8px] bg-[var(--accent)]">
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(120% 120% at 20% 10%, var(--accent-2) 0%, transparent 70%)',
                mixBlendMode: 'soft-light',
                opacity: 0.6,
              }}
            />
          </span>
          VisualTime TDAH
        </a>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {estado !== 'enviado' ? (
            <>
              <h1 className="text-[26px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Entra a tu rutina
              </h1>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                Para guardarla y verla en cualquier dispositivo
              </p>

              <form onSubmit={enviar} className="mt-6 flex flex-col gap-3">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="h-14 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={estado === 'enviando' || !email.includes('@')}
                  className="flex h-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] disabled:opacity-60"
                >
                  {estado === 'enviando' ? 'Enviando…' : 'Enviarme mi enlace de acceso'}
                </button>
                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] text-[15px] font-medium text-[var(--text-primary)]"
                >
                  <span aria-hidden="true" className="text-[16px] font-bold">G</span>
                  Continuar con Google
                </button>
              </form>

              <p className="mt-4 flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                <Lock size={14} aria-hidden="true" />
                Sin contraseñas: te llegará un enlace de un solo uso
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Revisa tu correo
              </h1>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                Te enviamos el enlace a <span className="font-semibold text-[var(--text-primary)]">{email}</span>
              </p>
              <button
                type="button"
                disabled={segundos > 0}
                onClick={enviar}
                className="mt-6 text-[14px] font-medium text-[var(--accent)] disabled:text-[var(--text-secondary)]"
              >
                {segundos > 0 ? `Reenviar en ${segundos}s` : 'Reenviar enlace'}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
