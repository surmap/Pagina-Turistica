import { formatCLP, formatFecha, formatPasajeros } from '../utils/format.js';

// Resumen de ruta, fecha, horario, pasajeros y total.
export default function ReservaSummary({ reserva }) {
  return (
    <dl className="summary-list">
      <div className="summary-row">
        <dt>Ruta</dt>
        <dd>{reserva.rutaNombre}</dd>
      </div>
      <div className="summary-row">
        <dt>Fecha</dt>
        <dd>{formatFecha(reserva.fecha)}</dd>
      </div>
      <div className="summary-row">
        <dt>Horario</dt>
        <dd>{reserva.horario} hrs</dd>
      </div>
      <div className="summary-row">
        <dt>Pasajeros</dt>
        <dd>{formatPasajeros(reserva.pasajeros)}</dd>
      </div>
      <div className="summary-row summary-row--total">
        <dt>Total</dt>
        <dd>{formatCLP(reserva.total)}</dd>
      </div>
    </dl>
  );
}
