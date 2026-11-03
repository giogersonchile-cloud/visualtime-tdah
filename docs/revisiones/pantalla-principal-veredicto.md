# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-03 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 30/40
Craft: 15/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Formulario de edición de bloque, botón "Eliminar bloque"] eliminarBloque() se ejecuta al primer tap, sin confirmación ni opción de deshacer (page.tsx líneas 113-118) → agregar confirmación (doble-tap/diálogo) o un toast con "Deshacer" tras borrar.
2. [Todo el código, animaciones] useReducedMotion() solo se usa en el anillo de progreso (línea 334); PorcentajeAnimado, Toast, FormularioBloque y CelebracionRacha ignoran la preferencia del sistema → condicionar sus animate/transition a reducedMotion en los 4 componentes.
3. [Fondo general y cards de la lista] la profundidad es débil: solo 2 tonos planos (bg y surface/surface-2), el nivel "hundido" que define FICHA-ARTE.md no aparece en esta pantalla → dar más presencia a la sombra tintada de las cards o usar superficie hundida para separar el insight del resto.
4. [Heurística 7 — flexibilidad] sin atajos de teclado ni gesto alternativo para completar un bloque (solo tap en el botón completo); el experto no tiene vía rápida → agregar soporte de teclado (Enter/Espacio con foco) o swipe-to-complete.
5. [Header, chip de racha] el contador de racha cambia de valor tras marcar un bloque pero no tiene aria-live, y cada fila de rutina obliga a distinguir entre tocar la card completa vs. el lápiz (dos hit-areas contiguas) → agregar aria-live="polite" al chip de racha y aumentar la separación visual entre la acción de completar y la de editar.
