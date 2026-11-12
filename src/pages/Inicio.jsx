import PageHeader from '../components/PageHeader.jsx';
import RouteCard from '../components/RouteCard.jsx';

export default function Inicio({ rutas, onSelectRuta }) {
  return (
    <section className="page">
      <PageHeader
        title="Tours disponibles"
        subtitle="Elige un recorrido en el agua y reserva tu cupo en minutos."
      />
      <div className="stack">
        {rutas.map((ruta) => (
          <RouteCard key={ruta.id} ruta={ruta} onSelect={onSelectRuta} />
        ))}
      </div>
    </section>
  );
}
