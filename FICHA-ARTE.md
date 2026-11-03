# FICHA DE DIRECCIÓN DE ARTE — VisualTime TDAH

## Referencia del usuario (CONTRATO — ver 16)
- ¿Hay imagen(es) de referencia del usuario?: NO — el usuario eligió "Propón tú el estilo" (RUTA 1 del 54)
- Extracción: N/A — sin referencia del usuario, no aplica
- Prohibiciones anti-IA que la referencia levanta: ninguna (no hay referencia que las levante)

## Identidad derivada (FUSIÓN de líderes — 16 PASO 0.2bis — + banco del 54 para el dispositivo)
- TABLA DE LÍDERES:
  - Structured (líder #1, de FICHA-MODELO.md) → mecanismo de línea de tiempo visual, rutinas recurrentes como núcleo del producto
  - Tiimo → calidez amable sin ser infantil, modo accesible/calmado, mascota/ilustración con carácter
  - Sunsama → ritual diario sobrio, sin exceso de color, confianza "profesional-personal"
  - Admirada (craft, no del nicho): apps de accesibilidad (NHS/GOV.UK design system, BeMyEyes) → uso de Atkinson Hyperlegible, fuente diseñada específicamente para lectores con dislexia/baja visión/dificultades cognitivas — pertinente de forma directa al avatar TDAH
- Combinación tipográfica usada: Gantari (display, sans geométrica humanista) + Atkinson Hyperlegible (body, legibilidad clínica real) — fila de la dirección "Clínica humana" del banco 54 (dir. 5), confirmada contra el mundo del sujeto (apps de función ejecutiva/accesibilidad)
- Arquetipo: El Cuidador competente (calma + autoridad, sin infantilizar) · Mundo del sujeto: salud de la función ejecutiva — hay miedo/vergüenza previos (desconfianza de apps que fallaron antes) y hace falta calidez competente
- Dirección del banco 54 usada para el dispositivo ownable: "Clínica humana" (dir. 5), adaptada — duotone de marca en ilustraciones/chips de ícono · Líder de origen de la paleta (tomada tal cual): dirección 5 del banco (teal #0F766E), justificada por el arquetipo, no por un líder literal del nicho — ningún competidor de productividad TDAH usa esta paleta, lo que además protege el test de intercambiabilidad

## Personalidad compilada
- 3 adjetivos de personalidad: calma, confiable, clara (nunca fría ni infantil)
- Compilación: sin springs (motion de la dirección 5 del banco: 280ms ease-out estándar, cero celebraciones grandes — la confianza se mueve poco y siempre igual) · duración base 280ms · exclamaciones máx 1/pantalla (solo en hitos de racha, nunca en cada tap) · celebración nivel bajo-medio (la racha y las medallas celebran; el resto de la UI permanece sobria) · radio tendencial 16px

## Brand kit final (valores para globals.css)
- Fondo: #F4F7F6 · Superficie: #FDFEFD · Hundido (inputs): #EAF0EE · Texto 1º/2º: #22302C / #5B6D67
- Acento: #0F766E (SOLO en: CTA primario, anillo de progreso, estado activo de tabs, checks completados) · 2ª nota: #D97E00 (mandarina, heredada de la Opción A descartada) SOLO en el badge de racha/medallas — porqué: separa "progreso diario" (teal) de "logro/celebración" (mandarina), nunca mezclados en el mismo elemento
- Semánticos: éxito #0F766E (reutiliza el acento) · error #B3261E · aviso #B45309
- Display: Gantari (pesos 500/600/700) · Body: Atkinson Hyperlegible (pesos 400/700) · Escala: display 28px / title 19-21px / body 14px / label 10.5-11px
- Radio: 16px cards / 12px botones · Profundidad: sombras sutiles tintadas (RGB 15·118·110), nunca negras puras; bordes hairline 1px al 6-10% · Espaciado base: escala 4·8·12·16·24·32·48·64
- Dispositivo ownable: duotone de marca sobre ilustraciones/chips de ícono (receta del archivo 54, dirección 5)
- Motion signature: ease-out estándar `cubic-bezier(0,0,0.2,1)` · 280ms · sin stagger pronunciado · firma: nada "rebota" — la calma es el mensaje

## Trazabilidad y vetos
- Ruta de diseño (PREGUNTA DE REFERENCIA del 54): propuesta propia
- Protocolo A/B/C: opción elegida B ("Calma Clara") · descartadas: A "Rutina Regalada" (Cítrica utilitaria, Unbounded+Familjen Grotesk, mandarina) y C "Tu Día en Capítulos" (Editorial cálida, Newsreader+Mulish, óxido) · página comparativa: `direcciones-abc.html` (raíz) · screenshots: `docs/revisiones/direcciones-abc-375.png`
- Tour de la app: `vista-previa-app.html` (raíz) · vistas incluidas: principal/M0 (Hoy), onboarding (pregunta), paywall (planes), mecanismo (rutina lista) · aprobado por el usuario: SÍ — 2026-11-02 ("Me encanta, sigamos")
- Paleta derivada de: banco 54 "Clínica humana" (dir. 5), tomada tal cual · Dispositivo ownable elegido: duotone de marca
- Registro anti-repetición: paleta teal #0F766E + par Gantari/Atkinson Hyperlegible anotados en ESTADO.md → vetados para el próximo proyecto del SO
- Modo (claro/oscuro) DERIVADO por: el mundo del sujeto pide calma y confianza sin ocultar nada (no hay razón de sensibilidad lumínica nocturna) — claro es más distintivo y evita el default oscuro+neón de la capa anti-IA

## Idioma UI: Español latino neutro (tuteo) · Fecha de cierre de la ficha: 2026-11-02 · Aprobada por el usuario: SÍ
