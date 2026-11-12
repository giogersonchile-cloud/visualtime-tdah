# VEREDICTO revisor-visual — Onboarding
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 24/40
Craft: 11/20
Copy (si vende): N-A (no vende)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [debajo de las opciones de respuesta, mitad inferior de la pantalla] El screenshot muestra la tarjeta de ayuda "Con tus respuestas..." ausente/invisible y ~250px de espacio totalmente vacío hasta el final de la página — el defecto de la ronda 3 (hueco bajo la tarjeta) sigue sin resolverse, y ahora ni siquiera se alcanza a ver la tarjeta. Fix: confirmar que el stagger de entrada (opacity 0→1 con delay 0.2s) haya terminado antes de capturar el screenshot de verificación, y de fondo seguir resolviendo que el bloque se centre de verdad en el alto disponible en vez de dejar aire muerto abajo.
2. [tercera opción de respuesta, "Pierdo mi progreso si cambio de teléfono"] Se renderiza casi transparente/ilegible mientras las dos opciones de arriba se ven con opacidad decreciente (100%→60%→~10%) — parece un elemento roto o deshabilitado aunque sigue siendo clicable, lo que rompe "todo elemento interactivo debe parecerlo". Fix: si es la animación de entrada en vuelo al momento de la captura, re-tomar el screenshot esperando a que la animación asiente (~400-500ms tras el paint) antes de declarar el estado final; si el problema persiste en reposo, es un bug real de opacidad que hay que corregir en el componente.
3. [fondo, pantalla completa] El mesh de dos manchas sólidas con blur (teal arriba-derecha, mandarina abajo-izquierda) sigue sin percibirse con claridad a simple vista en el screenshot pese al cambio de técnica (gradient con color-mix → manchas sólidas blureadas) — la pantalla sigue leyéndose mayormente plana en sus 3/4 partes inferiores. Fix: subir opacidad a 55-60% y/o el tamaño del blur, y validar con una captura recortada de la esquina (no solo DevTools) que el tinte se note sin tener que buscarlo.
4. [opciones de respuesta predefinidas] Sin atajos de teclado (flechas + Enter, o teclas 1-4) para elegir una opción — solo el formulario de "Otra cosa" responde a Enter. Persiste sin cambios desde la ronda anterior (h7/flexibilidad). Fix: añadir manejo de teclado en el contenedor de opciones (roving tabindex o listener de flechas).
5. [botón "Salir" (X), header] Navega a "/" sin ninguna confirmación, aunque abandonar a mitad de flujo BORRA las respuestas ya dadas (solo viven en un `useRef` en memoria, sin persistencia hasta terminar el loading) — es una acción destructiva disfrazada de neutra. Fix: mostrar una confirmación breve ("¿Salir? Perderás tus respuestas") antes de navegar, al menos a partir de la 2ª pregunta respondida.
