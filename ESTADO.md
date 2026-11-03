# ESTADO — VisualTime TDAH
Última actualización: 2026-11-02 | Sesión actual: 1

⏸️ CHECKPOINT — Última acción completada: Sistema instalado, RESUMEN FINAL del usuario leído y guardado, FICHA-AVATAR y FICHA-MODELO creadas con evidencia real / Siguiente acción exacta: hacer la pregunta de referencia visual (B4) y presentar el Plan Maestro (B5) para aprobación del usuario.

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

## Dirección de Arte (Sesión 2 — pendiente)
- FICHA-ARTE.md: NO existe todavía
- ¿Hubo referencia visual del usuario?: por preguntar (B4, pendiente)

## Avatar y venta (Sesión 1)
- FICHA-AVATAR.md: existe — BORRADOR (ver archivo; tiene ≥10 frases VoC con fuente "reseñas aportadas por el usuario", falta que el usuario la apruebe)
- Resumen: joven 18-35 LATAM/Android con TDAH o función ejecutiva débil · dolor #1 "pagar por repetir una tarea diaria" · deseo #1 "rutinas gratis, sin anuncios" · nivel de consciencia: problem-aware · sofisticación: alta (mercado saturado de productividad)
- Landing: pendiente — sigue estructura canónica del 19

## Estrategia de monetización (Sesión 1 — DECIDIDA, ya venía del resumen del usuario)
- Modelo: Hard paywall tras onboarding, con 7 días de prueba gratuita (dato del usuario: trials de 7 días convierten 70% mejor que de 3 días)
- Justificación: la competencia ya probó este modelo con éxito (Structured); el diferenciador no es el modelo de paywall sino el precio PPP y la paridad Android
- Trial: 7 días
- Pricing: US$4.99/mes · US$29.99/año (mostrado como ~US$2.50/mes)

## Gamificación y retención (pendiente — Sesión 4/5)
- Mecánicas elegidas (del propio resumen del usuario): rachas, medallas de logro, % de progreso diario/mensual, ciclos de planificación de 90 días (reinicios)
- Primera victoria que celebra el onboarding (<5 min, del resumen): elegir plantilla "Rutina de Mañana Exitosa" → línea de tiempo lista con 1 toque, sin escribir nada

## Secuencia maestra de construcción (NO saltar)
- Estado de la secuencia: ninguna etapa construida aún
- Ruta aprobada: `/` → `/onboarding` → `/paywall` → `/login` → `/app`
- Landing: pendiente
- Onboarding: pendiente
- Paywall: pendiente
- Login/Auth: pendiente — decidir en Sesión 1 si hace falta cuenta dado que el MVP es 100% offline (se necesita igual para atar la licencia/compra de Hotmart a un dispositivo)
- App interna: pendiente
- Servicios externos: pendiente — GitHub/Vercel/Hotmart (Supabase probablemente NO se usa en el MVP: sin nube de datos; solo si se necesita verificar licencia)

## Puertas de etapa
- Landing: no iniciada
- Onboarding: no iniciada
- Paywall: no iniciada
- Login/Auth: no iniciada
- App interna: no iniciada
- Servicios externos: bloqueados

## Decisiones técnicas (NO re-discutir sin pedirlo el usuario)
- Framework: Next.js App Router — decidido 2026-11-02. Razón: landing con SEO (tráfico orgánico vía TikTok/Reels + búsqueda) integrada con onboarding/paywall/login/app en un solo proyecto desplegable; regla del stack del SO ("landing integrada/SEO → Next.js; en duda → Next.js").
- Stack: Next.js + almacenamiento local (IndexedDB/localStorage) para el MVP offline-first; sin Supabase en el MVP (no hay sync en la nube todavía, por decisión explícita del propio resumen del usuario)
- Features del MVP (del resumen, ya priorizadas):
  1. Línea de tiempo visual vertical 24h
  2. Tareas y rutinas recurrentes gratis desde el día uno
  3. Almacenamiento local + notificaciones nativas
- Modelo de IA: ninguno en el MVP (la app no usa IA — es un planificador visual, no generativo)

## Sesiones completadas ✅
(ninguna — apenas arrancando Sesión 1)

## Sesión en progreso 🔧
- Sesión 1 — Validación (ya aportada por el usuario) + AVATAR (ficha creada) + monetización (decidida) + arquitectura (decidida). Falta: pregunta de referencia visual (B4) y aprobación del Plan Maestro (B5) por el usuario.

## Próximas sesiones 📋
- Sesión 2: Identidad visual y sistema de diseño
- Sesión 3: Página de ventas

## Problemas conocidos ⚠️
- FICHA-MODELO.md: sin verificación directa de MRR/Stripe (TrustMRR/Sensor Tower no dieron cifra oficial); se usan señales proxy (instalaciones estimadas + volumen de reseñas) — documentado en la propia ficha, no bloquea el arranque porque la categoría ya está validada por el propio usuario.

## Pendientes del usuario (acciones que el usuario debe hacer)
- [ ] Responder la pregunta de referencia visual (B4)
- [ ] Aprobar el Plan Maestro (B5)
- [ ] Más adelante (no ahora): crear cuentas de Hotmart, Vercel, dominio — se le avisará cuando llegue el momento

## Notas para la próxima sesión
- El usuario entregó un RESUMEN FINAL — IDEA VALIDADA PARA CONSTRUIR en PDF: NO se re-valida ni se buscan alternativas. Se usa como contexto base.
- Pendiente decidir en Sesión 1 (implementación pura, no se le pregunta al usuario): si el login necesita backend mínimo (p.ej. Supabase solo para auth + verificación de licencia Hotmart) o si se resuelve con un código de licencia local.
