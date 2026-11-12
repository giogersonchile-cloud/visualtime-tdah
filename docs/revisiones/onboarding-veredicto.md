# VEREDICTO revisor-visual — Onboarding
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 29/40
Craft: 14/20
Copy (si vende): N-A (no vende)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [fondo, pantalla completa] El mesh de manchas sólidas con blur (teal arriba-derecha, mandarina abajo-izquierda) sigue sin percibirse en el screenshot de reposo pese a la subida de opacidad a 55%/45% — la pantalla se lee prácticamente plana (fondo pálido uniforme) en sus 3/4 partes. Fix: verificar si los blobs (-right-16 -top-24 / -left-20 top-48, tamaño 340px/280px) realmente caen dentro del viewport 375×667 renderizado, y si caen, subir aún más opacidad/tamaño o acercarlos al centro visible.
2. [las 4 opciones de respuesta] Sigue sin haber atajos de teclado dedicados (flechas o teclas 1-4 + Enter) para elegir una opción — solo el formulario "Otra cosa" responde a Enter, y la única vía de teclado para las opciones predefinidas es Tab + Enter/Espacio nativo del botón, lento para un usuario que quiere resolver rápido. Fix: añadir listener de teclado (roving tabindex o teclas numéricas 1-4) en el contenedor de opciones.
3. [botón "Salir" (X), header] La confirmación de salida usa `window.confirm()` nativo del navegador — un diálogo gris genérico del sistema operativo que rompe el tono calmado y cuidado de la marca (Gantari/Atkinson, teal, radios 16px) con un elemento que no comparte ningún token visual. Fix: reemplazar por un modal propio (mismo radius/tipografía/acento de la ficha) con las acciones "Salir" / "Seguir respondiendo".
4. [ícono EcoChip, tarjeta de ayuda inferior] Desalineación de 2-3px entre el ícono Sparkles y su chip contenedor — defecto heredado de rondas anteriores, aún sin corregir. Fix: ajustar el centrado del `span` interno en `EcoChip` (revisar `offset`/padding del contenedor de 36-44px).
5. [jerarquía tipográfica de toda la pantalla] Conviven 4 tamaños de texto (28px título / 16px opciones / 13px texto de ayuda / 11px label de porcentaje), uno más de los 3 recomendados por la rúbrica de jerarquía — funciona pero un ojo entrenado nota que no hay una escala estrictamente cerrada. Fix: fusionar el label de 11px con el texto de ayuda de 13px en un mismo tamaño, o justificar el cuarto nivel explícitamente en FICHA-ARTE.md.
