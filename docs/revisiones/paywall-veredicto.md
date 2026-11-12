# VEREDICTO revisor-visual — Paywall
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 28/40
Craft: 13/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [jerarquía tipográfica, pantalla completa] Siguen coexistiendo ~7 tamaños de texto (30/19/16/15/14/13/11px); los tamaños de "cuerpo" (13/14/15px) no se diferencian con intención entre sí, solo por reflejo accidental del elemento donde aparecen → consolidar en un único tamaño de cuerpo (14px) y dejar solo label (11px) + los dos héroes (19/30px) como jerarquía real de 4 niveles.
2. [identidad ownable, pantalla completa] Fuera del color de acento teal, esta pantalla concreta no exhibe ningún dispositivo visual propio (sin textura, ilustración o tratamiento firma) — el hairline y el check custom son pulido de componente compartido, no un detalle distintivo de ESTE paywall → sumar al menos un detalle ownable específico (ej. el duotone de marca aplicado a un ícono/ilustración de la línea de tiempo del trial).
3. [h7 código, bloque de planes] Confirmado en page.tsx: no existe ninguna llamada a localStorage — la elección de plan nunca se persiste entre visitas, siempre reinicia en "Anual" → guardar el plan elegido en localStorage y leerlo en el montaje inicial.
4. [fondo, esquinas superiores] La corrección de opacidad (40/30% → 55/45%) ya se percibe en el screenshot, pero las manchas siguen leyéndose como decoración de fondo tenue, al límite entre "funciona" y "se nota sin buscarlo" → si se vuelve a tocar, medir contraste real de las manchas contra --bg antes de dar por cerrado el defecto.
5. [bloque "Restaurar compra"] El estado "Buscando tu compra…" solo cambia el texto del botón, sin ningún ícono/spinner de carga — cumple el mínimo de h1 pero es fácil de perder en un vistazo rápido → agregar un ícono de loading inline junto al texto.
