# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 28/40
Craft: 13/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Fila de cada bloque de la rutina] Sigue acumulando 6 elementos visuales distintos (hora, check, título, duración, ícono ↔ de deslizar, botón editar) en 375px — el cambio de GripVertical a MoveHorizontal resuelve la promesa equivocada de "reordenar" (bien, heurística 4 mejora ahí), pero no resuelve la densidad de la fila, que se sigue sintiendo apretada (eje 8 minimalismo / eje 1 jerarquía) → fusionar el ícono de deslizar dentro del botón de editar o quitarlo del todo (la tarjeta entera ya es draggable sin necesidad de un ícono dedicado).
2. [Bloques completados (verdes), borde/sombra derecha] El borde junto con el box-shadow sigue generando un remate oscuro irregular en el extremo derecho de los dos bloques verdes que no aparece en el bloque blanco pendiente — defecto de encaje óptico (eje 5) señalado en la ronda anterior y aún presente sin cambios → igualar el renderizado de sombra/borde entre estado completado y pendiente, revisando cómo el radius-card interactúa con box-shadow sobre fondo bg-[var(--surface-2)].
3. [Identidad: check de completado, badge de racha] El dispositivo ownable (duotone "eco de marca") sigue viviendo solo en el chip del insight inferior — el check verde y el badge de racha naranja (arriba a la derecha) son formas planas sin el eco de marca — defecto repetido sin cambios desde la ronda 7 → extender el EcoChip (o una versión reducida) al círculo de completado y/o al badge de racha para que el sello se perciba como sistema.
4. [Header de lista "+ Agregar" vs. botón editar (lápiz) de cada fila] Dos acciones secundarias del mismo nivel con tratamientos muy distintos (texto+ícono sin fondo vs. botón cuadrado con borde) — inconsistencia de componente sin resolver desde la ronda anterior → unificar el estilo (ambas chip con borde, o ambas texto+ícono).
5. [Barra de navegación inferior] No hay transición animada al cambiar de tab activo (solo cambia color/fondo de golpe vía clases CSS) — una de las 7 animaciones baseline (transición de tabs) falta, verificado en components/app/TabBar.tsx → agregar una transición de color/fondo con motion (150-200ms) al marcar el tab activo.
