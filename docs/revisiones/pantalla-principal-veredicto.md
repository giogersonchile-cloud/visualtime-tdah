# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-03 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 29/40
Craft: 14/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Identidad visual, toda la pantalla] Sin dispositivo ownable visible (duotone/textura/ilustración de marca) — el acento teal + checks + chip mandarina no alcanza a diferenciarla de cualquier app de productividad genérica → aplicar el duotone de marca prometido en FICHA-ARTE (íconos duotone por bloque o en el header).
2. [Lista de bloques] Cero atajos/gestos para el usuario frecuente (sin swipe-to-complete, sin acciones en lote); cada bloque exige 1 tap y editar/borrar exige abrir un modal completo → agregar gesto swipe con fallback de tap.
3. [Modal Editar bloque → Eliminar] Tras el 2do tap de confirmación el bloque se borra sin opción de deshacer real (solo hubo confirmación previa, no reversión posterior) → mostrar toast con "Deshacer" ~5s antes de persistir el borrado.
4. [Toast de error "No se pudo guardar. Intenta de nuevo."] Mensaje genérico que no dice la causa (¿sin conexión?, ¿storage lleno?) → diferenciar el mensaje según el motivo real del fallo.
5. [Tarjeta de insight, debajo de la lista] La superficie "hundida" (surface-2 + inset shadow) es casi imperceptible junto a las cards blancas de arriba a 375px → subir el contraste de --surface-2 o reforzar la sombra inset.
