# VEREDICTO revisor-visual — paywall
Fecha: 2026-11-02 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 30/40
Craft: 13/20
Copy (si vende): 16/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [value-stack, plan cards, fondo] Igual que en onboarding, las sombras tintadas y el mesh de fondo son demasiado sutiles para leerse como profundidad real en el screenshot — todo el bloque se percibe casi plano → subir el contraste de sombra/mesh.
2. [identidad ownable] El código marca el borde Hairline del value-stack como "el dispositivo ownable", pero FICHA-ARTE define el dispositivo ownable como el duotone de marca, no el hairline — y ese duotone solo vive en el logo de 24px, invisible a este tamaño → corregir la atribución y hacer visible el duotone en algún elemento de mayor tamaño (chip de ícono, ilustración).
3. [Restaurar compra, código línea 32-37] El botón da feedback de carga ("Buscando tu compra…") pero tras los 2.2s no muestra ningún resultado (éxito/fallo) — el usuario se queda sin saber qué pasó → agregar mensaje de cierre (toast o texto) tras restaurar.
4. [garantía, abajo de la pantalla] "Garantía de 15 días" queda lejos del CTA principal (debajo de "Ahora no / Restaurar compra"), rompiendo el sub-check de copy que pide el plazo de garantía cerca del CTA → mover el bloque de confianza justo debajo del botón "Empezar mis 7 días gratis".
5. [longitud de pantalla] La pantalla apila headline + value-stack + timeline + 2 tarjetas de plan + CTA + 2 filas de links + trust row — mucho scroll en 375px, carga cognitiva alta para un paywall → compactar value-stack o timeline.
