# VEREDICTO revisor-visual — onboarding
Fecha: 2026-11-02 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 30/40
Craft: 10/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Toda la pantalla] Fondo y tarjetas de opción totalmente planos (border sin sombra), contradice "sombras sutiles tintadas RGB 15·118·110" de FICHA-ARTE.md → agregar box-shadow sutil teal a los botones de opción y un leve tinte al fondo.
2. [Toda la pantalla] No hay ningún dispositivo ownable (duotone de marca / icon chips) visible — la pregunta es texto puro sin ícono ni ilustración → agregar al menos un icon chip duotone relacionado a la pregunta, como define FICHA-ARTE.md.
3. [Titular "¿Qué es lo que más te frustra hoy?"] Texto plano sin ninguna palabra en acento — no cumple el gate de "titular con énfasis: bold + 1-3 palabras en acento" → resaltar 1-2 palabras clave en var(--accent).
4. [Mitad inferior de la pantalla] ~45% del viewport queda vacío entre las opciones y el footer flotante, sin balance óptico → centrar verticalmente el bloque pregunta+opciones o sumar un elemento de apoyo.
5. [Círculo flotante "N", esquina inferior izquierda] Elemento con apariencia interactiva visible en el screenshot que no aparece en app/onboarding/page.tsx revisado — si pertenece al producto, falta verificar su función y accesibilidad (aria-label); si es ajeno a la app, no debería aparecer en el flujo revisado.
