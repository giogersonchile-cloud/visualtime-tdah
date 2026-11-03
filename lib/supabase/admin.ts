// Cliente de Supabase con la service_role key — SOLO se importa desde código de servidor
// (route handlers de app/api/**, nunca desde un componente 'use client'). Ignora RLS: la
// seguridad la pone el código que lo usa (18-VENTA-HOTMART.md / 25-BASE-DE-DATOS.md).
import { createClient } from '@supabase/supabase-js';

export function crearClienteSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secret) {
    throw new Error('Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SECRET_KEY — el servidor no puede operar.');
  }
  return createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
}
