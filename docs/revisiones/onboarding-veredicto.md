# VEREDICTO revisor-visual — Onboarding
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 30/40
Craft: 11/20
Copy (si vende): N-A (no vende)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [tercio inferior de la pantalla, bajo la tarjeta "Con tus respuestas"] Queda un vacío plano de ~200px sin ningún contenido, textura ni ilustración — rompe el encaje óptico y la sensación de pantalla terminada; el `justify-center` del contenedor no está logrando centrar el bloque de verdad (hay mucho más aire abajo que arriba). Fix: centrar realmente el bloque pregunta+ayuda en el alto disponible, o rellenar ese espacio con algo útil (ilustración de marca, progreso visual) en vez de dejarlo muerto.
2. [fondo, pantalla completa] El mesh radial del acento (reposicionado a "85% 6%"/"2% 38%") sigue sin percibirse en el screenshot real — el fondo se ve uniformemente plano (#F4F7F6), igual que en la ronda anterior pese al cambio de código. Fix: subir opacidad/saturación aún más o verificar que el `color-mix` esté renderizando el valor esperado en el navegador real (puede estar cayendo a fallback).
3. [opciones de respuesta, teclado] Solo el formulario de "Otra cosa" responde a Enter; las 4 opciones predefinidas no tienen ningún atajo de teclado (flechas+Enter, o números 1-4) para el usuario que no usa mouse — h7/flexibilidad sigue incompleta para el caso más común (elegir una opción, no escribir texto libre).
4. [botón "Salir" (X) del header] Sale sin ninguna confirmación aunque el usuario ya haya respondido varias preguntas — no es crítico (es reversible, se puede reiniciar) pero es inconsistente con el cuidado de control/libertad que sí se aplicó al botón "Continuar".
5. [tarjeta "Con tus respuestas", ícono EcoChip] El ícono con Sparkles queda levemente desalineado respecto a la primera línea de texto (se percibe 2-3px más alto) — ajustar el padding-top del bloque de texto para alinear ópticamente con el chip.
