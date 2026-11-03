# VEREDICTO revisor-visual — paywall
Fecha: 2026-11-02 00:00
Screenshot: docs/revisiones/paywall-375.png
Usabilidad: 27/40
Craft: 12/20
Copy (si vende): 14/20
Fidelidad (si hubo referencia): N-A
Veredicto: NO LISTA
Top defectos:
1. [Fila inferior "Restaurar compra"] Botón sin onClick ni handler en app/paywall/page.tsx (línea ~175) — se ve interactivo pero no hace absolutamente nada al tocarlo → implementar la lógica real de restauración o quitarlo del flujo hasta tenerla, con feedback de estado al tocar.
2. [Toda la pantalla] Fondo y tarjetas (value stack, planes) sin sombra ni gradiente, solo bordes — contradice "sombras sutiles tintadas" de FICHA-ARTE.md → aplicar shadow/gradient sutil al bloque de beneficios y a las tarjetas de plan.
3. [Toda la pantalla] Cero dispositivo ownable (duotone de marca) visible pese a estar definido en FICHA-ARTE.md y ya implementado como componente IconChip en components/landing/ui.tsx pero no usado aquí → aplicar IconChip duotone al menos en el value stack de 3 beneficios.
4. [Tarjeta "Anual" / bloque garantía] No se usa el componente Hairline (ya existe en ui.tsx) en ningún elemento clave del paywall, pese a que la ficha pide máx 1-3 hairlines degradé para señalar "esto importa" → aplicar Hairline al plan recomendado o al bloque de garantía.
5. [Titular "Tu Rutina de Mañana Exitosa está lista"] Big idea genérica de "tu plan está listo", no explota el ángulo diferenciador de FICHA-AVATAR.md ("la agenda que no te cobra por repetir tus tareas" / dolor de injusticia de cobros) → reforzar el headline o el copy inmediato con ese mecanismo específico.
