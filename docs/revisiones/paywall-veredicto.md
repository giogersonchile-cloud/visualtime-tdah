# VEREDICTO revisor-visual — Paywall
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 29/40
Craft: 15/20
Copy (si vende): 17/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [tarjetas "Anual"/"Mensual", bloque de planes] No tienen whileTap ni ningún feedback táctil animado al tocarlas para elegir plan (en el código solo el CTA final usa whileTap scale 0.97) — rompe la baseline de movimiento obligatoria (tap <150ms en TODO elemento tocable) → agregar whileTap={{ scale: 0.97 }} a ambos botones de plan.
2. [fondo, esquinas superiores] El mesh de acento (blur 40px, opacidad 40%/30%) mejoró frente a la ronda anterior y ya se percibe, pero sigue siendo tenue a 375px — el fondo se lee casi plano para un usuario que no lo busca → subir opacidad a ~55-60% o acercar las manchas al viewport visible.
3. [jerarquía tipográfica, pantalla completa] Siguen coexistiendo ~7 tamaños de texto (30/19/16/15/14/13/11px); el precio ya bajó de 22 a 19px (mejora correcta), pero los tamaños de "cuerpo" (13/14/15px) no se diferencian con intención entre sí → consolidar en un solo tamaño de cuerpo (14px) y dejar solo label (11px) + los dos héroes (19/30px) como jerarquía real.
4. [h7 código, selección de plan] No se persiste la última elección de plan entre visitas (siempre default "anual", sin localStorage) — gap menor de flexibilidad para el usuario recurrente, no bloqueante.
5. [eje2 copy "especificidad y prueba", value stack] Correcto no inventar cifras sin fuente; el rótulo "CON TU PRUEBA GRATIS DE 7 DÍAS" + la línea de dolor nuevo ya aportan especificidad real sobre el mecanismo del trial (día 6/día 7/precio exacto), pero sigue sin ningún ancla de prueba externa (ni 1 testimonio, ni rating) — aceptable por ahora dado que no hay usuarios reales todavía; anotar como deuda para cuando exista al menos 1 testimonio beta verídico.
