# VEREDICTO revisor-visual — landing
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 32/40
Craft: 15/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Header del hero, toda la navegación, components/landing/Hero.tsx líneas 70-81] Sigue sin existir ningún anchor de navegación rápida a "Precios"/"FAQ" visible antes de hacer scroll — el header solo tiene marca + "Entrar". Confirmado en código: ningún cambio desde la ronda anterior. Un usuario que llega buscando el precio debe scrollear ~5000px sin atajo → agregar un link de ancla "Ver precios" junto a "Entrar".
2. [Página completa, ~7500px de alto] La landing acumula 10 secciones largas sin ningún atajo de navegación lateral/progreso ni los anchors del defecto #1 → sigue dependiendo 100% del scroll lineal. Considerar indicador de progreso de scroll sutil.
3. [EcoChip/LogoMark, components/ui/Marca.tsx] A resolución nativa el dispositivo ownable (silueta sólida en diagonal, offset 22%/opacidad 80%) se lee correctamente como sello repetido en logo/chips/badges — mejora confirmada en código respecto a la versión soft-light anterior; en el screenshot comprimido a 375×7516 sigue sin poder verificarse con nitidez a 44px. No bloqueante, pero pedir un recorte nativo de un IconChip para cerrar la verificación visual del Eje 3.
4. [Sección Oferta / planes, app/page.tsx] La landing mantiene 10 secciones largas (Hero, Problema, Agitación, Mecanismo, AppPorDentro, Oferta con 2 planes, Garantía, FAQ, CTA final, Footer) — cada una individualmente respeta los límites de ítems, pero no hay forma de saltar directo a comprar sin leer todo; combina con el defecto #1.
5. [FICHA-AVATAR.md / proceso] Resuelto desde la ronda anterior: la ficha pasó de BORRADOR a APROBADA (2026-11-13) — ya no es bloqueante de proceso para esta pantalla.

Mejoras verificadas desde el veredicto anterior (32/40, 15/20, copy 16/20): (1) FICHA-AVATAR.md pasó a estado APROBADA por el usuario — se cierra el defecto de proceso #2 de la ronda anterior. (2) Se agregó la leyenda "Capturas reales de la app, sin retocar" bajo el título de AppPorDentro (components/landing/AppPorDentro.tsx líneas 90-96, confirmado en código; el screenshot no se regeneró así que no se ve en la imagen, pero el texto en código es claro y honesto — no inventa una cifra ni un testimonio falso). Esto saca el eje "especificidad y prueba" de 2/4 a 3/4: las capturas reales del producto + la leyenda que invita a verificarlas con la vista, sumadas a la garantía nombrada, constituyen una prueba legítima aunque no reemplace un testimonio de tercero real — Copy total sube de 16/20 a 17/20 y ya no hay ningún eje ≤2, por lo que el umbral de Rúbrica 4 (≥16/20 y ningún eje ≤2) queda satisfecho. Los demás defectos (sin anchors de navegación, landing larga sin atajos) NO fueron tocados en esta ronda — Usabilidad y Craft quedan en 32/40 y 15/20, sin cambios, por lo que el gate doble (≥36/40 y ≥16/20) sigue sin cumplirse y el veredicto se mantiene NO LISTA.
