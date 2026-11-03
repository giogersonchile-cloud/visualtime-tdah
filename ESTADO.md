# ESTADO — VisualTime TDAH
Última actualización: 2026-11-02 | Sesión actual: 2

⏸️ CHECKPOINT — Última acción completada: Tour de la app construido con la Opción B ("Calma Clara") y entregado al usuario / Siguiente acción exacta: esperar su respuesta (1 me encanta / 2 ajustar / 3 repensar); si aprueba, cerrar FICHA-ARTE.md + tokens de 10-DESIGN-TOKENS.md y pasar a Sesión 3 (landing).

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

## Dirección de Arte (Sesión 2 — EN CURSO, pendiente de aprobación final del tour)
- FICHA-ARTE.md: NO creada todavía — se crea cuando el usuario apruebe el tour (paso siguiente)
- Ruta de diseño: propuesta propia (RUTA 1 del 54) — el usuario eligió "Propón tú el estilo"
- Comparativa: `direcciones-abc.html` en la raíz — 3 fusiones de líderes (Structured #1 + Tiimo + banco 54), verificada (fuentes por clase, sin emojis, mockups llenos)
- ELEGIDA: Opción B — "Calma Clara" (Clínica humana, banco 54 dir. 5, adaptada) — Gantari (display) + Atkinson Hyperlegible (body, legibilidad TDAH/dislexia) · acento teal #0F766E · fondo #F4F7F6 · superficie #FDFEFD · texto #22302C/#5B6D67 · radius 16/12 · dispositivo: duotone
- Tour (mockup HTML pre-código, NINGUNA pantalla real construida todavía): `vista-previa-app.html` — 4 vistas de ejemplo con el estilo B (Hoy, Onboarding, planes de precio, mecanismo) para que el usuario apruebe la dirección visual, nada más
- Siguiente: con el tour aprobado → FICHA-ARTE.md + tokens de 10-DESIGN-TOKENS.md → recién ahí se construyen las pantallas REALES (landing/onboarding/paywall/app) en código, cada una con su propio veredicto del revisor-visual antes de declararse lista

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
- Estado de la secuencia: dirección visual elegida (B), ninguna pantalla REAL construida en código todavía
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app`
- Landing: pendiente (Sesión 3)
- Onboarding: pendiente (Sesión 4)
- Paywall: pendiente (Sesión 4) — el mockup de ejemplo en el tour NO cuenta como construida
- Login/Auth: pendiente — decidir en Sesión 1 (hecho): sí hace falta cuenta mínima para atar la licencia/compra de Hotmart a un dispositivo, aunque los datos vivan localmente
- App interna: pendiente (Sesión 5)
- Servicios externos: pendiente — GitHub/Vercel/Hotmart (Sesión 6). Supabase probablemente NO se usa para datos (sin nube en el MVP); solo si hace falta verificar licencia

## Puertas de etapa (aprobación antes de avanzar)
- Dirección de arte: no aprobada todavía (esperando respuesta del usuario al tour)
- Landing: no iniciada
- Onboarding: no iniciada
- Paywall: no iniciada
- Login/Auth: no iniciada
- App interna: no iniciada
- Servicios externos: bloqueados

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: Next.js App Router — decidido 2026-11-02. Razón: landing con SEO (tráfico orgánico vía TikTok/Reels + búsqueda) integrada con onboarding/paywall/login/app en un solo proyecto desplegable; regla del stack del SO ("landing integrada/SEO → Next.js; en duda → Next.js").
- Stack: Next.js + almacenamiento local (IndexedDB/localStorage) para el MVP offline-first; sin Supabase para datos (no hay sync en la nube todavía, por decisión explícita del propio resumen del usuario); Supabase (o equivalente mínimo) solo si hace falta para auth + verificar licencia de Hotmart
- Features del MVP (del resumen, ya priorizadas):
  1. Línea de tiempo visual vertical 24h
  2. Tareas y rutinas recurrentes gratis desde el día uno
  3. Almacenamiento local + notificaciones nativas
- Modelo de IA: ninguno en el MVP (la app no usa IA — es un planificador visual, no generativo)

## Sesiones completadas ✅
- Sesión 1 — Validación (aportada por el usuario) + FICHA-AVATAR (borrador) + FICHA-MODELO (con evidencia web real) + monetización decidida + arquitectura decidida + Plan Maestro presentado y aceptado

## Sesión en progreso 🔧
- Sesión 2 — Identidad visual: comparativa A/B/C construida y verificada, usuario eligió Opción B, tour de la app construido y entregado. Falta la aprobación final del usuario sobre el tour.

## Próximas sesiones 📋
- Sesión 3: Página de ventas (landing) — usa la dirección B ya fijada
- Sesión 4: Onboarding, paywall y login

## Problemas conocidos ⚠️
- El mockup HTML del tour (`vista-previa-app.html`) incluye una vista de planes de precio de ejemplo — NO es la pantalla de paywall real construida en código; esa pantalla se construye en Sesión 4 y pasará su propio veredicto del revisor-visual (docs/revisiones/paywall-veredicto.md) antes de declararse lista.
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe de Structured (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy (instalaciones estimadas + volumen de reseñas, con fuente y fecha). No bloquea el arranque porque la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Responder sobre el tour de la app: 1) me encanta, sigamos · 2) ajustar un detalle · 3) repensar el estilo
- [ ] Más adelante (no ahora): crear cuentas de Hotmart, Vercel, dominio — se le avisará cuando llegue el momento

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Pendiente decidir en Sesión 1 (implementación pura, no se le pregunta al usuario): si el login necesita backend mínimo (p.ej. Supabase solo para auth + verificación de licencia Hotmart) o si se resuelve con un código de licencia local — se resuelve al llegar a la Sesión 4/6.
