import { formatCLP } from '../utils/format.js';

export default function PassengerStepper({ value, min = 1, max, precio, onChange }) {
  return (
    <div className="stepper">
      <div>
        <div className="field__label">Pasajeros</div>
        <div className="field__hint">
          {formatCLP(precio)} por persona · máximo {max}
        </div>
      </div>
      <div className="stepper__controls">
        <button
          type="button"
          className="stepper__button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          aria-label="Quitar un pasajero"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <span className="stepper__value" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          className="stepper__button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          aria-label="Agregar un pasajero"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
