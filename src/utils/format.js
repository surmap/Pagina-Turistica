// Precio en CLP, formato $XX.XXX sin decimales.
export function formatCLP(monto) {
  const entero = Math.round(Number(monto) || 0);
  return '$' + String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function pad(n) {
  return String(n).padStart(2, '0');
}

// Fecha local en formato yyyy-mm-dd (el que usa <input type="date">).
export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISO() {
  return toISODate(new Date());
}

export function addDaysISO(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return toISODate(d);
}

// Rango permitido: desde hoy hasta hoy + 90 días, ambos incluidos.
export const MAX_DIAS_ADELANTE = 90;

export function isFechaValida(fecha) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha || '')) return false;
  return fecha >= todayISO() && fecha <= addDaysISO(MAX_DIAS_ADELANTE);
}

// Un horario de hoy queda deshabilitado cuando la hora actual es igual o posterior a la salida.
export function isHorarioPasado(fecha, horario, ahora = new Date()) {
  if (fecha !== toISODate(ahora)) return false;
  const [h, m] = horario.split(':').map(Number);
  const salida = new Date(ahora);
  salida.setHours(h, m, 0, 0);
  return ahora >= salida;
}

// "2026-11-15" -> "domingo 15 de noviembre de 2026"
export function formatFecha(fecha) {
  if (!fecha) return '';
  const [y, m, d] = fecha.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('es-CL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPasajeros(n) {
  return n === 1 ? '1 pasajero' : `${n} pasajeros`;
}

const CARACTERES_CODIGO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generarCodigoReserva() {
  let codigo = '';
  for (let i = 0; i < 6; i++) {
    codigo += CARACTERES_CODIGO[Math.floor(Math.random() * CARACTERES_CODIGO.length)];
  }
  return `RES-${codigo}`;
}
