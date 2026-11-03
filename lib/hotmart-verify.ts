// Verificación del webhook de Hotmart — 18-VENTA-HOTMART.md, sección "SEGURIDAD DEL WEBHOOK".
// Fail-secure PERO AISLADO: sin HOTMART_HOTTOK, el WEBHOOK rechaza todo (nunca un default inseguro),
// pero el chequeo vive dentro de la función (no al importar el módulo) para que la falta de esta
// clave nunca pueda derribar el build/arranque de TODA la app por una pieza que aún no se configuró.
import crypto from 'node:crypto';

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Camino principal y único salvo que Hotmart documente una firma propia para tu cuenta. */
export function verifyHotmart(hottokRecibido?: string): boolean {
  const HOTTOK = process.env.HOTMART_HOTTOK;
  if (!HOTTOK || !hottokRecibido) return false;
  return timingSafeEqualStr(hottokRecibido, HOTTOK);
}

const REPLAY_WINDOW_MS = 5 * 60 * 1000; // 5 minutos

/** Si el evento no trae fecha fiable, no bloquear por esto (mejor falso negativo que tumbar ventas reales). */
export function isFresh(eventTimestampMs?: number): boolean {
  if (!eventTimestampMs) return true;
  const age = Date.now() - eventTimestampMs;
  return age >= 0 && age <= REPLAY_WINDOW_MS;
}
