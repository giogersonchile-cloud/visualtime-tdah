# VEREDICTO revisor-visual — landing
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 28/40
Craft: 15/20
Copy (si vende): 15/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [app/page.tsx línea 119, card Anual de Oferta] El reporte de esta ronda afirma que "ambos CTAs usan ya el mismo texto exacto vía CTA_LABEL" — FALSO al verificar el código: `mensual.ctaLabel` sí usa `CTA_LABEL` ("Empezar gratis 7 días"), pero `anual.ctaLabel` sigue hardcodeado a "Empezar mis 7 días gratis", una redacción distinta para la misma acción en la misma sección, una tarjeta junto a la otra → cambiar `anual.ctaLabel: 'Empezar mis 7 días gratis'` por `CTA_LABEL` igual que el resto. Baja heurística 4 (consistencia) y eje 5 de copy (dirección a una acción).
2. [Sección Oferta / Garantía / FAQ] Sigue sin existir ninguna prueba social real (testimonio, caso, demo) — el único elemento de prueba es la garantía misma; Eje 2 de copy (especificidad y prueba) permanece en 2/4, por debajo del umbral de "ningún eje ≤2" de la Rúbrica 4 → agregar ≥1 testimonio beta real, o una leyenda explícita "capturas reales de la app, sin retocar" junto al carrusel si de verdad no existe ningún testimonio todavía.
3. [Raíz del proyecto] FICHA-AVATAR.md sigue en estado BORRADOR sin aprobación del usuario (línea 1 y línea 72) — el SO prohíbe vender copy de venta antes de esa aprobación; sigue siendo el mismo gate de proceso abierto desde la ronda anterior → cerrar la aprobación con el usuario antes de declarar la landing lista para vender.
4. [Header del hero, toda la navegación] No existe ningún anchor de navegación rápida a "Precios"/"FAQ" visible antes de hacer scroll — solo aparece tras salir del hero vía StickyCtaMobile (que primero apunta a #oferta y cambia de label después de verla, buena mejora, pero sigue sin cubrir el caso de "quiero ver precios ya" en el primer viewport) → agregar un link de ancla "Ver precios" junto a "Entrar" en el header, o dejarlo anotado como decisión consciente en ESTADO.md.
5. [EcoChip / LogoMark, components/ui/Marca.tsx] El ajuste de opacidad 70-80% y offset ~22% es correcto en el código y debería resolver el defecto de la ronda anterior, pero el screenshot disponible (375×7516, muy comprimido en el visor) no permite confirmar visualmente con certeza que el sello se lea como dispositivo ownable a 44px en vez de sombra genérica → pedir una captura recortada/ampliada de un IconChip de la sección Problema a resolución nativa para cerrar la verificación visual del Eje 3 antes de dar el craft por definitivo.

Mejoras verificadas desde el veredicto anterior (29/40, 14/20, copy 16/20): el eco de marca se refuerza en código (opacidad 45%→80%, offset 12%→22%) en EcoChip y LogoMark; el CTA de la card Mensual de Oferta ya usa la misma constante CTA_LABEL que el resto de la página; el StickyCtaMobile gana un segundo estado que apunta primero a "#oferta" antes de mostrar el CTA comercial, dando algo más de flexibilidad de navegación en mobile. Pendiente real: la card Anual de Oferta NO fue corregida pese a lo reportado (sigue con texto propio distinto), por lo que el defecto de consistencia de CTAs persiste sin resolver.
