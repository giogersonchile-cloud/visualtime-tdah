// Wrapper ÚNICO de PostHog — NINGÚN componente llama a `posthog-js` directo (36-ANALITICA-Y-EVENTOS.md).
// Arranca SIN cargar cookies hasta que el usuario acepte (consentimiento, 47-LEGAL). Nombres de
// evento: objeto_accion, snake_case, verbo en pasado (36) — nunca camelCase ni inglés (excepto los
// eventos de gamificación, que no viven aquí).
import posthog from 'posthog-js';

const KEY_CONSENT = 'vt_analytics_consent';
const KEY_SESSION = 'vt_session_id';
const KEY_SESSION_SEEN = 'vt_session_last_seen';
const KEY_ATTRIB = 'vt_attrib_source';
const KEY_QA = 'vt_is_qa';
const SESION_MINUTOS = 30;

let iniciado = false;

function tieneConsentimiento(): boolean {
  try {
    return localStorage.getItem(KEY_CONSENT) === 'aceptado';
  } catch {
    return false;
  }
}

export function iniciarAnalytics() {
  if (typeof window === 'undefined' || iniciado) return;
  if (!tieneConsentimiento()) return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;
  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    autocapture: false,
  });
  iniciado = true;
}

/** Llamar cuando el usuario acepta las cookies de analítica — recién ahí se cargan. */
export function aceptarAnalytics() {
  try {
    localStorage.setItem(KEY_CONSENT, 'aceptado');
  } catch {
    // sin storage disponible — no hay nada más que hacer
  }
  iniciarAnalytics();
}

export function rechazarAnalytics() {
  try {
    localStorage.setItem(KEY_CONSENT, 'rechazado');
  } catch {
    // sin storage disponible
  }
}

export function tieneRespuestaDeConsentimiento(): boolean {
  try {
    return localStorage.getItem(KEY_CONSENT) !== null;
  } catch {
    return false;
  }
}

/** Sesión comercial anónima de 30 min (60-OPERACION-DE-CONVERSION.md) — no un UUID eterno. */
function idDeSesion(): string {
  try {
    const ahora = Date.now();
    const visto = Number(sessionStorage.getItem(KEY_SESSION_SEEN) ?? 0);
    let id = sessionStorage.getItem(KEY_SESSION);
    if (!id || ahora - visto > SESION_MINUTOS * 60_000) {
      id = crypto.randomUUID();
      sessionStorage.setItem(KEY_SESSION, id);
    }
    sessionStorage.setItem(KEY_SESSION_SEEN, String(ahora));
    return id;
  } catch {
    return 'sin-sesion';
  }
}

/** `?qa=1` marca TODA la sesión como prueba (60) — se excluye completa, no solo el evento. */
export function marcarQaDesdeUrl() {
  if (typeof window === 'undefined') return;
  try {
    const p = new URLSearchParams(window.location.search);
    if (p.get('qa') === '1') sessionStorage.setItem(KEY_QA, '1');
    if (p.get('qa') === '0') sessionStorage.removeItem(KEY_QA);
  } catch {
    // sin storage disponible
  }
}

function esQa(): boolean {
  try {
    return sessionStorage.getItem(KEY_QA) === '1';
  } catch {
    return false;
  }
}

/** Primer toque gana — una campaña nueva actualiza source; la navegación interna no lo pisa. */
export function capturarOrigen() {
  if (typeof window === 'undefined') return;
  try {
    const p = new URLSearchParams(window.location.search);
    const src = p.get('src') ?? p.get('utm_source') ?? p.get('fbclid') ?? p.get('gclid');
    if (src && !localStorage.getItem(KEY_ATTRIB)) {
      localStorage.setItem(KEY_ATTRIB, src);
    }
  } catch {
    // sin storage disponible
  }
}

export function leerOrigen(): string {
  try {
    return localStorage.getItem(KEY_ATTRIB) ?? 'directo';
  } catch {
    return 'directo';
  }
}

/** Único punto de entrada de eventos. Nombre en snake_case, verbo en pasado. */
export function track(evento: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !iniciado) return;
  posthog.capture(evento, { ...props, session_id: idDeSesion(), is_qa: esQa() || undefined });
}

/** Asociar la sesión anónima al user_id estable — llamar justo tras autenticar, nunca antes. */
export function identificarUsuario(userId: string, plan: string, source: string) {
  if (typeof window === 'undefined' || !iniciado) return;
  posthog.identify(userId, { plan, source });
}

export function resetAnalytics() {
  if (typeof window === 'undefined' || !iniciado) return;
  posthog.reset();
}
