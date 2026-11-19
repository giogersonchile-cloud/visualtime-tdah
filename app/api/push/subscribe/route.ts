// Guarda/borra la suscripción push del navegador del usuario. Usa el cliente de servidor con
// cookies (misma sesión que el resto de la app) para que RLS de push_subscriptions aplique como
// ese usuario real — nunca con la service_role key aquí.
import { NextResponse, type NextRequest } from 'next/server';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await crearClienteSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: 'no autenticado' }, { status: 401 });

  const sub = (await req.json()) as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };
  if (!sub.endpoint || !sub.keys?.p256dh || !sub.keys?.auth) {
    return NextResponse.json({ error: 'suscripción incompleta' }, { status: 400 });
  }

  const { error } = await supabase.from('push_subscriptions').upsert(
    {
      user_id: data.user.id,
      endpoint: sub.endpoint,
      p256dh: sub.keys.p256dh,
      auth_key: sub.keys.auth,
    },
    { onConflict: 'endpoint' },
  );
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = await crearClienteSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return NextResponse.json({ error: 'no autenticado' }, { status: 401 });

  const { endpoint } = (await req.json()) as { endpoint?: string };
  if (!endpoint) return NextResponse.json({ error: 'falta endpoint' }, { status: 400 });

  await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint).eq('user_id', data.user.id);
  return NextResponse.json({ ok: true });
}
