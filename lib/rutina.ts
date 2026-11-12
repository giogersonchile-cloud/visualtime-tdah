// Modelo de datos de la app interna — 100% local (localStorage), sin backend (ESTADO.md:
// "Stack: Next.js + almacenamiento local... sin Supabase para datos en el MVP").
// Loop de retención (24-GAMIFICACION / Regla de Oro 6):
//   GATILLO: la hora del bloque (alarma nativa, fuera de alcance del MVP web) o abrir la app.
//   ACCIÓN:  marcar un bloque de la rutina como hecho (1 tap).
//   RECOMPENSA: el check visual + el avance del anillo de hoy + el insight del patrón.
//   INVERSIÓN: cada bloque marcado alimenta la racha y el insight de mañana — si se borra
//     el historial, la app de mañana vuelve a ser genérica (test de 24 superado).
// Ritual diario M0 (56): 1) dato de hoy (anillo %) 2) acción de 1 tap (check del bloque)
// 3) racha visible 4) insight derivado del patrón real de cumplimiento.

export interface Bloque {
  id: string;
  hora: string; // 'HH:mm'
  titulo: string;
  duracionMin: number;
  /** 0=domingo … 6=sábado. Un bloque sin recurrencia usa el día en que se creó. */
  dias: number[];
}

export interface Rutina {
  nombre: string;
  bloques: Bloque[];
}

const KEY_RUTINA = 'vt_rutina';
const KEY_COMPLETADOS = 'vt_completados'; // { 'YYYY-MM-DD': string[] de ids }

const TODOS_LOS_DIAS = [0, 1, 2, 3, 4, 5, 6];
const DIAS_HABILES = [1, 2, 3, 4, 5];

export const PLANTILLAS: Record<string, Rutina> = {
  'Rutina de Mañana Exitosa': {
    nombre: 'Rutina de Mañana Exitosa',
    bloques: [
      { id: 'b1', hora: '07:00', titulo: 'Despertar y estirar', duracionMin: 10, dias: TODOS_LOS_DIAS },
      { id: 'b2', hora: '07:20', titulo: 'Desayuno sin pantallas', duracionMin: 20, dias: TODOS_LOS_DIAS },
      { id: 'b3', hora: '08:15', titulo: 'Bloque de estudio', duracionMin: 45, dias: DIAS_HABILES },
      { id: 'b4', hora: '18:00', titulo: 'Gimnasio', duracionMin: 60, dias: [1, 4] },
    ],
  },
  'Rutina de estudio o trabajo': {
    nombre: 'Rutina de estudio o trabajo',
    bloques: [
      { id: 'b1', hora: '09:00', titulo: 'Bloque de foco (sin notificaciones)', duracionMin: 50, dias: DIAS_HABILES },
      { id: 'b2', hora: '11:00', titulo: 'Revisar pendientes del día', duracionMin: 15, dias: DIAS_HABILES },
      { id: 'b3', hora: '15:00', titulo: 'Segundo bloque de foco', duracionMin: 50, dias: DIAS_HABILES },
    ],
  },
  'Rutina de entrenamiento': {
    nombre: 'Rutina de entrenamiento',
    bloques: [
      { id: 'b1', hora: '07:00', titulo: 'Estiramiento + activación', duracionMin: 10, dias: [1, 3, 5] },
      { id: 'b2', hora: '18:00', titulo: 'Entrenamiento', duracionMin: 60, dias: [1, 3, 5] },
      { id: 'b3', hora: '19:15', titulo: 'Agua y snack post-entreno', duracionMin: 10, dias: [1, 3, 5] },
    ],
  },
};

function plantillaPersonalizada(nombre: string): Rutina {
  return {
    nombre,
    bloques: [{ id: 'b1', hora: '08:00', titulo: nombre, duracionMin: 30, dias: TODOS_LOS_DIAS }],
  };
}

export function rutinaDesdeRespuesta(p3: string | undefined): Rutina {
  if (p3 && PLANTILLAS[p3]) return PLANTILLAS[p3];
  return plantillaPersonalizada(p3?.trim() || 'Mi rutina');
}

function leer<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function escribir<T>(key: string, valor: T) {
  try {
    localStorage.setItem(key, JSON.stringify(valor));
    return true;
  } catch {
    // almacenamiento no disponible (modo privado, cuota): se PROPAGA el fallo — la UI
    // avisa, nunca falla en silencio (el usuario creería que guardó y no fue así).
    return false;
  }
}

export function obtenerRutina(): Rutina | null {
  return leer<Rutina | null>(KEY_RUTINA, null);
}

export function guardarRutina(r: Rutina): boolean {
  return escribir(KEY_RUTINA, r);
}

export function agregarBloque(bloque: Omit<Bloque, 'id'>): { rutina: Rutina; ok: boolean } {
  const rutina = obtenerRutina() ?? { nombre: 'Mi rutina', bloques: [] };
  const nuevo: Bloque = { ...bloque, id: `b${Date.now()}` };
  rutina.bloques = [...rutina.bloques, nuevo].sort((a, b) => a.hora.localeCompare(b.hora));
  const ok = guardarRutina(rutina);
  return { rutina, ok };
}

export function editarBloque(id: string, cambios: Partial<Omit<Bloque, 'id'>>): { rutina: Rutina | null; ok: boolean } {
  const rutina = obtenerRutina();
  if (!rutina) return { rutina: null, ok: false };
  rutina.bloques = rutina.bloques
    .map((b) => (b.id === id ? { ...b, ...cambios } : b))
    .sort((a, b) => a.hora.localeCompare(b.hora));
  const ok = guardarRutina(rutina);
  return { rutina, ok };
}

export function eliminarBloque(id: string): { rutina: Rutina | null; ok: boolean } {
  const rutina = obtenerRutina();
  if (!rutina) return { rutina: null, ok: false };
  rutina.bloques = rutina.bloques.filter((b) => b.id !== id);
  const ok = guardarRutina(rutina);
  return { rutina, ok };
}

/** Deshacer un borrado reciente (h9/control y libertad): reinserta el bloque con
 * su MISMO id — así conserva su historial de "completado" si lo tenía. */
export function restaurarBloque(bloque: Bloque): { rutina: Rutina; ok: boolean } {
  const rutina = obtenerRutina() ?? { nombre: 'Mi rutina', bloques: [] };
  if (!rutina.bloques.some((b) => b.id === bloque.id)) {
    rutina.bloques = [...rutina.bloques, bloque].sort((a, b) => a.hora.localeCompare(b.hora));
  }
  const ok = guardarRutina(rutina);
  return { rutina, ok };
}

function fechaISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function bloquesDelDia(rutina: Rutina, fecha: Date): Bloque[] {
  const dia = fecha.getDay();
  return rutina.bloques.filter((b) => b.dias.includes(dia)).sort((a, b) => a.hora.localeCompare(b.hora));
}

function completadosDe(fechaISOStr: string): string[] {
  const todos = leer<Record<string, string[]>>(KEY_COMPLETADOS, {});
  return todos[fechaISOStr] ?? [];
}

export function estaCompletado(fecha: Date, bloqueId: string): boolean {
  return completadosDe(fechaISO(fecha)).includes(bloqueId);
}

export function alternarCompletado(fecha: Date, bloqueId: string): { completados: string[]; ok: boolean } {
  const key = fechaISO(fecha);
  const todos = leer<Record<string, string[]>>(KEY_COMPLETADOS, {});
  const actuales = todos[key] ?? [];
  todos[key] = actuales.includes(bloqueId) ? actuales.filter((id) => id !== bloqueId) : [...actuales, bloqueId];
  const ok = escribir(KEY_COMPLETADOS, todos);
  return { completados: todos[key], ok };
}

/** Racha = días consecutivos (terminando hoy o ayer) con ≥1 bloque completado,
 *  contando solo días que tenían algún bloque programado. */
export function calcularRacha(rutina: Rutina, hoy: Date = new Date()): number {
  let racha = 0;
  const cursor = new Date(hoy);
  // Si hoy todavía no se completó nada, la racha se evalúa desde ayer (no se rompe a mitad del día).
  const hoyTieneBloques = bloquesDelDia(rutina, cursor).length > 0;
  const hoyCompleto = completadosDe(fechaISO(cursor)).length > 0;
  if (hoyTieneBloques && !hoyCompleto) cursor.setDate(cursor.getDate() - 1);

  for (let i = 0; i < 365; i++) {
    const bloquesDia = bloquesDelDia(rutina, cursor);
    if (bloquesDia.length === 0) {
      cursor.setDate(cursor.getDate() - 1);
      continue; // día sin bloques programados no rompe ni suma la racha
    }
    const hechos = completadosDe(fechaISO(cursor));
    if (hechos.length === 0) break;
    racha++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return racha;
}

/** Insight del patrón real (M0.1 pieza 4) — honesto: solo afirma lo que los datos muestran. */
export function insightDelPatron(rutina: Rutina): string | null {
  const dias: Date[] = [];
  const hoy = new Date();
  for (let i = 1; i <= 7; i++) {
    const d = new Date(hoy);
    d.setDate(d.getDate() - i);
    dias.push(d);
  }
  let programados = 0;
  let hechos = 0;
  for (const d of dias) {
    const bloques = bloquesDelDia(rutina, d);
    programados += bloques.length;
    hechos += completadosDe(fechaISO(d)).filter((id) => bloques.some((b) => b.id === id)).length;
  }
  if (programados === 0) return null;
  const pct = Math.round((hechos / programados) * 100);
  if (hechos === 0) return null;
  return `Completaste el ${pct}% de tu rutina esta última semana.`;
}

export function porcentajeHoy(rutina: Rutina, fecha: Date = new Date()): number {
  const bloques = bloquesDelDia(rutina, fecha);
  if (bloques.length === 0) return 0;
  const hechos = completadosDe(fechaISO(fecha)).filter((id) => bloques.some((b) => b.id === id)).length;
  return Math.round((hechos / bloques.length) * 100);
}
