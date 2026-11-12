import PageHeader from '../components/PageHeader.jsx';
import ReservaCard from '../components/ReservaCard.jsx';

export default function Reservas({ reservas }) {
  return (
    <section className="page">
      <PageHeader title="Mis reservas" subtitle="Reservas confirmadas en esta sesión." />

      {reservas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">
            <span className="material-symbols-outlined">event_busy</span>
          </div>
          <p className="empty-state__text">Aún no tienes reservas</p>
        </div>
      ) : (
        <div className="stack">
          {reservas.map((reserva) => (
            <ReservaCard key={reserva.codigo} reserva={reserva} />
          ))}
        </div>
      )}
    </section>
  );
}
