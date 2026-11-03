# VEREDICTO revisor-visual — pantalla-principal
Fecha: 2026-11-03 00:00
Screenshot: docs/revisiones/pantalla-principal-375.png
Usabilidad: 29/40
Craft: 12/20
Copy (si vende): N-A
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos: 1) Ícono circular oscuro "N" (indicador dev de Next.js) superpuesto al tab "Hoy" en el TabBar, tapando su label — recapturar con devIndicators:false o build de producción. 2) Faltan 4/7 animaciones baseline (sin stagger de entrada, % del anillo no cuenta desde 0, sin transición entre tabs, sin celebración de hito de racha). 3) El dispositivo ownable (duotone de marca) de FICHA-ARTE no se ve en esta pantalla — la lista de bloques es un card-list genérico. 4) No hay forma de editar/eliminar un bloque desde Hoy (solo agregar) — control y libertad limitada. 5) Fallos de localStorage se silencian por completo (catch vacío en escribir()) sin aviso al usuario.
