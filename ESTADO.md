# ESTADO — VisualTime TDAH
Última actualización: 2026-11-08 | Sesión actual: 6

✅ CHECKPOINT — Sesión 6 (servicios externos) CERRADA EN LO FUNCIONAL: el camino completo compra → acceso → login → app ya se probó de punta a punta y funciona. Verificado hoy en producción: el usuario de prueba `giogerson.chile@gmail.com` recibió el código de acceso por correo real (vía Resend), lo escribió en `/login`, y entró directo a `/app` (pantalla "Todavía no tienes una rutina" — normal, es solo que ese usuario no pasó por `/onboarding`). Bugs encontrados y corregidos en esta sesión (todos publicados en producción, build verificado cada vez): (1) `SUPABASE_SECRET_KEY` en Vercel tenía un salto de línea invisible — por eso CADA escritura a Supabase fallaba en silencio y el webhook igual respondía 200 a Hotmart (causa raíz del bug original); (2) carrera de milisegundos entre eventos casi simultáneos del mismo comprador; (3) `Site URL`/`Redirect URLs` de Supabase Auth apuntaban a `localhost:3000`, corregido a `https://visualtime-tdah.vercel.app` (+ `/login` en la lista de Redirect URLs); (4) el enlace del correo no tenía a dónde ir a abrir la sesión — se agregó `emailRedirectTo` apuntando a `/login`; (5) el enlace llega con un código PKCE que hay que canjear a mano (`exchangeCodeForSession`), no se detecta solo; (6) el código de acceso de Supabase es de 8 dígitos, no 6 — el campo del formulario solo aceptaba 6. Se conectó Resend como SMTP propio de Supabase (Authentication → Emails → SMTP Settings) y se editó la plantilla "Magic link or OTP" para mostrar el código (`{{ .Token }}`) además del enlace.

## Pendiente agrupado de craft visual (de Sesión 5, sin tocar)
Las 4 pantallas que decidían el dinero (landing, onboarding, paywall, pantalla principal) siguen con craft visual bajo el gate del revisor (ver sección "Problemas conocidos" más abajo) — no se retomó en Sesión 6.

## Qué es esta app (3 líneas máximo)
Planificador visual diario (línea de tiempo vertical de 24h), minimalista, 100% offline/local, con rutinas recurrentes incluidas gratis desde el día uno. Para estudiantes y profesionales jóvenes de LATAM con TDAH o dificultad de función ejecutiva. Monetización: suscripción mensual/anual con hard paywall tras 7 días de prueba gratis.

## Promesa central
"VisualTime TDAH ayuda a jóvenes latinoamericanos con TDAH a ver y controlar su día completo sin perderse en listas infinitas, sin pagar de más por repetir una tarea todos los días, mediante una línea de tiempo visual que vive 100% en su teléfono."

## Reporte de validación (Sesión 1) — aportado por el usuario, ya investigado, NO se re-valida
- Veredicto: Excelente oportunidad (resumen validado entregado por el usuario, con fuentes de reseñas y mercado)
- Apps de referencia: Structured (líder, ADHD/productividad), Sunsama (corporativo, caro), Tiimo (UX confusa)
- Lo que los usuarios odian de la competencia (nuestra oportunidad): tareas recurrentes bloqueadas tras pago, fallas de sincronización, versión Android pobre, aumentos de precio agresivos (lifetime hasta US$99.99)
- Brecha LATAM confirmada: sí — líderes caros (US$25-100), sin precios PPP, sin paridad Android
- Precio de referencia del mercado: Structured US$6.99/mes · US$29.99/año · US$99.99 lifetime

## Dirección de Arte (Sesión 2 — CERRADA, cosa juzgada — NO se reabre sin pedirlo el usuario)
- FICHA-ARTE.md: existe y APROBADA — 2026-11-02
- ELEGIDA: Opción B — "Calma Clara" (Clínica humana, banco 54 dir. 5, adaptada) — Gantari (display) + Atkinson Hyperlegible (body, legibilidad TDAH/dislexia) · acento teal #0F766E · 2ª nota mandarina #D97E00 solo en racha/medallas · fondo #F4F7F6 · superficie #FDFEFD · texto #22302C/#5B6D67 · radius 16/12 · dispositivo: duotone de marca
- Tokens materializados en `app/globals.css` + `components/landing/tokens.css` desde Sesión 3
- Registro anti-repetición: paleta teal #0F766E + par Gantari/Atkinson Hyperlegible → vetados para el próximo proyecto del SO

## Avatar y venta (Sesión 1)
- FICHA-AVATAR.md: existe — BORRADOR (≥10 frases VoC con fuente "reseñas aportadas por el usuario"; falta que el usuario la apruebe explícitamente)
- Resumen: joven 18-35 LATAM/Android con TDAH o función ejecutiva débil · dolor #1 "pagar por repetir una tarea diaria" · deseo #1 "rutinas gratis, sin anuncios" · nivel de consciencia: problem-aware · sofisticación: alta (mercado saturado de productividad)

## Estrategia de monetización (Sesión 1 — DECIDIDA, ya venía del resumen del usuario)
- Modelo: Hard paywall tras onboarding, con 7 días de prueba gratuita (dato del usuario: trials de 7 días convierten 70% mejor que de 3 días)
- Trial: 7 días · Pricing: US$4.99/mes · US$29.99/año (mostrado como ~US$2.49/mes) · Garantía: 15 días (FICHA-MERCADO.md)

## Gamificación y retención (Sesión 5 — loop implementado)
- Loop (24, Regla de Oro 6): GATILLO = la hora del bloque (alarma nativa, fuera de alcance web) o abrir la app · ACCIÓN = marcar un bloque hecho (1 tap) · RECOMPENSA = check visual + anillo de hoy + insight del patrón · INVERSIÓN = cada marca alimenta la racha y el insight de mañana (test superado: sin historial, la app de mañana vuelve a ser genérica)
- Mecánicas implementadas: racha (días consecutivos con ≥1 bloque hecho, calculada en `lib/rutina.ts`), medallas en 7/14/30/90 días (pantalla Progreso), % de hoy (anillo), insight semanal honesto (solo afirma lo que los datos muestran)
- Primera victoria del onboarding: la rutina elegida en la pregunta 3 se siembra automáticamente al terminar el quiz (ver `rutinaDesdeRespuesta` en `lib/onboarding.ts` → `app/onboarding/page.tsx`)

## Secuencia maestra de construcción (NO saltar)
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app`
- Landing: código hecho, auditoría técnica en verde — revisor-visual NO LISTA (ver Problemas conocidos)
- Onboarding: código hecho (4 preguntas + loading personalizado), probado en navegador — revisor-visual NO LISTA (ver Problemas conocidos)
- Paywall: código hecho (headline dinámico, timeline del trial, planes, CTA), probado en navegador — revisor-visual NO LISTA (ver Problemas conocidos)
- Login/Auth: código hecho (magic link con estados enviando/enviado/reenvío + botón Google), probado en navegador — el envío real (Supabase Auth) es mock local, se conecta en Sesión 6
- App interna: código hecho — Hoy (ritual diario), Progreso, Semana, Perfil — probada de punta a punta en navegador; craft visual de la pantalla principal pendiente (revisor-visual NO LISTA tras 3 rondas, ver Problemas conocidos)
- Servicios externos: por construir — GitHub/Vercel/Hotmart/Supabase Auth (Sesión 6)

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: Next.js App Router. Stack: Next.js + almacenamiento local (localStorage/IndexedDB), sin Supabase para datos en el MVP.
- Auth: magic link + código de 6 dígitos (passwordless), modelo "Hotmart-first" de 26-AUTH-MODERNO.md: el webhook crea el usuario en Supabase Auth recién al pagar (`shouldCreateUser: false` en el login — nadie sin compra puede entrar). Google OAuth queda como botón visual pendiente de conectar. Estado de la membresía en `app_metadata.plan_status` (nunca en user_metadata, que el usuario puede editar).
- Servicios externos (Sesión 6, CERRADA en lo funcional): GitHub `giogersonchile-cloud/visualtime-tdah` conectado a Vercel (proyecto `visualtime-tdah`, dominio `visualtime-tdah.vercel.app`, deploy automático funcionando). Supabase project `tspjibbqokwxztfiicok` — Auth conectado, las 4 variables de entorno en Vercel correctas (las 3 públicas + `SUPABASE_SECRET_KEY`, corregida tras el bug del salto de línea), SQL de servidor ejecutado (`processed_events`, `webhook_log`), login probado de punta a punta en producción (código de 8 dígitos por correo → `/app`). Hotmart: cuenta creada, producto `VisualTime TDAH` (ID 8898684) activo con planes Mensual (US$4.99/mes) y Anual (US$29.99/año), ambos con 7 días de prueba gratuita. Webhook en `app.hotmart.com/tools/webhook` → `/api/webhooks/hotmart`, verificado con eventos reales y simulados. Correo: Resend conectado como SMTP de Supabase (Authentication → Emails → SMTP Settings) con el sender de prueba `onboarding@resend.dev` — SOLO puede entregar a la cuenta dueña de Resend (`giogerson.chile@gmail.com`) hasta que se conecte un dominio propio verificado en Resend; para otros correos (clientes reales) hay que terminar esa conexión antes de lanzar de verdad.
- Features del MVP: 1) Línea de tiempo visual vertical 24h · 2) Tareas y rutinas recurrentes gratis desde el día uno · 3) Almacenamiento local + notificaciones nativas
- Modelo de IA: ninguno (planificador visual, no generativo)

## Sesiones completadas ✅
- Sesión 1 — Validación + FICHA-AVATAR (borrador) + FICHA-MODELO + monetización + arquitectura + Plan Maestro aceptado
- Sesión 2 — Identidad visual: comparativa A/B/C, Opción B elegida, tour aprobado, FICHA-ARTE.md cerrada
- Sesión 3 — Landing construida en Next.js (10 secciones), código en verde técnico, craft pendiente (placeholders del producto)
- Sesión 4 — Onboarding, paywall y login construidos y probados de punta a punta, 3 rondas de revisor-visual, craft pendiente (ver Problemas conocidos)

## Sesiones completadas ✅ (continuación)
- Sesión 5 — App interna (Hoy/Progreso/Semana/Perfil) construida y probada de punta a punta; loop de retención implementado; pantalla principal con 3 rondas de revisor-visual, craft pendiente (ver Problemas conocidos)

## Sesiones completadas ✅ (continuación 2)
- Sesión 6 — Servicios externos: GitHub+Vercel conectados y publicando solo; Supabase Auth con login real (código de 8 dígitos por correo vía Resend) probado de punta a punta hasta `/app`; webhook de Hotmart verificado con compra real; producto y planes de Hotmart creados y activos. Queda pendiente (no bloquea seguir usando la app en pruebas): dominio propio + Resend con dominio verificado para que el correo le llegue a cualquier cliente, no solo a la cuenta de Resend.

## Próximas sesiones 📋
- Pendiente agrupado (sin sesión fija): volver a landing/onboarding/paywall/pantalla-principal con screenshots reales de la app ya construida y relanzar el revisor-visual — las 4 comparten la misma causa de fondo (falta dispositivo ownable visible)
- Pendiente de madurez de cobros (18-VENTA-HOTMART.md, no bloquea el primer lanzamiento): ledger económico completo (`payment_transactions`) y reconciliación semanal de suscripciones contra Hotmart — por ahora solo existe el dedupe técnico (`processed_events`/`webhook_log`)

## Problemas conocidos ⚠️
- Las 4 pantallas que decidían el dinero (landing, onboarding, paywall, pantalla principal) pasan la auditoría técnica automática pero el revisor-visual las marca NO LISTA por craft visual (12-16/20, bajo el umbral de 16/20) — en todos los casos la causa de fondo es la misma: falta un dispositivo visual ownable (duotone/textura/ilustración de marca) lo bastante fuerte para diferenciarse de cualquier app genérica del nicho, y en la pantalla principal además faltan gestos/atajos (heurística de eficiencia h7). Se corrigieron 2-3 rondas de defectos reales en cada pantalla (ver commits de Sesión 3/4/5) — lo que queda es craft de identidad visual, no funcionalidad rota. Decisión del agente: no seguir iterando a ciegas sesión tras sesión — se agrupan las 4 como un pendiente de pulido visual único, a retomar con criterio nuevo (posiblemente un dispositivo ownable diseñado una sola vez y aplicado a las 4).
- Correo: Resend está en modo de prueba (sin dominio propio verificado), solo entrega a `giogerson.chile@gmail.com`. Antes de dejar entrar a clientes reales hay que: comprar un dominio, verificarlo en Resend, y cambiar el "Sender email address" en Supabase de `onboarding@resend.dev` al correo del dominio propio (ej. `acceso@tudominio.com`).
- Botón "Continuar con Google" del login: sigue siendo solo visual, no conectado (pendiente, no bloquea — el login por correo ya funciona).
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe de Structured (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy con fuente y fecha. No bloquea nada — la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Comprar un dominio propio y conectarlo (Vercel + verificarlo en Resend) antes de anunciar la app a clientes reales
- [ ] Decidir si cancela las 2 suscripciones de prueba activas en Hotmart (plan mensual y anual, ambas en periodo de prueba gratis) para que no se cobren en 7 días

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Al cerrar Sesión 5: volver a las 3 pantallas de venta con screenshots reales del producto y relanzar el revisor-visual.
