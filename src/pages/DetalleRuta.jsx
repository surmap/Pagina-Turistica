import Carousel from '../components/Carousel.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { formatCLP } from '../utils/format.js';

export default function DetalleRuta({ ruta, onBack, onReservar }) {
  return (
    <section className="page">
      <PageHeader title={ruta.nombre} onBack={onBack} />

      <Carousel count={ruta.fotos} />

      <div className="stack">
        <div className="card facts">
          <div>
            <span className="fact__label">Duración</span>
            <span className="fact__value">{ruta.duracion}</span>
          </div>
          <div>
            <span className="fact__label">Cupos restantes</span>
            <span className="fact__value">{ruta.cuposPorHorario} por salida</span>
          </div>
          <div>
            <span className="fact__label">Precio por persona</span>
            <span className="price">{formatCLP(ruta.precio)}</span>
          </div>
          <div>
            <span className="fact__label">Salidas</span>
            <span className="fact__value">{ruta.horarios.join(' · ')}</span>
          </div>
        </div>

        <div>
          <h2 className="section-title">Sobre el recorrido</h2>
          <p className="description">{ruta.descripcion}</p>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" onClick={onReservar}>
          Reservar
        </button>
      </div>
    </section>
  );
}
