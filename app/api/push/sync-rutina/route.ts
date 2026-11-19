// Guarda el espejo MÍNIMO del horario (hora, título, días) que el cron necesita para decidir
// cuándo avisar — NUNCA el estado de "completado" (eso sigue 100% local, ver schema.sql).
import { NextResponse, type NextRequest } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

type BloqueMin = { id: string; hora: string; titulo: string; dias: number[] };

export async function POST(req: NextRequest) {
  const supabase = await crearClienteSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: 'no autenticado' }, { status: 401 });

  const body = (await req.json()) as { bloques?: BloqueMin[]; zonaHoraria?: string };
  if (!Array.isArray(body.bloques)) {
    return NextResponse.json({ error: 'bloques inválidos' }, { status: 400 });
  }

  const { error } = await supabase.from('rutinas_notificaciones').upsert(
    {
      user_id: data.user.id,
      bloques: body.bloques,
      zona_horaria: body.zonaHoraria || 'America/Santiago',
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// Cumple la promesa de la Política de Privacidad: al desactivar las notificaciones, el espejo
// del horario se borra del servidor, no solo la suscripción push.
export async function DELETE() {
  const supabase = await crearClienteSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: 'no autenticado' }, { status: 401 });

  await supabase.from('rutinas_notificaciones').delete().eq('user_id', data.user.id);
  return NextResponse.json({ ok: true });
}
