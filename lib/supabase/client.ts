// Cliente de Supabase para el navegador — solo Auth (26-AUTH-MODERNO.md).
// La app NO guarda datos de producto en Supabase (decisión de ESTADO.md: rutinas y
// completados siguen 100% en localStorage); esto es únicamente para iniciar sesión.
import { createBrowserClient } from '@supabase/ssr';

export function crearClienteSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
