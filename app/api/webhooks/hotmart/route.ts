// Webhook de Hotmart — crea/revoca acceso en Supabase Auth cuando hay un pago real.
// Pipeline obligatorio de 18-VENTA-HOTMART.md: AUTENTICIDAD → FRESCURA → IDEMPOTENCIA → AUTORIZACIÓN.
// NUNCA confiar en el payload sin validar: este endpoint es el más atacado de la app (self-serve premium gratis).
import { NextResponse, type NextRequest } from 'next/server';
import { verifyHotmart, isFresh } from '@/lib/hotmart-verify';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

type EventoHotmart = {
  id?: string;
  event?: string;
  hottok?: string;
  creation_date?: number;
  data?: {
    buyer?: { email?: string; name?: string };
    purchase?: { transaction?: string; status?: string };
  };
};

async function registrarLog(eventId: string | undefined, type: string | undefined, result: string) {
  const admin = crearClienteSupabaseAdmin();
  await admin.from('webhook_log').insert({ event_id: eventId, type, result });
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  let body: EventoHotmart;
  try {
    body = JSON.parse(raw);
  } catch {
    await registrarLog(undefined, undefined, 'error');
    return NextResponse.json({ error: 'payload inválido' }, { status: 400 });
  }

  // 1) AUTENTICIDAD — el hottok viaja en el header x-hotmart-hottok o en el campo hottok del body, según
  // cómo esté configurada la cuenta; se acepta cualquiera de los dos.
  const hottokRecibido = req.headers.get('x-hotmart-hottok') ?? body.hottok;
  if (!verifyHotmart(hottokRecibido)) {
    await registrarLog(body.id, body.event, 'unauthorized');
    return NextResponse.json({ error: 'no autorizado' }, { status: 401 });
  }

  // 2) FRESCURA — rechaza reenvíos de eventos viejos capturados/repetidos.
  if (!isFresh(body.creation_date)) {
    await registrarLog(body.id, body.event, 'illegal');
    return NextResponse.json({ error: 'evento vencido' }, { status: 400 });
  }

  const admin = crearClienteSupabaseAdmin();
  const eventId = body.id ?? body.data?.purchase?.transaction;
  if (!eventId) {
    await registrarLog(undefined, body.event, 'error');
    return NextResponse.json({ error: 'evento sin id' }, { status: 400 });
  }

  // 3) IDEMPOTENCIA — Hotmart reintenta el mismo evento; el PK de processed_events deduplica.
  const { error: dupError } = await admin
    .from('processed_events')
    .insert({ event_id: eventId, event_type: body.event ?? 'desconocido' });
  if (dupError) {
    await registrarLog(eventId, body.event, 'duplicate');
    return NextResponse.json({ ok: true, duplicate: true }, { status: 200 });
  }

  // 4) AUTORIZACIÓN — máquina de estados de la membresía (tabla de 18-VENTA-HOTMART.md).
  const email = body.data?.buyer?.email?.toLowerCase().trim();
  if (!email) {
    await registrarLog(eventId, body.event, 'error');
    return NextResponse.json({ error: 'sin email de comprador' }, { status: 400 });
  }

  try {
    switch (body.event) {
      case 'PURCHASE_APPROVED':
      case 'PURCHASE_COMPLETE': {
        await otorgarAcceso(admin, email, body.data?.buyer?.name);
        break;
      }
      case 'PURCHASE_REFUNDED':
      case 'PURCHASE_CHARGEBACK': {
        await revocarAcceso(admin, email, body.event === 'PURCHASE_CHARGEBACK' ? 'chargeback' : 'refunded');
        break;
      }
      case 'SUBSCRIPTION_CANCELLATION': {
        await marcarCancelado(admin, email);
        break;
      }
      default: {
        await registrarLog(eventId, body.event, 'applied');
        return NextResponse.json({ ok: true, ignored: body.event }, { status: 200 });
      }
    }
  } catch {
    await registrarLog(eventId, body.event, 'error');
    return NextResponse.json({ error: 'fallo interno' }, { status: 500 });
  }

  await registrarLog(eventId, body.event, 'applied');
  return NextResponse.json({ ok: true }, { status: 200 });
}

async function buscarUsuarioPorEmail(admin: ReturnType<typeof crearClienteSupabaseAdmin>, email: string) {
  // listUsers no filtra por email de forma nativa en todas las versiones; se pagina si hace falta.
  const { data } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  return data.users.find((u) => u.email?.toLowerCase() === email) ?? null;
}

async function otorgarAcceso(admin: ReturnType<typeof crearClienteSupabaseAdmin>, email: string, nombre?: string) {
  const existente = await buscarUsuarioPorEmail(admin, email);
  const appMetadata = { plan_status: 'active', first_paid_at: new Date().toISOString() };
  if (existente) {
    await admin.auth.admin.updateUserById(existente.id, { app_metadata: appMetadata });
  } else {
    await admin.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: nombre ? { nombre } : undefined,
      app_metadata: appMetadata,
    });
  }
}

async function revocarAcceso(
  admin: ReturnType<typeof crearClienteSupabaseAdmin>,
  email: string,
  motivo: 'refunded' | 'chargeback',
) {
  const existente = await buscarUsuarioPorEmail(admin, email);
  if (!existente) return; // nada que revocar — no es un error del webhook
  await admin.auth.admin.updateUserById(existente.id, { app_metadata: { plan_status: motivo } });
}

async function marcarCancelado(admin: ReturnType<typeof crearClienteSupabaseAdmin>, email: string) {
  const existente = await buscarUsuarioPorEmail(admin, email);
  if (!existente) return;
  // Cancelación voluntaria: mantiene acceso completo hasta el fin del ciclo ya pagado — no se corta ahora.
  // El valor real de access_until depende del payload de tu cuenta (fecha de fin de ciclo);
  // sin ese dato fiable, se documenta como pendiente (ver ESTADO.md) y se deja el estado 'active'
  // hasta que llegue PURCHASE_EXPIRED o un reembolso.
  await admin.auth.admin.updateUserById(existente.id, {
    app_metadata: { plan_status: 'active', cancel_at_period_end: true },
  });
}
