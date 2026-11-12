# VEREDICTO revisor-visual — Onboarding
Fecha: 2026-11-12 00:00
Screenshot: docs/revisiones/onboarding-375.png
Usabilidad: 31/40
Craft: 12/20
Copy (si vende): N-A (no vende)
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [fondo, pantalla completa] Mesh del acento sigue casi imperceptible en el screenshot real pese a subir a 28%/20% — el radial de 520px está anclado a "92% -8%" (fuera del viewport por arriba) y se recorta; reposicionar el centro dentro del área visible (ej. 85%/10%) o agrandar el radio para que se note sin lupa.
2. [header, logo 24px] El dispositivo ownable (duotone "eco de marca") solo vive en el logo diminuto — ningún otro elemento de la pantalla lo repite; usar `EcoChip` en el ícono de la tarjeta de ayuda o en el check de opción seleccionada para reforzar identidad (EJE3 craft).
3. [input "Otra cosa", botón Continuar] Sigue naciendo disabled/opacity-50 hasta llenar el campo en vez de habilitado-siempre con validación al click + hint — viola la ancla de CTA vivo (nunca disabled por defecto), aunque sea un CTA secundario.
4. [input "Otra cosa"] No hay atajo de teclado: presionar Enter no envía la respuesta, obliga a usar el mouse sobre "Continuar" — rompe flexibilidad/eficiencia (h7) para el usuario que ya está escribiendo con el teclado.
5. [flecha "atrás" del header] Al volver a una pregunta ya respondida, ninguna opción aparece resaltada (el estado `seleccionada` se resetea en cada cambio de índice) — el usuario pierde la referencia de qué había elegido antes, afecta control/reconocer-vs-recordar (h3/h6).
