# SECURITY.md — VisualTime TDAH

Auditoría de seguridad pre-venta, siguiendo `docs/sistema/27-REVISION-SEGURIDAD.md`.
Última revisión: 2026-11-13.

## Threat model ligero (4 preguntas)

1. **¿Qué es lo más valioso que protege la app?** El acceso de pago (nadie sin compra real debe
   entrar a `/app`) y la clave `service_role` de Supabase (si se filtra, da control total de la
   base de datos). Los datos de rutina del usuario son 100% locales (localStorage) — no hay base
   de datos de usuarios con contenido sensible que proteger más allá del acceso mismo.
2. **¿Quién querría atacarla y cómo?** Alguien intentando usar la app gratis sin pagar (bypass del
   webhook o del login), o un bot intentando adivinar/forzar códigos de acceso por fuerza bruta.
3. **¿Cuál es el peor caso si entran?** Acceso gratuito no autorizado a la app (pérdida de ingreso),
   o — si se filtrara la `service_role` key — alguien crea/edita usuarios con acceso pagado sin
   pagar. No hay PII sensible de terceros expuesta (sin tarjetas, sin domicilios, sin datos de salud
   más allá de lo que el propio usuario anota en su rutina, que nunca sale de su teléfono).
4. **¿Qué control concreto mitiga cada uno?** Webhook de Hotmart con firma verificada en tiempo
   constante + idempotencia + máquina de estados (`app/api/webhooks/hotmart/route.ts`); login
   passwordless que nunca crea cuenta sin compra (`shouldCreateUser: false`); RLS deny-by-default en
   las 2 únicas tablas de servidor; `service_role` key solo en variable de entorno server-side,
   nunca en el bundle del navegador.

## Resultado de la auditoría (2026-11-13)

| Paso | Resultado |
|---|---|
| Grep de fail-open / secretos con default inseguro | ✅ Ninguno encontrado |
| CORS abierto en código propio | ✅ Ninguno (el único hit fue en `node_modules`, librería de terceros) |
| Criptografía débil (MD5/SHA1/DES/RC4/ECB) | ✅ Ninguna |
| `npm audit --omit=dev` (dependencias de producción) | ✅ 0 vulnerabilidades |
| `npm audit` completo | ⚠️ 7 moderadas, todas en `@typescript-eslint/*` (herramienta de desarrollo, no corre en producción) |
| `.env` en `.gitignore`, nunca commiteado | ✅ Confirmado (`git log --all -- .env` vacío) |
| `.env.example` con nombres, sin valores reales | ✅ Correcto |
| `service_role` key solo en código de servidor | ✅ Solo en `lib/supabase/admin.ts` |
| RLS en tablas de servidor | ✅ Activo, deny-by-default, cero políticas (correcto: solo `service_role` las toca) |
| Firma del webhook de pago | ✅ `timingSafeEqual`, fail-secure si falta la clave, con idempotencia |
| Rutas de prueba/debug olvidadas | ✅ Ninguna encontrada |
| `dangerouslySetInnerHTML` (riesgo XSS) | ✅ No se usa en ningún archivo |
| Bloques `catch` vacíos que silencian errores | ✅ Todos tienen manejo explícito y documentado |
| Cabeceras de seguridad HTTP | ❌ → ✅ **Corregido**: no existían, se agregaron `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` en `next.config.ts` |

## Pendiente conocido (decisión de producto, no bug)

- **Anti-enumeración del login** (`app/login/page.tsx`): cuando un correo no tiene compra, el
  mensaje dice explícitamente "Ese correo todavía no tiene una compra activa" — esto revela que
  ese correo específico no compró. Es una fuga de información menor (A07), pero fue una decisión
  consciente de UX (el usuario necesita saber si escribió mal su correo de compra) — no es un bug,
  es un trade-off. Si en el futuro se vuelve un problema real (alguien scrapeando compras), cambiar
  a un mensaje genérico ("Si ese correo compró, te llegará un código") y mover la aclaración a
  soporte.
- **Content-Security-Policy**: no se agregó una CSP estricta porque Next.js usa scripts inline
  para la hidratación y una CSP mal puesta puede romper la app sin forma de probarlo contra
  producción desde aquí. Queda pendiente para cuando se pueda probar con cuidado (CSP basada en
  nonce), no improvisada.
- Sin Sentry/monitoreo de errores en producción todavía (A09) — no bloquea vender, pero conviene
  antes de tener volumen real de usuarios.
