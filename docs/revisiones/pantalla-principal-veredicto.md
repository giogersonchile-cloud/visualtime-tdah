# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 31/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Modal "Editar bloque" → Eliminar] La confirmación sigue siendo el MISMO botón en la MISMA posición (solo cambia borde/fondo) — para el usuario TDAH objetivo, impulsivo por diseño de la audiencia, dos taps rápidos en el mismo punto siguen siendo un borrado accidental plausible → mover el control de confirmación a una posición/tamaño distinto, o insertar un breve delay/ícono de advertencia antes de habilitarlo.
2. [Header de la lista, botón "+ Agregar"] Sigue en `px-2` (8px) pese a señalarse en la ronda anterior — el área de tap mide 44px pero se SIGUE VIENDO angosta junto al resto de controles → subir a `px-3`/`px-4` como ya se pidió.
3. [Lista de bloques, todo el cuerpo] El nuevo gesto de swipe-to-complete no tiene NINGÚN indicio visual de que existe (ni borde parcial, ni ícono de arrastre) hasta que el usuario lo descubre por accidente — viola la regla de "si el usuario no sabe que existe un gesto, no existe" → agregar una pista sutil permanente (p.ej. un borde curvo asimétrico o un ícono de grip de 2-3px) en el extremo del bloque.
4. [Identidad visual] El dispositivo ownable (duotone de marca) sigue limitado al chip del insight y al badge de racha — el check de completado y los íconos de la nav inferior continúan siendo Lucide plano, sin tratamiento → extender el eco de marca al menos al check del bloque completado (defecto ya señalado en ronda anterior, sin cambios).
5. [Lista de bloques] Con el drag activo, el botón "Editar" (lápiz) queda fijo al costado mientras el bloque se desplaza con el drag — no se verificó visualmente que el layout no se rompa a mitad de arrastre (el lápiz podría quedar visualmente "flotando" separado del bloque que se mueve) → confirmar en captura intermedia del gesto, no solo en reposo.
