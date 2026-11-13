# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 28/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Lista de bloques, ícono de "agarre" al final de cada fila] GripVertical es la convención universal de "arrastrar para reordenar" — aquí se usa como pista de "deslizar para completar"; un usuario que reconoce el ícono esperará reordenar la lista y se confundirá cuando solo alterne el estado completado (rompe heurística 4, consistencia con estándares) → reemplazar por un ícono/affordance propio de swipe (flecha doble horizontal o borde con gradiente direccional), nunca el grip de reordenar.
2. [Bloques completados (verdes), borde derecho] El borde/sombra teal del bloque completado se ve como una protuberancia oscura irregular en el extremo derecho, distinta del bloque pendiente (blanco, sin ese efecto) — el radio no "lee" igual entre los dos estados en el mismo screenshot → igualar tratamiento de sombra/borde entre completado y pendiente; revisar cómo se renderiza el radius-card con el fondo verde vs. blanco.
3. [Fila de cada bloque] Con hora + círculo-check + título + duración + ícono de grip + botón de editar externo, la fila acumula 6 elementos visuales distintos en 375px — se siente apretada y debilita el principio "cada elemento se gana su lugar" (eje 8/minimalismo) → fusionar el grip dentro del botón de editar, o quitarlo si toda la tarjeta ya es arrastrable sin necesidad de un ícono dedicado.
4. [Identidad visual / chip del insight] El dispositivo ownable (duotone de marca, EcoChip) sigue apareciendo en un único lugar de la pantalla (el ícono del insight) — defecto señalado en la ronda anterior, sin cambios desde entonces → extender el eco de marca al check de completado o al badge de racha para que se perciba como sistema, no como detalle aislado.
5. [Header de lista: "+ Agregar" vs. botón "editar" (lápiz)] Ambas son acciones secundarias del mismo nivel jerárquico pero con tratamientos visuales muy distintos (texto+ícono sin fondo vs. botón cuadrado con borde) — rompe "mismo tipo de componente = misma apariencia en toda la pantalla" → unificar el estilo de las acciones secundarias (ambas chip, o ambas texto+ícono).
