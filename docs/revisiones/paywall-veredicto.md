# VEREDICTO revisor-visual — Paywall
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 28/40
Craft: 15/20
Copy (si vende): 14/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [headline + value stack, justo debajo] La promesa "Tu rutina ya es tuya, gratis" convive sin ninguna etiqueta con una lista de 3 checks que en realidad son funciones PAGAS (línea de tiempo visual, rutinas sin límite, alarmas) — un usuario cualquiera no entiende de un vistazo qué es gratis y qué es premium → agregar un rótulo tipo "Con Premium también tienes:" encima de los 3 checks para separar lo gratis (su rutina ya armada) de lo que desbloquea el pago.
2. [eje emoción del copy, pantalla completa] El copy del paywall es puramente transaccional (precio/trial/garantía) y nunca nombra ni agita el dolor real del avatar (★ "tienes que pagar para la rutina, y eso me parece una injusticia", "me cobraron antes de los 7 días de prueba") antes de resolverlo — eje emoción queda en 2/4, bajo el umbral mínimo exigido aunque el total de copy no pasara de todos modos → sumar 1 línea breve con la frase VOC del avatar cerca del value stack (ej. "Sin trucos: nunca más pagarás por lo básico").
3. [fondo, pantalla completa] El mesh gradient de acento en las esquinas (radial-gradient al 16%/12% de opacidad, código línea 72-74) es casi imperceptible en el screenshot renderizado a 375px — el fondo se lee prácticamente plano, el 3er nivel de profundidad no se nota a simple vista → subir la opacidad o acercar el radio del gradiente a la zona visible del viewport.
4. [jerarquía tipográfica, pantalla completa] Hay ~5-6 tamaños de texto distintos en la pantalla (30/22/16/15/13/11px) cuando la regla del sistema es máximo 3 — el precio del plan (22px bold) compite visualmente con el titular (30px bold) al entrecerrar los ojos → bajar el tamaño del precio a ~18-19px para que el titular quede como único nivel héroe.
5. [h7 flexibilidad, código] No hay memoria de la última elección de plan entre sesiones (siempre default "anual" sin persistir en localStorage) ni atajo alguno para el usuario recurrente → guardar la última selección y preseleccionarla en la siguiente visita; no bloqueante, mejora menor.
