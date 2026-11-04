import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Refresca la sesión de Supabase en cada request — sin esto, el token expira y la
// persona queda "deslogueada" sin aviso aunque el magic link haya funcionado.
//
// CORTAFUEGOS: esto corre en TODAS las rutas, incluida la página de ventas pública.
// Si faltan o están mal las variables de Supabase, NUNCA debe tumbar el sitio entero —
// solo se deja de refrescar la sesión (login/app se encargan de pedir sesión de nuevo).
export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next({ request });

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  try {
    await supabase.auth.getUser();
  } catch {
    // Un problema de red/credenciales al refrescar la sesión no debe tumbar la página —
    // peor caso: la sesión se refresca en la siguiente visita.
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
