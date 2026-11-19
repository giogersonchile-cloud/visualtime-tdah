// Alarmas push — pide permiso, suscribe el navegador, y manda el horario mínimo al servidor
// (ver supabase/schema.sql y la Política de Privacidad actualizada: 2026-11-19). Solo se llama
// desde app/app/** (ya hay sesión activa). Las rutas /api/push/* leen la sesión de las MISMAS
// cookies que ya usa el resto de la app — un fetch same-origin las manda solo, sin tokens a mano.
import type { Rutina } from '@/lib/rutina';

export type EstadoNotificaciones = 'no-soportado' | 'denegado' | 'inactivo' | 'activo';

export function estadoNotificaciones(): EstadoNotificaciones {
  if (typeof window === 'undefined' || !('Notification' in window) || !('serviceWorker' in navigator)) {
    return 'no-soportado';
  }
  if (Notification.permission === 'denied') return 'denegado';
  return 'inactivo'; // 'activo' se confirma de forma async con hayActivas()
}

export async function hayActivas(): Promise<boolean> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return false;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return false;
    const sub = await reg.pushManager.getSubscription();
    return !!sub;
  } catch {
    return false;
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function activarNotificaciones(): Promise<{ ok: boolean; error?: string }> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator) || !('PushManager' in window)) {
    return { ok: false, error: 'Tu navegador no soporta notificaciones push.' };
  }
  const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!vapidKey) return { ok: false, error: 'Falta la clave VAPID pública.' };

  const permiso = await Notification.requestPermission();
  if (permiso !== 'granted') {
    return { ok: false, error: 'No diste permiso de notificaciones — actívalo en los ajustes del navegador si cambias de idea.' };
  }

  const reg = await navigator.serviceWorker.register('/sw.js');
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKey) as unknown as BufferSource,
  });

  const res = await fetch('/api/push/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sub.toJSON()),
  });
  if (!res.ok) return { ok: false, error: 'No pudimos guardar tu suscripción. Intenta de nuevo.' };
  return { ok: true };
}

export async function desactivarNotificaciones(): Promise<void> {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
  const reg = await navigator.serviceWorker.getRegistration();
  const sub = await reg?.pushManager.getSubscription();
  if (!sub) return;
  await sub.unsubscribe();
  await fetch('/api/push/subscribe', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ endpoint: sub.endpoint }),
  });
  // Cumple la promesa de la Política de Privacidad: borra también el espejo del horario.
  await fetch('/api/push/sync-rutina', { method: 'DELETE' }).catch(() => {});
}

/** Manda al servidor el espejo MÍNIMO del horario (hora, título, días — nunca "completados").
 * Se llama cada vez que la rutina cambia, si el usuario ya activó las alarmas. */
export async function sincronizarRutinaServidor(rutina: Rutina): Promise<void> {
  const activas = await hayActivas();
  if (!activas) return; // sin esto no tiene sentido mandar nada al servidor
  const zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/Santiago';
  await fetch('/api/push/sync-rutina', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bloques: rutina.bloques.map((b) => ({ id: b.id, hora: b.hora, titulo: b.titulo, dias: b.dias })),
      zonaHoraria,
    }),
  }).catch(() => {
    // Falla silenciosa: la próxima sincronización lo intenta de nuevo. No bloquear al usuario
    // por un problema de red mientras arma su rutina.
  });
}
