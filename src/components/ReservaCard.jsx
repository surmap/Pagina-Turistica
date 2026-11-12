import { formatCLP, formatFecha, formatPasajeros } from '../utils/format.js';

export default function ReservaCard({ reserva }) {
  return (
    <article className="card">
      <div className="reserva-card__head">
        <h2 className="reserva-card__title">{reserva.rutaNombre}</h2>
        <span className="badge">
          <span className="material-symbols-outlined">check_circle</span>
          Confirmada
        </span>
      </div>
      <dl className="summary-list">
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
          <dd>
            {formatPasajeros(reserva.pasajeros)} · {formatCLP(reserva.total)}
          </dd>
        </div>
        <div className="summary-row summary-row--total">
          <dt>Código</dt>
          <dd style={{ fontSize: 20, letterSpacing: '0.06em' }}>{reserva.codigo}</dd>
        </div>
      </dl>
    </article>
  );
}
