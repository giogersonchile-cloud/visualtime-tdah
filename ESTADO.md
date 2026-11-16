# ESTADO — VisualTime TDAH
Última actualización: 2026-11-15 | Sesión actual: 9 (en curso)

⏳ EN PROGRESO — Instrumentación de analítica con PostHog (36-ANALITICA-Y-EVENTOS.md +
60-OPERACION-DE-CONVERSION.md), 2026-11-15. Auditoría confirmó: no existía NINGUNA analítica
(ni PostHog, ni GA4, ni nada) — el embudo se medía a ciegas. Se creó la cuenta/proyecto
"VisualTime TDAH" en PostHog (región US, host `us.i.posthog.com`).
Código ya escrito (sin commitear todavía, build local corriendo para verificar):
- `lib/analytics.ts` — wrapper único cliente (track/identificarUsuario/resetAnalytics), QA
  (`?qa=1`), sesión comercial de 30 min, atribución de origen (primer toque gana), y
  consentimiento (no inicializa PostHog sin aceptar cookies).
- `lib/posthog-server.ts` — cliente server-side para los eventos de pago (nunca dependen del
  navegador del comprador).
- `components/ui/CookieConsent.tsx` — banner Aceptar/Rechazar del MISMO tamaño (47-LEGAL),
  montado en `app/layout.tsx`.
- Instrumentado el embudo completo SIN colapsar etapas: `landing_vista` (app/page.tsx) →
  `onboarding_iniciado`/`onboarding_paso_completado`/`onboarding_completado` (app/onboarding) →
  `resultado_visto`/`paywall_renderizado`/`paywall_visto` (IntersectionObserver real, no el
  montaje) /`paywall_plan_elegido`/`checkout_iniciado` (app/paywall, con `sck` agregado a la URL
  de Hotmart) → `trial_iniciado`/`primer_cobro_confirmado`/`trial_cancelado` SERVER-SIDE desde
  el webhook (`app/api/webhooks/hotmart/route.ts`, distinguiendo usuario nuevo=trial vs
  usuario existente=cobro real) → `app_abierta`/`sesion_iniciada`/`aha_alcanzado`/
  `bloque_completado` (app/app/page.tsx, la pantalla "Hoy"). `identificarUsuario()` en el login
  (los 3 puntos de entrada: canje de código, sesión ya activa, listener), `resetAnalytics()` en
  logout (perfil).
- `app/privacidad/page.tsx` actualizada: se agregó PostHog a la lista de terceros y la sección
  de cookies de medición — la política anterior decía explícitamente "no hay analítica de
  terceros", ya no es cierto, se corrigió para seguir siendo honesta.
- Variables nuevas: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `POSTHOG_KEY`,
  `POSTHOG_HOST` — ya en `.env.local`, TODAVÍA NO en Vercel.
PENDIENTE para continuar (en este orden): (1) confirmar que el build/tsc en background terminó
sin errores, (2) probar el embudo completo en local y confirmar que PostHog recibe los eventos,
(3) pedirle al usuario que agregue las 4 variables en Vercel, (4) publicar con un commit
normal (NUNCA commit vacío esta vez — confirmar `git status` antes), (5) probar en producción,
(6) actualizar este checkpoint a ✅ con la confirmación.
Nota para el futuro: el campo `sck` que el webhook intenta leer de
`body.data.purchase.sckId` es un supuesto razonable pero SIN VERIFICAR contra un payload real
de Hotmart — si al revisar `webhook_log`/eventos reales el campo no trae nada, buscar el nombre
correcto en la documentación de Hotmart o en un payload de prueba real.

✅ CHECKPOINT — Recordatorio de trial (día 5-7) IMPLEMENTADO y CONFIRMADO funcionando en vivo
(2026-11-14). Cumple la promesa que el paywall ya hacía ("te avisamos antes del día 7, siempre")
— no existía ningún mecanismo real para eso (ver CERTIFICADO de abajo, punto FUNNEL).
- `lib/resend.ts` — envío directo vía API REST de Resend (sin SDK), remitente
  `acceso@mail.visualtimetdah.com`.
- `app/api/cron/recordatorio-trial/route.ts` — recorre todos los usuarios de Supabase, filtra
  `plan_status === 'active'`, sin `cancel_at_period_end`, sin `trial_reminder_sent`, con
  `first_paid_at` entre 5 y 7 días atrás, y les manda el correo + marca `trial_reminder_sent`.
  Protegido con `CRON_SECRET` (header `Authorization: Bearer`).
- `vercel.json` — Vercel Cron diario a las 14:00 UTC (11:00 Chile).
- Variables nuevas en Vercel (Production/Preview/Development): `RESEND_API_KEY` (clave nueva,
  dedicada, "Sending access" — no se reutilizó la del SMTP de Supabase) y `CRON_SECRET`.
- PROBADO EN VIVO llamando el endpoint a mano: respondió `200 {"ok":true,"revisados":3,"avisados":1}`
  — encontró un usuario real en la ventana de aviso y le mandó el correo de verdad. El cron de
  Vercel todavía no lo ha disparado solo (corre una vez al día) — la próxima vez que corra solo,
  confirmar en Resend → Emails que salió, y que no vuelva a avisar al mismo usuario dos veces.
Commit: `ef9b388`.

🏆 CERTIFICACIÓN PRE-LANZAMIENTO — actualización post-fix (2026-11-14): el hueco de FUNNEL que
hacía perder puntos por el "puente del trial D1-D7 inexistente" ya no aplica igual — el aviso
pre-cobro (la pieza más importante de ese punto) SÍ existe y SÍ funciona. No se recalculó el
certificado completo de nuevo (quedaría en un número ligeramente mejor que 69/100) — los pendientes
reales que siguen abiertos son: analítica de funnel (RETENCIÓN), dunning/win-back real (RETENCIÓN),
Lighthouse móvil completo (VELOCIDAD). El veredicto de fondo sigue siendo el mismo: puede vender
HOY (el pago ya funciona), pero no cruza el umbral de 80/100 de "clase mundial" todavía.

🏆 CERTIFICACIÓN PRE-LANZAMIENTO (48-RIGOR-DE-ENTREGA.md), 2026-11-14 — VEREDICTO: **NO APTO**
(69/100). Ningún bloqueante duro queda abierto HOY — el único real (no se podía pagar) se encontró
y se corrigió en esta misma sesión — pero el puntaje no cruza el umbral de 80 por falta de madurez
en retención/medición, no por algo roto.
BLOQUEANTE CRÍTICO ENCONTRADO Y CORREGIDO HOY: el botón "Empezar mis 7 días gratis" del paywall
solo hacía `router.push('/login')` — NUNCA llevaba a pagar. Nadie podía comprar desde la app desde
que se construyó. Se conectó a los links de pago reales de Hotmart (uno por plan, obtenidos del
panel → Links de divulgación → por plan → "Página de Pago") y se probó en VIVO en producción:
mensual → `pay.hotmart.com/L108362205F?off=duufr1o0` ($5.240/mes CLP) · anual →
`...?off=kl1q8x7v` ($31.489/año CLP) — ambos con 7 días de prueba, confirmado en pantalla.
También se corrigió "Restaurar compra", que simulaba una búsqueda de 1.8s y SIEMPRE terminaba en
"no encontramos tu compra" (mentía a clientes reales) — ahora manda a `/login`, la única
verificación real que existe. Commit `73d9b39`.
OTRO BUG DE ESCALA ENCONTRADO Y CORREGIDO: `buscarUsuarioPorEmail` en el webhook solo miraba los
primeros 200 usuarios de Supabase — pasado ese número, un comprador existente dejaba de
encontrarse. Corregido para paginar hasta encontrarlo. Commit `b17e581`.
Se crearon `MANUAL-DEL-DUENO.md` y `RUNBOOK.md` (no existía ninguno de los dos, pedidos por 48).
CERTIFICADO /100:
- VENTA 17/20 — landing: estructura canónica hecha, copy 17/20 (revisor), render 32/40·15/20
  (bajo el gate de 36/40·16/20, decisión ya tomada de aceptar este nivel — ver checkpoint de
  craft visual arriba).
- FUNNEL 13/20 — onboarding render 29/40·10/20, paywall render 29/40·14/20·copy19/20; el
  "puente del trial D1-D7" (aviso real antes del día 7 que la propia app promete en su copy)
  NO existe — no hay ningún correo automático de Resend más allá del magic link de login.
  Puntúa 0 en ese sub-ítem porque no se construyó, no porque fallara.
- PRODUCTO 15/20 — pantalla principal render 28/40·13/20; loop de retención (racha/medallas/
  insight) SÍ implementado; los 6 estados no se re-verificaron los seis en esta sesión (offline
  específicamente sin probar hoy).
- CONFIANZA 13/15 — seguridad en verde (SECURITY.md), legal corregido y completo, pago E2E
  confirmado HOY. Deducción menor: CSP estricta pendiente, ledger económico inmaduro.
- VELOCIDAD 6/10 — FCP cálido 280ms, frío ~2.6s (primera visita tras rato sin tráfico); NO se
  corrió un Lighthouse móvil completo contra el budget de `38-PERFORMANCE-BUDGET.md` — puntúa
  parcial porque no se midió del todo, no porque esté mal.
- RETENCIÓN 5/15 — el loop (24) SÍ existe; analítica de eventos/funnel (36) NO existe (sin
  gtag/posthog/ningún tracking); dunning/win-back (58) NO existe (el webhook cambia
  `plan_status` en refund/chargeback, pero no hay email de recuperación ni reactivación).
PUNCH LIST para cruzar 80 (en orden de impacto, ninguno bloquea vender HOY):
1. Montar el puente de correos del trial (día 1, día 5, día 6 — avisar ANTES del cobro, como ya
   promete el copy) — sube FUNNEL y cumple una promesa que hoy no se cumple.
2. Instrumentar analítica básica (visita→onboarding→paywall→pago) — sin esto no sabes dónde se
   cae la gente. Sube RETENCIÓN.
3. Dunning básico (reintento de cobro fallido + 1 email de recuperación) — sube RETENCIÓN.
4. Lighthouse móvil real contra el budget del 38 — confirma o corrige VELOCIDAD.
5. Si el usuario quiere, retomar craft visual de las 4 pantallas núcleo (ya decidido que NO por
   ahora — ver checkpoint arriba).
⚠️ Nada de esto bloquea empezar a vender: el pago YA funciona de punta a punta. Es la diferencia
entre "puede vender" (sí, hoy) y "certificado ≥80, clase mundial" (no todavía).

✅ CHECKPOINT — Sentry (vigilancia de errores) CONECTADO y confirmado enviando eventos (2026-11-14).
Cuenta/organización "visualtime-tdah" en sentry.io, proyecto Next.js. `@sentry/nextjs` instalado
a mano (sin wizard): captura errores del navegador (`instrumentation-client.ts`), del servidor y
edge (`instrumentation.ts`, incluido el webhook de Hotmart), y una pantalla honesta en vez de la
pantalla blanca si algo revienta del todo (`app/global-error.tsx`). Se agregó `/api/health`
(confirma que Supabase responde) para un futuro vigilante externo tipo UptimeRobot.
BUG REAL ENCONTRADO: el primer "Redeploy" rápido desde el toast de Vercel NO horneó la variable
`NEXT_PUBLIC_SENTRY_DSN` en el código publicado (se confirmó inspeccionando el bundle en vivo:
Sentry.init corría pero sin dsn). Se corrigió forzando un build nuevo con un commit vacío
(`facc260`) — con ese sí quedó embebida. Lección: tras agregar/cambiar una variable
`NEXT_PUBLIC_*` en Vercel, un "Redeploy" rápido no siempre basta — verificar con una prueba real,
no solo con que el botón diga "Ready".
CONFIRMADO con `client.captureException()` + `client.flush()` devolviendo `true` (envío real
completado) — pendiente que el usuario confirme visualmente el evento en
`https://visualtime-tdah.sentry.io/issues/`.
Pendiente, no urgente: falta el vigilante de actividad externo (UptimeRobot/BetterStack) sobre
la URL de producción + `/api/health` — Sentry no avisa si la app está caída y nadie la visita.

✅ CHECKPOINT — Auditoría legal hecha (47-LEGAL-FISCAL-Y-PRIVACIDAD.md), 2026-11-14. Responsable
declarado: Giogerson, desde Chile. Huecos reales encontrados y corregidos:
- Privacidad no nombraba a Supabase/Google/Vercel como terceros ni la transferencia
  internacional de datos a EE.UU. (Supabase procesa en us-east-2) — agregado con nombres y función.
- No existía ninguna página "cómo cancelar" in-app (obligatoria antes de vender recurrente) —
  creada en `/cancelar` con pasos + link a app.hotmart.com, enlazada desde el perfil y desde
  `/reembolsos`.
- Términos no declaraba edad mínima (18+, coherente con FICHA-AVATAR 18-35), ley aplicable
  (Chile) ni límite de responsabilidad.
- El login no mostraba aviso de aceptación de Términos/Privacidad — agregado debajo del botón.
Verificado: garantía de 15 días SÍ está configurada en el panel de Hotmart (confirmado por el
usuario) — coincide con landing, FICHA-MERCADO y `/reembolsos`. Prueba 7 días también coincide
en todos los lugares. No aplica: aviso de cookies (no hay analytics/píxeles de terceros en el
código) ni disclaimer de IA (la app no usa IA en ningún punto).
⚠️ PENDIENTE — solo un humano puede hacerlo: si el ingreso se vuelve recurrente de verdad,
consultar a un contador chileno (declarar lo que paga Hotmart como renta propia) y, si el
negocio crece, validar estas páginas con un abogado local — esta auditoría es de completitud,
no asesoría legal colegiada.
Commit: `3786e43`.

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

✅ CHECKPOINT — craft visual CERRADO para esta etapa (2026-11-14): el usuario eligió explícitamente
la opción (a) de abajo — aceptar el nivel actual (copy aprueba, decenas de defectos reales ya
corregidos en 8 rondas) y lanzar, puliendo después con feedback real de clientes en vez de seguir
rondas de revisor-visual que ya habían dejado de encontrar mejoras reales. NO relanzar el ciclo de
revisor-visual sin que el usuario lo pida explícitamente de nuevo.

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
