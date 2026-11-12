# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 28/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Identidad visual, toda la pantalla] Sigue sin dispositivo ownable: FICHA-ARTE promete duotone de marca en íconos/chips (dirección "Clínica humana") pero check, flama y lápiz son Lucide planos estándar, indistinguibles de cualquier app de productividad → aplicar tratamiento duotone a los íconos clave del M0 (check completado, flama de racha, ícono de insight).
2. [Tarjeta de insight, debajo de la lista] La superficie "hundida" (--surface-2 + inset shadow) sigue imperceptible a 375px — pendiente explícito de la ronda anterior que NO se corrigió → subir el contraste real de --surface-2 o reforzar la sombra inset hasta que se note junto a las cards blancas de arriba.
3. [Lista de bloques] Sigue sin swipe-to-complete ni ningún atajo para el usuario frecuente — pendiente explícito de la ronda anterior que NO se corrigió → implementar el gesto con fallback de tap, o al menos un long-press/acción rápida.
4. [Modal Editar bloque → Eliminar] La confirmación de borrado reutiliza el mismo botón cambiando solo el texto y un tinte de fondo al 10% de opacidad — a simple vista no se distingue lo suficiente de un botón normal y favorece el doble-tap accidental → reforzar visualmente el estado "a confirmar" (color sólido, ícono de advertencia, o separar en dos controles).
5. [Header de la lista, botón "+ Agregar"] Sin alto/padding mínimo definido en el código (clases solo de texto e ícono, sin h-11/h-12 ni padding), el área táctil queda por debajo de los 44px recomendados → añadir padding y alto mínimo para un touch target accesible.
