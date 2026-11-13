# VEREDICTO revisor-visual — Paywall
Fecha: 2026-11-13 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 29/40
Craft: 14/20
Copy (si vende): 19/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [craft eje2-profundidad, fondo esquinas superiores] La corrección de esta ronda (ambas manchas ahora en --accent, respetando la reserva de --accent-2 para racha/medallas de FICHA-ARTE) es correcta como fix de consistencia, pero NO resuelve el defecto de profundidad pendiente: con blur(22px) y opacidad 70%/60% la mancha sigue siendo perceptible solo si se busca con atención a 375px; además, al ser ahora el MISMO color en ambas esquinas, el fondo se percibe aún más monocromático/plano que antes → reemplazar el blob aislado por un gradiente sutil directamente sobre --bg (ej. radial-gradient 2-4% de --accent) que no dependa de coincidir con la zona visible del viewport.
2. [densidad general / h8-estético, toda la pantalla] Sigue sin tocarse: la pantalla todavía necesita 2 capturas a 375px para verse entera (header + 2 párrafos + tarjeta fusionada de valor+timeline + 2 tarjetas de plan + CTA + garantía + enlaces + sello de pago) — para un avatar con sobrecarga cognitiva declarada en FICHA-AVATAR.md, un usuario cualquiera nota que debe desplazarse bastante antes de decidir → fusionar "Hecho con tus N respuestas" en la misma línea del párrafo emocional, y unir "Pago seguro con Hotmart" con "Cancela cuando quieras · Garantía de 15 días" en una sola línea de confianza al pie.
3. [copy eje4-oferta, bloque de garantía] Sin resolver: "Garantía de 15 días" conviviendo con una prueba de "7 días" sin aclarar la relación entre ambos plazos genera una duda rápida justo en el texto más cercano al CTA → agregar 2-3 palabras, ej. "Garantía de 15 días tras el primer cobro".
4. [usabilidad h8/h6/h3, enlaces "Ahora no" / "Restaurar compra"] Siguen en texto gris de 14px al fondo, con el mismo peso visual que "Pago seguro" — para un usuario que escanea en vez de leer, estas dos acciones de control y libertad son difíciles de localizar sin buscarlas → subir levemente el contraste (o un leve subrayado/ícono) sin competir con el CTA primario.
5. [craft eje3-identidad, timeline del trial] El sello duotone en el nodo "Hoy" ya se nota sin lupa, pero los otros 2 nodos (Día 6 lleno, Día 7 vacío) siguen siendo círculos planos sin relación visual con el sello — la identidad se siente aplicada a un solo punto en vez de a todo el elemento narrativo → aplicar al nodo vacío (Día 7) una variante más sutil del mismo tratamiento para que los 3 nodos se lean como una sola familia.
