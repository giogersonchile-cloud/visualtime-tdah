# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 32/40
Craft: 16/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Lista de bloques, toda la pantalla] Sigue sin swipe-to-complete ni ningún atajo para el usuario frecuente (h7=2/4, pendiente explícito de rondas anteriores) → implementar el gesto con fallback de tap, o al menos un long-press/acción rápida.
2. [Identidad visual] El dispositivo ownable (eco de marca duotone) ya se nota en el badge de racha y en el chip del insight, pero el resto de la pantalla (check de completado, lápiz de editar, nav inferior) sigue siendo Lucide plano sin tratamiento — a simple vista todavía se lee más como "acentos de color" que como un sistema propio → extender el eco de marca a al menos un elemento más (p.ej. el check del bloque completado).
3. [Modal Editar bloque → Eliminar] La confirmación ahora tiene borde 1.5px + tinte, mejora real, pero sigue siendo el MISMO botón en la MISMA posición (solo cambia estilo) — dos taps rápidos accidentales siguen siendo plausibles para el usuario TDAH objetivo → separar el estado de confirmación en un control visualmente distinto (tamaño, ícono de advertencia o desplazamiento de posición).
4. [Header de la lista, botón "+ Agregar"] Ya cumple min-h-11 (44px), pero el padding horizontal (px-2 = 8px) es mínimo — el área de tap se sigue leyendo angosta junto al resto de controles de la pantalla → subir a px-3/px-4 para que el touch target se vea, no solo se mida, generoso.
5. [Tarjeta de insight] La superficie hundida mejoró de contraste (sombra inset 0.22 + borde 1.5px) y ya es perceptible junto a las cards blancas, pero el sistema de profundidad general de la pantalla (base/elevado/hundido) sigue siendo sutil comparado con las cards de arriba → reforzar un poco más la diferencia visual entre "elevado" (lista) y "hundido" (insight) para que la jerarquía de planos se lea sin esfuerzo.
