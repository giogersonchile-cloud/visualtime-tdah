# ESTADO — VisualTime TDAH
Última actualización: 2026-11-13 | Sesión actual: 8

✅ CHECKPOINT — Google OAuth FUNCIONANDO de punta a punta, confirmado por el usuario (2026-11-13):
proyecto "visualtime-tdah" en Google Cloud, cliente OAuth web con origen
`https://www.visualtimetdah.com` y callback `https://tspjibbqokwxztfiicok.supabase.co/auth/v1/callback`.
Proveedor Google activado en Supabase con Client ID + Secret. Estado de publicación de la app de
Google: Producción (antes estaba en "Prueba" con cero usuarios autorizados — esa fue la primera
causa de la falla, corregida completando "Información de la marca" + "Publicar app").
Bug real #1 (commit `8d31177`): si el canje del código fallaba, la pantalla se quedaba congelada
sin avisar nada — corregido para mostrar error y permitir reintentar.
Bug real #2, la causa raíz final (commit `083fb0e`): los registros de Supabase (Logs → Auth)
probaron que el canje de Google SÍ se completaba bien en el servidor (`"action":"login"`,
`"provider":"google"`, sin error) en el mismo instante en que la pantalla mostraba "No pudimos
completar el inicio de sesión" — la pantalla no confiaba en esa confirmación. Se corrigió
`app/login/page.tsx` para, antes de mostrar error, verificar con `getSession()` si de verdad no
quedó ninguna sesión. Probado en vivo por el usuario: funcionó.
Lección para futuros bugs de auth/pagos: cuando el cliente dice "falló" pero el servidor
(Supabase Logs, webhook logs, etc.) dice "éxito", el bug casi siempre está en cómo el cliente
interpreta la respuesta, no en el backend — revisar los logs del servidor ANTES de seguir
ajustando el frontend a ciegas.
IMPORTANTE — se encontró que 19 commits llevaban un buen rato sin subirse al repo (`git push`
pendiente); todo el trabajo de craft visual + seguridad + Google de esta sesión estaba solo en
la computadora, no en producción, hasta que se hizo push manual. Revisar al cierre de cada sesión
que no queden commits sin subir.

✅ CHECKPOINT — Auditoría de seguridad pre-venta (27-REVISION-SEGURIDAD.md) HECHA — ver SECURITY.md
para el detalle completo. Resultado: sin hallazgos críticos. Se corrigió 1 hueco real (faltaban
cabeceras HTTP de seguridad — X-Content-Type-Options, X-Frame-Options, Referrer-Policy,
Permissions-Policy — agregadas en `next.config.ts` y verificadas con `curl` contra el servidor
real). Confirmado en verde: 0 vulnerabilidades en dependencias de producción, RLS deny-by-default,
webhook de Hotmart con firma verificada en tiempo constante + idempotencia, `service_role` key solo
en servidor, `.env` nunca commiteado, sin rutas de debug olvidadas, sin XSS, sin catch vacíos.
Pendiente de decisión del usuario (no bloqueante): el mensaje de login revela si un correo compró
o no (trade-off de UX consciente, documentado en SECURITY.md); CSP estricta pendiente de hacer con
cuidado (nonce-based) cuando se pueda probar contra producción; sin Sentry todavía.

✅ CHECKPOINT — craft visual PAUSADO tras 8 rondas de revisor-visual (2026-11-13) — decisión firme
del agente esta vez, con evidencia de que el ciclo ya no mide señal real:
- Lo que SÍ se logró y quedó verificado: FICHA-AVATAR.md APROBADA por el usuario (cosa juzgada).
  El COPY ya pasa en landing (17/20) y paywall (19/20), ningún eje ≤2. Se corrigieron decenas de
  defectos reales y concretos a lo largo de las 8 rondas (ver commits "fix: craft visual (ronda N)"
  en el historial de git para el detalle técnico completo — no repetir aquí).
- Último marcador (ronda 8): landing sin re-revisar (sin cambios de código, se queda en 32/40·15/20
  de ronda 7) · onboarding 29/40·10/20 (CAYÓ de 14 a 10 en craft) · paywall 29/40·14/20·copy19/20
  (sin cambio) · pantalla principal 28/40·13/20 (bajó de 14). NINGUNA cruza el gate doble (≥36/40 +
  ≥16/20).
- EVIDENCIA DE QUE EL CICLO DEJÓ DE SER ÚTIL: en la ronda 8 se le pidió al revisor-visual de
  onboarding evaluar EXACTAMENTE el mismo screenshot/fondo que el agente había verificado momentos
  antes con zoom manual en el navegador (sí se percibía un tinte de color real en ambas esquinas) —
  el revisor de esa ronda reportó "profundidad: 0, no se percibe ningún tinte, lee como fill 100%
  plano". Esta contradicción entre lo que el propio agente vio y lo que el revisor puntuó, sumada a
  que craft BAJÓ 2 veces seguidas (pantalla principal 16→14→13, onboarding 14→10) pese a que los
  cambios de código en esas rondas fueron correcciones puntuales sin tocar lo que supuestamente bajó
  de puntaje, indica que el puntaje de craft en este nivel de detalle tiene demasiado ruido/varianza
  entre corridas del revisor como para servir de señal confiable para seguir iterando a ciegas.
- Patrón observado en las 8 rondas: cada vez que se corrige lo que el revisor pidió, el PUNTAJE
  TOTAL no sube de forma sostenida — oscila entre 28-33/40 y 10-16/20 — porque cada pasada encuentra
  defectos NUEVOS y además re-puntúa con variación el mismo contenido visual sin cambios. Esto NO
  invalida los fixes aplicados (todos eran reales y se corrigieron), pero sí invalida "seguir
  pidiendo rondas idénticas" como estrategia — no hay más señal útil que extraer así.
- Pendiente real, no de craft sino de contenido (el agente no puede resolverlo solo): sumar ≥1
  prueba social real (testimonio de un cliente) cuando exista — hoy hay una leyenda honesta en su
  lugar ("Capturas reales, sin retocar"), válida pero con techo de puntaje.
- Recomendación del agente para la próxima sesión de diseño: NO relanzar rondas completas de
  revisor sin un cambio de enfoque. Opciones: (a) aceptar el nivel actual como suficiente para
  lanzar y seguir punliendo post-lanzamiento con feedback real de usuarios: (b) pedir una pasada de
  diseño nueva, desde cero, con un dispositivo ownable más fuerte definido de una sola vez (no
  parchado pantalla por pantalla).

✅ Sesión 7 (dominio propio + correo) — CERRADA: se compró `visualtimetdah.com` (Namecheap, contactos
verificados ante ICANN, Domain Privacy activa) y se conectó a Vercel (`@` y `www` "Valid
Configuration", SSL generado). Se verificó `mail.visualtimetdah.com` en Resend (DKIM, 2 CNAME SPF,
TXT DMARC) — ya manda correo a cualquier destinatario. Supabase actualizado: sender
`acceso@mail.visualtimetdah.com`, Site URL/Redirect URLs apuntan a `https://www.visualtimetdah.com`
(se dejó la URL vieja de vercel.app como respaldo). Prueba de punta a punta HECHA en producción.

## Sesión anterior (6 — servicios externos, CERRADA EN LO FUNCIONAL)
El camino completo compra → acceso → login → app ya se había probado de punta a punta. Bugs encontrados y corregidos esa sesión (todos publicados en producción): (1) `SUPABASE_SECRET_KEY` en Vercel tenía un salto de línea invisible — por eso cada escritura a Supabase fallaba en silencio y el webhook igual respondía 200 a Hotmart; (2) carrera de milisegundos entre eventos casi simultáneos del mismo comprador; (3) `Site URL`/`Redirect URLs` de Supabase Auth apuntaban a `localhost:3000`; (4) faltaba `emailRedirectTo` apuntando a `/login`; (5) el enlace llega con un código PKCE que hay que canjear a mano (`exchangeCodeForSession`); (6) el código de acceso de Supabase es de 8 dígitos, no 6.

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
- Servicios externos (Sesión 6, CERRADA en lo funcional): GitHub `giogersonchile-cloud/visualtime-tdah` conectado a Vercel (proyecto `visualtime-tdah`, deploy automático funcionando). Supabase project `tspjibbqokwxztfiicok` — Auth conectado, las 4 variables de entorno en Vercel correctas, SQL de servidor ejecutado (`processed_events`, `webhook_log`). Hotmart: cuenta creada, producto `VisualTime TDAH` (ID 8898684) activo con planes Mensual (US$4.99/mes) y Anual (US$29.99/año), ambos con 7 días de prueba gratuita. Webhook en `app.hotmart.com/tools/webhook` → `/api/webhooks/hotmart`, verificado con eventos reales y simulados.
- Dominio propio y correo (Sesión 7, CERRADA): dominio `visualtimetdah.com` comprado en Namecheap, conectado a Vercel (`@` → A record, `www` → CNAME, ambos "Valid Configuration"). Subdominio `mail.visualtimetdah.com` verificado en Resend (DKIM/SPF/DMARC) — ya entrega correo a cualquier destinatario, no solo a la cuenta de prueba. Supabase SMTP sender = `acceso@mail.visualtimetdah.com`; Site URL = `https://www.visualtimetdah.com`; Redirect URLs incluye `https://www.visualtimetdah.com/login` (se dejó también la URL de `visualtime-tdah.vercel.app` como respaldo). Dominio canónico de la app desde ahora: `www.visualtimetdah.com`.
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
- Sesión 6 — Servicios externos: GitHub+Vercel conectados y publicando solo; Supabase Auth con login real (código de 8 dígitos por correo vía Resend) probado de punta a punta hasta `/app`; webhook de Hotmart verificado con compra real; producto y planes de Hotmart creados y activos. Quedó pendiente: dominio propio + Resend con dominio verificado — resuelto en Sesión 7.

## Sesiones completadas ✅ (continuación 3)
- Sesión 7 — Dominio propio `visualtimetdah.com` comprado y conectado a Vercel; Resend verificado en `mail.visualtimetdah.com` (correo ya llega a cualquier cliente); Supabase actualizado (sender + Site URL + Redirect URLs); prueba de punta a punta hecha con el dominio nuevo.

## Próximas sesiones 📋
- Pendiente agrupado (sin sesión fija): volver a landing/onboarding/paywall/pantalla-principal con screenshots reales de la app ya construida y relanzar el revisor-visual — las 4 comparten la misma causa de fondo (falta dispositivo ownable visible)
- Pendiente de madurez de cobros (18-VENTA-HOTMART.md, no bloquea el primer lanzamiento): ledger económico completo (`payment_transactions`) y reconciliación semanal de suscripciones contra Hotmart — por ahora solo existe el dedupe técnico (`processed_events`/`webhook_log`)

## Problemas conocidos ⚠️
- Las 4 pantallas que decidían el dinero (landing, onboarding, paywall, pantalla principal) pasan la auditoría técnica automática pero el revisor-visual las marca NO LISTA por craft visual (12-16/20, bajo el umbral de 16/20) — en todos los casos la causa de fondo es la misma: falta un dispositivo visual ownable (duotone/textura/ilustración de marca) lo bastante fuerte para diferenciarse de cualquier app genérica del nicho, y en la pantalla principal además faltan gestos/atajos (heurística de eficiencia h7). Se corrigieron 2-3 rondas de defectos reales en cada pantalla (ver commits de Sesión 3/4/5) — lo que queda es craft de identidad visual, no funcionalidad rota. Decisión del agente: no seguir iterando a ciegas sesión tras sesión — se agrupan las 4 como un pendiente de pulido visual único, a retomar con criterio nuevo (posiblemente un dispositivo ownable diseñado una sola vez y aplicado a las 4).
- Botón "Continuar con Google" del login: YA CONECTADO en código (signInWithOAuth, reutiliza el
  canje PKCE existente) — falta que el usuario active el proveedor de Google en Supabase
  (Authentication → Providers → Google) con credenciales de su propia cuenta de Google Cloud; sin
  eso, el botón da error "No pudimos conectar con Google" (manejado, no rompe nada).
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe de Structured (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy con fuente y fecha. No bloquea nada — la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [x] Cancelar la suscripción de prueba activa en Hotmart — HECHO 2026-11-12 (solo existía la mensual, con la cuenta `grei.giogerson@gmail.com`; no se encontró una anual)

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Al cerrar Sesión 5: volver a las 3 pantallas de venta con screenshots reales del producto y relanzar el revisor-visual.
