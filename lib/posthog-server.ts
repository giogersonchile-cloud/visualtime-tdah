// PostHog desde el servidor (webhook de pago) — nunca depende de que el navegador del comprador
// tenga bloqueadores de anuncios apagados. flushAt:1 + flushInterval:0: cada evento sale de
// inmediato; en serverless el contenedor se reutiliza entre invocaciones, así que NUNCA se llama
// shutdown() por request (apagaría el cliente para la siguiente invocación).
import { PostHog } from 'posthog-node';

let cliente: PostHog | null = null;

function obtenerCliente(): PostHog | null {
  const key = process.env.POSTHOG_KEY;
  if (!key) return null;
  if (!cliente) {
    cliente = new PostHog(key, {
      host: process.env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return cliente;
}

export async function trackServidor(distinctId: string, evento: string, props: Record<string, unknown> = {}) {
  const ph = obtenerCliente();
  if (!ph) return;
  ph.capture({ distinctId, event: evento, properties: props });
  await ph.flush();
}
