# VEREDICTO revisor-visual — Paywall
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 33/40
Craft: 14/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [craft eje2-profundidad, fondo esquinas superiores] Pese a subir la opacidad dos veces (40→55% / 30→45%), las manchas de fondo siguen sin percibirse en el screenshot a 375px — la primera vista se ve como fondo blanco plano, sin el 2º nivel de profundidad prometido en FICHA-ARTE → medir el contraste real de la mancha contra --bg con un sampler de color (no a ojo) y, si sigue <1.05:1, agrandar el radio del blob o bajar el blur en vez de seguir subiendo opacidad.
2. [identidad ownable, cerca del CTA] El EcoChip junto a "Cancela cuando quieras" es una mejora real pero queda como un detalle menor de 26px al lado de un texto de apoyo — fuera de eso, la pantalla completa sigue leyéndose como "acento teal + componentes compartidos" sin un segundo punto de identidad propio de ESTE paywall → aplicar el mismo tratamiento duotone a los nodos de la timeline del trial (hoy/día 6/día 7), que es el elemento más narrativo y exclusivo de esta pantalla.
3. [usabilidad h1, bloque "Restaurar compra"] El estado "Buscando tu compra…" sigue siendo solo un cambio de texto, sin ícono de carga — en un vistazo rápido (el usuario típico de esta app, con TDAH, escanea en lugar de leer) es fácil no notar que algo está pasando → agregar un ícono spinner animado de 14px junto al texto mientras `restauro === 'buscando'`.
4. [densidad general, toda la pantalla] La pantalla necesita 2 capturas completas a 375px para verse entera: título + 2 párrafos + tarjeta de valor (3 checks + texto + timeline de 3 nodos) + 2 tarjetas de plan + CTA + garantía + restaurar + sello de pago — cada bloque se justifica individualmente pero el recorrido total es largo para un avatar con sobrecarga cognitiva declarada en FICHA-AVATAR.md → fusionar "Hecho con tus N respuestas" dentro de la misma línea que el párrafo emocional siguiente, o mover el sello "Pago seguro con Hotmart" junto a la garantía en una sola línea de confianza.
5. [copy eje4-oferta, bloque de garantía] "Garantía de 15 días" conviviendo con una prueba de "7 días" sin aclarar la relación entre ambos plazos puede generar una duda rápida ("¿son 7 o son 15?") justo en el texto más cercano al CTA → agregar 2-3 palabras que distingan los plazos, ej. "Garantía de 15 días tras el primer cobro".
