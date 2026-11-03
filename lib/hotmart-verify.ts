// Verificación del webhook de Hotmart — 18-VENTA-HOTMART.md, sección "SEGURIDAD DEL WEBHOOK".
// Fail-secure: sin HOTMART_HOTTOK configurado, el módulo revienta al cargar (nunca un default inseguro).
import crypto from 'node:crypto';

const HOTTOK = process.env.HOTMART_HOTTOK;
if (!HOTTOK) throw new Error('FALTA HOTMART_HOTTOK — el webhook no puede operar de forma segura');

function timingSafeEqualStr(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8');
  const bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

/** Camino principal y único salvo que Hotmart documente una firma propia para tu cuenta. */
export function verifyHotmart(hottokRecibido?: string): boolean {
  if (!hottokRecibido) return false;
  return timingSafeEqualStr(hottokRecibido, HOTTOK!);
}

const REPLAY_WINDOW_MS = 5 * 60 * 1000; // 5 minutos

/** Si el evento no trae fecha fiable, no bloquear por esto (mejor falso negativo que tumbar ventas reales). */
export function isFresh(eventTimestampMs?: number): boolean {
  if (!eventTimestampMs) return true;
  const age = Date.now() - eventTimestampMs;
  return age >= 0 && age <= REPLAY_WINDOW_MS;
}
