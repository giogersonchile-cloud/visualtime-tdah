# ESTADO — VisualTime TDAH
Última actualización: 2026-11-02 | Sesión actual: 2

⏸️ CHECKPOINT — Última acción completada: Sesión 4 construida y probada en navegador — onboarding, paywall y login funcionando de punta a punta. Dos rondas de revisor-visual ya corregidas (profundidad/sombras reforzadas, botón "Restaurar compra" con estado final, garantía junto al CTA, tarjeta de ayuda que llena el espacio vacío del onboarding). Una tercera pasada del revisor quedó corriendo en segundo plano cuando el usuario pidió pausar — su resultado NO se leyó todavía. El usuario pidió parar aquí y continuar otro día. / Siguiente acción exacta: al retomar, leer docs/revisiones/onboarding-veredicto.md y paywall-veredicto.md (puede que ya tengan el resultado de esa tercera pasada); si siguen NO LISTA, decidir con el usuario si se sigue puliendo o se avanza a Sesión 5 dejándolo anotado como pendiente (mismo criterio ya usado con la landing).

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
- Ruta de diseño: propuesta propia (RUTA 1 del 54) — el usuario eligió "Propón tú el estilo"
- Comparativa: `direcciones-abc.html` (raíz, archivada en docs/revisiones/direcciones-abc-375.png) — 3 fusiones de líderes (Structured #1 + Tiimo + banco 54), verificada
- ELEGIDA: Opción B — "Calma Clara" (Clínica humana, banco 54 dir. 5, adaptada) — Gantari (display) + Atkinson Hyperlegible (body, legibilidad TDAH/dislexia) · acento teal #0F766E · 2ª nota mandarina #D97E00 solo en racha/medallas · fondo #F4F7F6 · superficie #FDFEFD · texto #22302C/#5B6D67 · radius 16/12 · dispositivo: duotone de marca
- Tour (mockup HTML pre-código, NINGUNA pantalla real construida todavía): `vista-previa-app.html` (raíz, archivado en docs/revisiones/vista-previa-app-375.png) — 4 vistas de ejemplo con el estilo B, aprobadas por el usuario
- Registro anti-repetición: paleta teal #0F766E + par Gantari/Atkinson Hyperlegible → vetados para el próximo proyecto del SO
- Siguiente paso técnico (Sesión 3): escalar proyecto Next.js y materializar el brand kit de FICHA-ARTE.md en `app/globals.css` (10-DESIGN-TOKENS.md, @theme) ANTES de la primera pantalla real

## Avatar y venta (Sesión 1)
- FICHA-AVATAR.md: existe — BORRADOR (≥10 frases VoC con fuente "reseñas aportadas por el usuario"; falta que el usuario la apruebe explícitamente)
- Resumen: joven 18-35 LATAM/Android con TDAH o función ejecutiva débil · dolor #1 "pagar por repetir una tarea diaria" · deseo #1 "rutinas gratis, sin anuncios" · nivel de consciencia: problem-aware · sofisticación: alta (mercado saturado de productividad)
- Landing: pendiente — sigue estructura canónica del 19 (Sesión 3)

## Estrategia de monetización (Sesión 1 — DECIDIDA, ya venía del resumen del usuario)
- Modelo: Hard paywall tras onboarding, con 7 días de prueba gratuita (dato del usuario: trials de 7 días convierten 70% mejor que de 3 días)
- Justificación: la competencia ya probó este modelo con éxito (Structured); el diferenciador no es el modelo de paywall sino el precio PPP y la paridad Android
- Trial: 7 días
- Pricing: US$4.99/mes · US$29.99/año (mostrado como ~US$2.49/mes)

## Gamificación y retención (pendiente — Sesión 4/5)
- Mecánicas elegidas (del propio resumen del usuario): rachas, medallas de logro, % de progreso diario/mensual, ciclos de planificación de 90 días (reinicios)
- Primera victoria que celebra el onboarding (<5 min, del resumen): elegir plantilla "Rutina de Mañana Exitosa" → línea de tiempo lista con 1 toque, sin escribir nada

## Secuencia maestra de construcción (NO saltar)
- Estado de la secuencia: dirección visual aprobada (Opción B) · landing, onboarding, paywall y login con su código escrito y funcionando en local, cada uno a la espera de su veredicto final del revisor (ver Problemas conocidos) · ninguno con veredicto "LISTA" cerrado todavía
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app`
- Landing: código hecho, auditoría técnica en verde — su pantalla principal del carrusel sigue con placeholders honestos (pendiente de las capturas reales de la app en Sesión 5)
- Onboarding: código hecho (4 preguntas + loading personalizado), probado en navegador de punta a punta, auditoría técnica en verde — revisor-visual corriendo
- Paywall: código hecho (headline dinámico, timeline del trial, planes, CTA), probado en navegador, auditoría técnica en verde — revisor-visual corriendo
- Login/Auth: código hecho (magic link con estados enviando/enviado/reenvío + botón Google), probado en navegador — el envío real (Supabase Auth) NO está conectado todavía, es estado local simulado; se conecta en Sesión 6
- App interna: por construir (Sesión 5)
- Servicios externos: por construir — GitHub/Vercel/Hotmart/Supabase Auth (Sesión 6)

## Puertas de etapa (aprobación final antes de dar cada pantalla por terminada)
- Dirección de arte: aprobada por el usuario — 2026-11-02
- Landing: código hecho, revisor-visual NO LISTA (placeholders del producto real pendientes)
- Onboarding: código hecho, revisor-visual en curso
- Paywall: código hecho, revisor-visual en curso
- Login/Auth: código hecho, pendiente de revisor-visual (pantalla secundaria del funnel)
- App interna: por construir
- Servicios externos: bloqueados hasta Sesión 6

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: Next.js App Router — decidido 2026-11-02. Razón: landing con SEO (tráfico orgánico vía TikTok/Reels + búsqueda) integrada con onboarding/paywall/login/app en un solo proyecto desplegable; regla del stack del SO ("landing integrada/SEO → Next.js; en duda → Next.js").
- Stack: Next.js + almacenamiento local (IndexedDB/localStorage) para el MVP offline-first; sin Supabase para datos (no hay sync en la nube todavía, por decisión explícita del propio resumen del usuario)
- Auth: magic link por email (passwordless), modelo "Hotmart-first" de 26-AUTH-MODERNO.md — el webhook de Hotmart crea el usuario, el primer login es por correo. Google OAuth como secundario. UI construida en Sesión 4 con estado local simulado; Supabase Auth se conecta recién en Sesión 6
- Features del MVP (del resumen, ya priorizadas):
  1. Línea de tiempo visual vertical 24h
  2. Tareas y rutinas recurrentes gratis desde el día uno
  3. Almacenamiento local + notificaciones nativas
- Modelo de IA: ninguno en el MVP (la app no usa IA — es un planificador visual, no generativo)

## Sesiones completadas ✅
- Sesión 1 — Validación (aportada por el usuario) + FICHA-AVATAR (borrador) + FICHA-MODELO (con evidencia web real) + monetización decidida + arquitectura decidida + Plan Maestro presentado y aceptado
- Sesión 2 — Identidad visual: comparativa A/B/C, elección del usuario (Opción B "Calma Clara"), tour aprobado, FICHA-ARTE.md cerrada

## Sesión en progreso 🔧
- Sesión 4 — Onboarding, paywall y login: código de las 3 pantallas hecho y probado en navegador de punta a punta, auditoría técnica en verde. Falta leer el veredicto del revisor-visual (corriendo en segundo plano) para onboarding y paywall, y corregir si hace falta.

## Próximas sesiones 📋
- Sesión 5: App interna (línea de tiempo + rutinas) — y de paso, volver a la landing a montar sus screenshots reales
- Sesión 6: Integraciones reales (GitHub, Vercel, Supabase Auth, Hotmart, dominio) y seguridad

## Problemas conocidos ⚠️
- Veredicto de la pantalla "landing" (docs/revisiones/landing-veredicto.md, 2026-11-02): NO LISTA — Usabilidad 27/40, Craft 13/20, Copy 16/20. Causa raíz principal: el hero y el carrusel "La app por dentro" usan placeholders honestos (cámara + texto) porque la app real todavía NO existe (se construye en Sesión 5). Defectos menores ya corregidos: CTA del plan mensual, estadística sin fuente, duotone en chips. Pendiente: al cerrar Sesión 5, montar screenshots reales y relanzar el revisor para el veredicto final.
- Veredictos de "onboarding" y "paywall": pendientes de leer (revisor-visual corriendo en segundo plano al cerrar esta sesión).
- Login: la pantalla está construida pero el envío real del magic link (Supabase Auth) es un mock local — se conecta de verdad en Sesión 6. No declarar el login "funcional de punta a punta" hasta esa sesión.
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe de Structured (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy (instalaciones estimadas + volumen de reseñas, con fuente y fecha). No bloquea el arranque porque la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Ninguna acción suya requerida ahora mismo
- [ ] Más adelante (no ahora): crear cuentas de Hotmart, Vercel, dominio, Supabase — se le avisará cuando llegue el momento (Sesión 6)

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Al retomar: leer los veredictos de onboarding/paywall si no se leyeron en esta sesión, y luego preguntar si arranca Sesión 5 (app interna).
