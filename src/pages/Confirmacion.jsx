import ReservaSummary from '../components/ReservaSummary.jsx';

export default function Confirmacion({ reserva, onVolverInicio }) {
  return (
    <section className="page">
      <div className="confirm-hero">
        <div className="confirm-hero__icon">
          <span className="material-symbols-outlined">check</span>
        </div>
        <h1 className="page-title">¡Reserva confirmada!</h1>
        <p className="page-subtitle">Tu cupo quedó reservado. Presenta tu código al embarcar.</p>
      </div>

      <div className="stack">
        <div className="code-box">
          <span className="code-box__label">Código de reserva</span>
          <span className="code-box__code">{reserva.codigo}</span>
        </div>

        <div className="card">
          <ReservaSummary reserva={reserva} />
        </div>

        <div className="notice">
          <span className="material-symbols-outlined">mail</span>
          <span>Recibirás la confirmación por email.</span>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={onVolverInicio}>
          Volver a Inicio
        </button>
      </div>
    </section>
  );
}
