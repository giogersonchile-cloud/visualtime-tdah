'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Lock } from 'lucide-react';
import { crearClienteSupabase } from '@/lib/supabase/client';
import { LogoMark } from '@/components/ui/Marca';

type Estado = 'idle' | 'enviando' | 'enviado' | 'verificando' | 'error';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [codigo, setCodigo] = useState('');
  const [estado, setEstado] = useState<Estado>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [segundos, setSegundos] = useState(0);
  const reducedMotion = useReducedMotion();

  // El enlace del correo llega con "?code=..." (flujo PKCE) — el cliente de Supabase NO lo
  // canjea solo, hay que llamarlo a mano con el código de la URL. Si ya quedó una sesión
  // activa (porque la persona entró desde el enlace), la mandamos a /app.
  useEffect(() => {
    const supabase = crearClienteSupabase();
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ data, error }) => {
        if (!error && data.session) router.replace('/app');
      });
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/app');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) router.replace('/app');
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  const iniciarCuenta = () => {
    setSegundos(60);
    const tick = () =>
      setSegundos((s) => {
        if (s <= 1) return 0;
        window.setTimeout(tick, 1000);
        return s - 1;
      });
    window.setTimeout(tick, 1000);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || estado === 'enviando') return;
    setEstado('enviando');
    setErrorMsg('');
    const supabase = crearClienteSupabase();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        // Sin esto, el enlace del correo manda a la Site URL (la landing "/"), que no
        // tiene ningún código para abrir la sesión — solo esta pantalla lo tiene.
        emailRedirectTo: `${window.location.origin}/login`,
      },
    });
    if (error) {
      setEstado('error');
      setErrorMsg(
        error.message.includes('Signups not allowed')
          ? 'Ese correo todavía no tiene una compra activa. Revisa que sea el mismo que usaste al comprar.'
          : 'No pudimos enviar el código. Intenta de nuevo en un momento.',
      );
      return;
    }
    setEstado('enviado');
    iniciarCuenta();
  };

  const verificar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (codigo.trim().length < 6 || codigo.trim().length > 8 || estado === 'verificando') return;
    setEstado('verificando');
    setErrorMsg('');
    const supabase = crearClienteSupabase();
    const { error } = await supabase.auth.verifyOtp({ email, token: codigo.trim(), type: 'email' });
    if (error) {
      setEstado('enviado');
      setErrorMsg('Ese código no es válido o ya venció. Pide uno nuevo o revisa el enlace del correo.');
      return;
    }
    router.push('/app');
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
          <LogoMark size={24} />
          VisualTime TDAH
        </a>

        <motion.div
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {estado !== 'enviado' && estado !== 'verificando' ? (
            <>
              <h1 className="text-[26px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Entra a tu rutina
              </h1>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                Usa el mismo correo con el que compraste
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
                  {estado === 'enviando' ? 'Enviando…' : 'Enviarme mi código de acceso'}
                </button>
                <button
                  type="button"
                  className="flex h-14 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] text-[15px] font-medium text-[var(--text-primary)]"
                >
                  <span aria-hidden="true" className="text-[16px] font-bold">G</span>
                  Continuar con Google
                </button>
              </form>

              {estado === 'error' && errorMsg && (
                <p role="alert" className="mt-3 text-[13px] text-[var(--error)]">
                  {errorMsg}
                </p>
              )}

              <p className="mt-4 flex items-center gap-2 text-[13px] text-[var(--text-secondary)]">
                <Lock size={14} aria-hidden="true" />
                Sin contraseñas: te llegará un enlace y un código de un solo uso
              </p>
            </>
          ) : (
            <>
              <h1 className="text-[24px] font-bold leading-[1.15] text-[var(--text-primary)] [font-family:var(--font-display)]">
                Revisa tu correo
              </h1>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)]">
                Te enviamos un enlace y un código a{' '}
                <span className="font-semibold text-[var(--text-primary)]">{email}</span>
              </p>

              <form onSubmit={verificar} className="mt-6 flex flex-col gap-3">
                <label htmlFor="codigo" className="text-[13px] font-medium text-[var(--text-secondary)]">
                  ¿Recibiste un código? Escríbelo aquí
                </label>
                <input
                  id="codigo"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={8}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ''))}
                  placeholder="00000000"
                  className="h-14 rounded-[var(--radius-button)] border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] bg-[var(--surface)] px-4 text-center text-[20px] font-semibold tracking-[0.3em] text-[var(--text-primary)] outline-none focus:border-[var(--accent)]"
                />
                <button
                  type="submit"
                  disabled={estado === 'verificando' || codigo.length < 6}
                  className="flex h-14 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-semibold text-[var(--bg)] disabled:opacity-60"
                >
                  {estado === 'verificando' ? 'Entrando…' : 'Entrar'}
                </button>
              </form>

              {errorMsg && (
                <p role="alert" className="mt-3 text-[13px] text-[var(--error)]">
                  {errorMsg}
                </p>
              )}

              <button
                type="button"
                disabled={segundos > 0}
                onClick={(e) => enviar(e as unknown as React.FormEvent)}
                className="mt-4 text-[14px] font-medium text-[var(--accent)] disabled:text-[var(--text-secondary)]"
              >
                {segundos > 0 ? `Reenviar en ${segundos}s` : 'Reenviar código'}
              </button>
            </>
          )}
        </motion.div>
      </div>
    </main>
  );
}
