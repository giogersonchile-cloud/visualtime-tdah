# VEREDICTO revisor-visual — landing
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/landing-375.png
Usabilidad: 29/40
Craft: 14/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA

Top defectos:
1. [Logo header + IconChip en todas las secciones] El "eco de marca" (silueta --accent-2 offset detrás del ícono/logo) es demasiado sutil en el tamaño de landing (44px, offset 12%, opacidad 45%): en el screenshot a 375px se lee como una sombra genérica, no como un dispositivo ownable reconocible — solo se percibe claramente en los screenshots de la app embebidos (ej. logo de onboarding.jpg), no en los chips propios de la landing → subir opacidad a ~70-80% y el offset a 16-20% en `EcoChip`/`LogoMark` cuando se usan a 44px o menos, o agrandar el chip. Mantiene EJE 3 de craft en 2 en vez de 3.
2. [Sección Oferta, stack de valor y FAQ] Cero prueba social real (testimonio, caso, demo) en toda la página — el único elemento de "prueba" es la garantía misma; aceptable en pre-lanzamiento pero baja el Eje 2 de copy (especificidad y prueba) a 2/4, por debajo del umbral de "ningún eje ≤2" de la Rúbrica 4 → agregar al menos 1 testimonio beta real o, si no existe, una leyenda explícita "capturas reales de la app, sin retocar" junto al carrusel para reforzar la honestidad como prueba.
3. [Raíz del proyecto] FICHA-AVATAR.md sigue en estado BORRADOR, sin aprobación explícita del usuario (línea 1 y línea 72 de la ficha) — el SO prohíbe escribir copy de venta antes de esa aprobación; el copy ya está escrito y es de buena calidad, pero el gate de proceso sigue abierto → cerrar la aprobación de la ficha con el usuario antes de declarar la landing lista para vender.
4. [CTA del hero vs CTA de la card Anual en Oferta] El verbo se mantiene pero el texto exacto cambia ("Empezar gratis 7 días" vs "Empezar mis 7 días gratis") — pequeña variación de redacción entre repeticiones del mismo CTA que un ojo entrenado nota (heurística 4 de consistencia, eje 5 de copy) → unificar a una sola redacción en todas las instancias.
5. [Toda la página] Heurística 7 (flexibilidad/eficiencia): más allá del scroll-snap del carrusel y el sticky-CTA de 2 estados, no hay ningún atajo para el usuario que repite visita (sin anchors de teclado documentados, sin "saltar a precios" visible fuera del sticky bar en mobile) → agregar un ancla de navegación rápida a "Precios"/"FAQ" en el header o un botón "Ver precios" visible antes del scroll, no solo en el sticky.

Mejoras verificadas desde el veredicto anterior (27/40, 13/20): el hero y el carrusel "Así se ve por dentro" ahora usan screenshots reales (hoy.jpg, onboarding.jpg, progreso.jpg) en vez de placeholders grises; el "eco de marca" sustituye al duotone soft-light imperceptible (visible, aunque aún sutil — ver defecto 1); el dato "58% agotamiento" sin fuente fue retirado del copy de Agitación; el CTA de la card Mensual ya no usa "Elegir mensual" sino el mismo verbo del resto de la página.
