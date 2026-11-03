// Datos del quiz de onboarding — copy marcado en docs/copy/onboarding-paywall.md.
// Las respuestas se guardan en localStorage (el MVP es 100% offline — ESTADO.md)
// y el paywall las lee para personalizar headline/loading (54/52 — nunca genérico).

export interface Pregunta {
  id: 'p1' | 'p2' | 'p3' | 'p4';
  pregunta: string;
  /** Palabra(s) de la pregunta que van en acento — JERARQUÍA DE ÉNFASIS (50/55):
   *  aplica también a titulares de onboarding, no solo paywall. */
  acento: string;
  microcopy?: string;
  opciones: string[];
  otraCosa?: boolean;
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 'p1',
    pregunta: '¿Qué es lo que más te frustra hoy?',
    acento: 'frustra',
    opciones: [
      'Pago por apps que no me dejan repetir tareas gratis',
      'Se me olvidan las alarmas',
      'Pierdo mi progreso si cambio de teléfono',
      'Ya no sé qué app usar',
    ],
  },
  {
    id: 'p2',
    pregunta: '¿A qué hora te cuesta más arrancar?',
    acento: 'arrancar',
    opciones: ['Apenas me despierto', 'A media mañana', 'Después del almuerzo', 'Varía mucho día a día'],
  },
  {
    id: 'p3',
    pregunta: '¿Qué rutina quieres armar primero?',
    acento: 'primero',
    microcopy: 'Esto define tu primera línea de tiempo',
    opciones: ['Rutina de Mañana Exitosa', 'Rutina de estudio o trabajo', 'Rutina de entrenamiento'],
    otraCosa: true,
  },
  {
    id: 'p4',
    pregunta: '¿Cuántos días por semana quieres mantenerla?',
    acento: 'mantenerla',
    opciones: ['3 días', '5 días', 'Todos los días'],
  },
];

export type Respuestas = Record<Pregunta['id'], string>;

const STORAGE_KEY = 'vt_onboarding_respuestas';

export function guardarRespuestas(r: Respuestas) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(r));
  } catch {
    // almacenamiento no disponible (modo privado, cuota) — el flujo sigue,
    // el paywall cae a copy genérico si no puede leer las respuestas.
  }
}

export function leerRespuestas(): Respuestas | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Respuestas) : null;
  } catch {
    return null;
  }
}
