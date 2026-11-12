# VEREDICTO revisor-visual — landing
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Sección Oferta / Garantía / FAQ] Sigue sin existir ninguna prueba social real (testimonio, caso, dato de uso) — el único elemento de prueba es la garantía misma. Eje 2 de copy (especificidad y prueba) queda en 2/4, lo que viola el umbral "ningún eje ≤2" de la Rúbrica 4 aunque el total (16/20) pase el piso → agregar ≥1 testimonio beta real o, si de verdad no existe ninguno todavía, una leyenda explícita tipo "capturas reales de la app, sin retocar" junto al carrusel de AppPorDentro.
2. [Raíz del proyecto, FICHA-AVATAR.md línea 1 y 3] La ficha sigue en estado BORRADOR sin aprobación explícita del usuario (10 frases VoC con fuente "reseñas de apps competidoras recopiladas por el usuario", pendiente de validar) — el SO prohíbe vender copy de venta derivado de una ficha no aprobada → cerrar esa aprobación con el usuario antes de declarar la landing lista para vender.
3. [Header del hero, toda la navegación] Sigue sin existir ningún anchor de navegación rápida a "Precios"/"FAQ" visible antes de hacer scroll — solo aparece cobertura parcial tras salir del hero vía StickyCtaMobile (components/landing/ui.tsx, que primero apunta a #oferta). Un usuario que llega buscando el precio debe scrollear ~5000px sin atajo → agregar un link de ancla "Ver precios" junto a "Entrar" en el header (components/landing/Hero.tsx).
4. [EcoChip / LogoMark, components/ui/Marca.tsx] El ajuste de opacidad 70-80%/offset ~22% está en el código, pero el screenshot full-page a 375×7516 (muy comprimido en el visor) no permite confirmar con certeza que el sello se lea como dispositivo ownable a 44px en vez de sombra genérica → pedir una captura recortada de un IconChip de la sección Problema a resolución nativa para cerrar la verificación del Eje 3 de craft.
5. [Página completa, ~7500px de alto] La landing acumula 10 secciones largas sin ningún atajo de navegación lateral/progreso — cada sección individualmente respeta el límite de ítems (Problema 4, Agitación 3, Solución 3, FAQ ~5), pero el recorrido total es largo para mobile y depende 100% del scroll → considerar un indicador de progreso de scroll sutil o, como mínimo, los anchors del defecto #3 para que no sea 100% lineal.

Mejoras verificadas desde el veredicto anterior (28/40, 15/20, copy 15/20): el CTA de la card "Anual" de Oferta (app/page.tsx línea 119, prop anual.ctaLabel) ahora usa CTA_LABEL exactamente igual que mensual.ctaLabel y el resto de CTAs de la página — el defecto #1 de la ronda anterior (inconsistencia de texto entre CTAs repetidos) queda resuelto, confirmado leyendo el código. Esto sube la heurística 4 (consistencia) de usabilidad y el eje 5 de copy (dirección a una acción, un solo tipo de acción con el mismo texto en toda la página) respecto a la ronda anterior. Los demás defectos reportados antes (ficha de avatar sin aprobar, sin prueba social real, falta ancla de navegación rápida) NO fueron tocados en esta ronda — son decisiones de proceso/contenido pendientes del usuario, no de craft visual, tal como se indicó en el encargo de esta revisión.
