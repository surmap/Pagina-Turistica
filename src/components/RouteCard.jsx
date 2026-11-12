import ImagePlaceholder from './ImagePlaceholder.jsx';
import { formatCLP } from '../utils/format.js';

export default function RouteCard({ ruta, onSelect }) {
  return (
    <button type="button" className="card route-card" onClick={() => onSelect(ruta.id)}>
      <ImagePlaceholder height={180} radius="0" label={`Foto de ${ruta.nombre}`} />
      <div className="route-card__body">
        <h2 className="route-card__title">{ruta.nombre}</h2>
        <span className="meta">
          <span className="material-symbols-outlined">schedule</span>
          {ruta.horarios.join(' · ')}
        </span>
        <div className="route-card__footer">
          <span className="price">
            {formatCLP(ruta.precio)} <span className="price-suffix">/ persona</span>
          </span>
          <span className="badge">
            <span className="material-symbols-outlined">group</span>
            {ruta.cuposPorHorario} cupos
          </span>
        </div>
      </div>
    </button>
  );
}
