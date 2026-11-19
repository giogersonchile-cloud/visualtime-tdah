// Cron de alarmas — un servicio EXTERNO (cron-job.org, no Vercel Cron: el plan gratis de Vercel
// solo permite 1 vez al día, insuficiente) llama esto cada ~5 minutos. Revisa el espejo mínimo
// del horario de cada usuario y manda el push justo a la hora del bloque.
import { NextResponse, type NextRequest } from 'next/server';
import * as webpush from 'web-push';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

type BloqueMin = { id: string; hora: string; titulo: string; dias: number[] };

const VENTANA_MINUTOS = 6; // un poco más que el intervalo del cron (5 min), para tolerar atrasos

function horaYDiaEnZona(zonaHoraria: string): { minutosDelDia: number; diaSemana: number; fechaISO: string } {
  const ahora = new Date();
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: zonaHoraria,
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(ahora);
  const obtener = (tipo: string) => partes.find((p) => p.type === tipo)?.value ?? '';
  const hora = parseInt(obtener('hour'), 10) % 24;
  const minuto = parseInt(obtener('minute'), 10);
  const diasCortos = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const diaSemana = diasCortos.indexOf(obtener('weekday'));
  const fechaISO = `${obtener('year')}-${obtener('month')}-${obtener('day')}`;
  return { minutosDelDia: hora * 60 + minuto, diaSemana, fechaISO };
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'no autorizado' }, { status: 401 });
  }
  const vapidPublic = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  const vapidPrivate = process.env.VAPID_PRIVATE_KEY;
  if (!vapidPublic || !vapidPrivate) {
    return NextResponse.json({ error: 'faltan claves VAPID' }, { status: 500 });
  }
  webpush.setVapidDetails('mailto:soporte@visualtimetdah.app', vapidPublic, vapidPrivate);

  const admin = crearClienteSupabaseAdmin();
  const { data: rutinas, error } = await admin.from('rutinas_notificaciones').select('user_id, bloques, zona_horaria');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  let revisados = 0;
  let avisados = 0;

  for (const fila of rutinas ?? []) {
    const { minutosDelDia, diaSemana, fechaISO } = horaYDiaEnZona(fila.zona_horaria || 'America/Santiago');
    const bloques = (fila.bloques as BloqueMin[]) || [];

    for (const bloque of bloques) {
      revisados++;
      if (!bloque.dias?.includes(diaSemana)) continue;
      const [h, m] = bloque.hora.split(':').map(Number);
      const minutosBloque = h * 60 + m;
      const diferencia = minutosDelDia - minutosBloque;
      if (diferencia < 0 || diferencia >= VENTANA_MINUTOS) continue;

      // Idempotencia: el PK (user_id, bloque_id, fecha) solo deja pasar un envío por día.
      const { error: dupError } = await admin
        .from('notificaciones_enviadas')
        .insert({ user_id: fila.user_id, bloque_id: bloque.id, fecha: fechaISO });
      if (dupError) {
        if (dupError.code === '23505') continue; // ya avisado hoy
        console.error('[cron enviar-alarmas] no se pudo registrar idempotencia:', dupError.message);
        continue;
      }

      const { data: subs } = await admin
        .from('push_subscriptions')
        .select('endpoint, p256dh, auth_key')
        .eq('user_id', fila.user_id);

      for (const sub of subs ?? []) {
        try {
          await webpush.sendNotification(
            { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth_key } },
            JSON.stringify({ title: bloque.titulo, body: `Es la hora: ${bloque.hora}`, tag: bloque.id, url: '/app' }),
          );
          avisados++;
        } catch (err) {
          const statusCode = (err as { statusCode?: number }).statusCode;
          if (statusCode === 404 || statusCode === 410) {
            // suscripción vencida/revocada — se borra para no reintentar en vano
            await admin.from('push_subscriptions').delete().eq('endpoint', sub.endpoint);
          } else {
            console.error('[cron enviar-alarmas] fallo enviando a', sub.endpoint, err);
          }
        }
      }
    }
  }

  return NextResponse.json({ ok: true, revisados, avisados });
}
