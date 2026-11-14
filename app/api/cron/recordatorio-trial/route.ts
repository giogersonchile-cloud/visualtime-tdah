// Cumple la promesa que la propia app hace en el paywall ("te avisamos antes del día 7,
// siempre") — Hotmart NO manda este aviso solo (18-VENTA-HOTMART.md). Vercel Cron llama esto
// una vez al día; revisa a quién se le vence la prueba en 1-2 días y le manda un correo.
import { NextResponse, type NextRequest } from 'next/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';
import { enviarCorreo } from '@/lib/resend';

type AppMetadata = {
  plan_status?: string;
  first_paid_at?: string;
  cancel_at_period_end?: boolean;
  trial_reminder_sent?: boolean;
};

const DIAS_PRUEBA = 7;
const VENTANA_AVISO_DESDE_DIAS = 5; // manda el aviso entre el día 5 y el día 7 (antes del cobro)

export async function GET(req: NextRequest) {
  const secret = req.headers.get('authorization')?.replace('Bearer ', '');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'no autorizado' }, { status: 401 });
  }

  const admin = crearClienteSupabaseAdmin();
  let avisados = 0;
  let revisados = 0;

  for (let page = 1; ; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    for (const user of data.users) {
      const meta = user.app_metadata as AppMetadata;
      revisados++;
      if (meta.plan_status !== 'active') continue;
      if (meta.cancel_at_period_end) continue; // ya canceló, no se le va a cobrar
      if (meta.trial_reminder_sent) continue;
      if (!meta.first_paid_at) continue;
      if (!user.email) continue;

      const diasDesdeAlta = (Date.now() - new Date(meta.first_paid_at).getTime()) / 86_400_000;
      if (diasDesdeAlta < VENTANA_AVISO_DESDE_DIAS || diasDesdeAlta >= DIAS_PRUEBA) continue;

      try {
        await enviarCorreo({
          to: user.email,
          subject: 'Tu prueba de VisualTime TDAH termina pronto',
          html: `
            <p>Tu prueba gratis de 7 días está por terminar.</p>
            <p>Después de este período se cobrará automáticamente el plan al que te suscribiste
            en Hotmart — si no quieres continuar, puedes cancelar sin costo antes de que termine
            tu prueba.</p>
            <p><a href="https://www.visualtimetdah.com/cancelar">Cómo cancelar</a></p>
            <p>Si quieres seguir, no necesitas hacer nada — tu rutina sigue donde la dejaste.</p>
          `,
        });
        // Se relee el usuario antes de actualizar para no pisar otros campos de app_metadata
        // (updateUserById reemplaza el objeto completo, no lo combina).
        await admin.auth.admin.updateUserById(user.id, {
          app_metadata: { ...meta, trial_reminder_sent: true },
        });
        avisados++;
      } catch (err) {
        console.error('[cron recordatorio-trial] no se pudo avisar a', user.email, err);
      }
    }

    if (data.users.length < 200) break;
  }

  return NextResponse.json({ ok: true, revisados, avisados });
}
