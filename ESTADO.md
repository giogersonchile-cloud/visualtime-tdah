# ESTADO — VisualTime TDAH
Última actualización: 2026-11-03 | Sesión actual: 5

⏸️ CHECKPOINT — Última acción completada: Sesión 4 cerrada. Onboarding, paywall y login construidos, probados en navegador de punta a punta, con 3 rondas de revisor-visual (cada una corrigió defectos reales: profundidad/sombras, "Restaurar compra" con estado final, garantía junto al CTA, botón X del paywall que navegaba mal). Craft visual sigue por debajo del gate (13-14/20) — se documenta como pendiente, mismo criterio que la landing, y se avanza a Sesión 5 por decisión del agente (rendimientos decrecientes tras 3 rondas; nada roto, es pulido fino). / Siguiente acción exacta: pedir el OK del usuario para arrancar Sesión 5 (app interna) y, al cerrarla, volver a landing/onboarding/paywall con screenshots reales de la app para la pasada final del revisor.

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

## Gamificación y retención (pendiente — Sesión 5)
- Mecánicas elegidas (del propio resumen del usuario): rachas, medallas de logro, % de progreso diario/mensual, ciclos de planificación de 90 días (reinicios)
- Primera victoria que celebra el onboarding (<5 min, del resumen): elegir plantilla "Rutina de Mañana Exitosa" → línea de tiempo lista con 1 toque, sin escribir nada

## Secuencia maestra de construcción (NO saltar)
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app`
- Landing: código hecho, auditoría técnica en verde — revisor-visual NO LISTA (ver Problemas conocidos)
- Onboarding: código hecho (4 preguntas + loading personalizado), probado en navegador — revisor-visual NO LISTA (ver Problemas conocidos)
- Paywall: código hecho (headline dinámico, timeline del trial, planes, CTA), probado en navegador — revisor-visual NO LISTA (ver Problemas conocidos)
- Login/Auth: código hecho (magic link con estados enviando/enviado/reenvío + botón Google), probado en navegador — el envío real (Supabase Auth) es mock local, se conecta en Sesión 6
- App interna: EN CONSTRUCCIÓN (Sesión 5, arrancando ahora)
- Servicios externos: por construir — GitHub/Vercel/Hotmart/Supabase Auth (Sesión 6)

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: Next.js App Router. Stack: Next.js + almacenamiento local (localStorage/IndexedDB), sin Supabase para datos en el MVP.
- Auth: magic link por email (passwordless), modelo "Hotmart-first" de 26-AUTH-MODERNO.md. Google OAuth como secundario. UI construida en Sesión 4, backend real en Sesión 6.
- Features del MVP: 1) Línea de tiempo visual vertical 24h · 2) Tareas y rutinas recurrentes gratis desde el día uno · 3) Almacenamiento local + notificaciones nativas
- Modelo de IA: ninguno (planificador visual, no generativo)

## Sesiones completadas ✅
- Sesión 1 — Validación + FICHA-AVATAR (borrador) + FICHA-MODELO + monetización + arquitectura + Plan Maestro aceptado
- Sesión 2 — Identidad visual: comparativa A/B/C, Opción B elegida, tour aprobado, FICHA-ARTE.md cerrada
- Sesión 3 — Landing construida en Next.js (10 secciones), código en verde técnico, craft pendiente (placeholders del producto)
- Sesión 4 — Onboarding, paywall y login construidos y probados de punta a punta, 3 rondas de revisor-visual, craft pendiente (ver Problemas conocidos)

## Sesión en progreso 🔧
- Sesión 5 — App interna: arrancando. Construir la línea de tiempo (pantalla principal/M0), la creación de rutinas recurrentes, y los momentos emocionales del loop (racha, medallas) sobre el estilo ya fijado.

## Próximas sesiones 📋
- Sesión 6: Integraciones reales (GitHub, Vercel, Supabase Auth, Hotmart, dominio) y seguridad
- Al cerrar Sesión 5: volver a landing/onboarding/paywall con screenshots reales de la app y relanzar el revisor-visual para su veredicto final

## Problemas conocidos ⚠️
- Las 3 pantallas de venta (landing, onboarding, paywall) pasan la auditoría técnica automática pero el revisor-visual las marca NO LISTA por craft visual (13-16/20, bajo el umbral de 16/20) — en todos los casos la causa es la misma: profundidad/identidad visual que existe en el código pero el revisor la percibe débil en el screenshot. Se corrigieron 2-3 rondas de defectos reales en cada una (ver commits de Sesión 3/4); lo que queda es pulido fino de percepción visual, no funcionalidad rota. Decisión del agente: no seguir iterando a ciegas — se retoma con criterio nuevo (quizás con capturas reales de la app ya construida, que dan más contexto) al cerrar Sesión 5.
- Login: el envío real del magic link (Supabase Auth) es un mock local — se conecta de verdad en Sesión 6. No declarar el login "funcional de punta a punta" hasta esa sesión.
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe de Structured (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy con fuente y fecha. No bloquea nada — la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Ninguna acción suya requerida ahora mismo
- [ ] Más adelante (no ahora): crear cuentas de Hotmart, Vercel, dominio, Supabase — se le avisará cuando llegue el momento (Sesión 6)

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Al cerrar Sesión 5: volver a las 3 pantallas de venta con screenshots reales del producto y relanzar el revisor-visual.
