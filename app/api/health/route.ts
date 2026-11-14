// Endpoint que un vigilante externo (UptimeRobot/BetterStack) revisa cada pocos
// minutos. Confirma que el servidor responde Y que Supabase sigue accesible —
// un "200 OK" vacío no habría avisado si Supabase estuviera caído.
import { NextResponse } from 'next/server';
import { crearClienteSupabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const admin = crearClienteSupabaseAdmin();
    const { error } = await admin.auth.admin.listUsers({ perPage: 1 });
    if (error) throw error;
    return NextResponse.json({ status: 'ok' });
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 503 });
  }
}
