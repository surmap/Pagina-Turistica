import PageHeader from '../components/PageHeader.jsx';
import PassengerStepper from '../components/PassengerStepper.jsx';
import {
  MAX_DIAS_ADELANTE,
  addDaysISO,
  formatCLP,
  isFechaValida,
  isHorarioPasado,
  todayISO,
} from '../utils/format.js';

export default function Reservar({ ruta, draft, onChange, onBack, onContinuar }) {
  const hoy = todayISO();
  const maxFecha = addDaysISO(MAX_DIAS_ADELANTE);
  const fechaValida = isFechaValida(draft.fecha);
  const fechaConError = draft.fecha !== '' && !fechaValida;
  const maxPasajeros = ruta.cuposPorHorario;
  const total = ruta.precio * draft.pasajeros;
  const puedeContinuar = fechaValida && draft.horario !== '';

  function handleFecha(e) {
    const fecha = e.target.value;
    // Si el horario elegido ya pasó con la nueva fecha, se deselecciona.
    const horario = draft.horario && isHorarioPasado(fecha, draft.horario) ? '' : draft.horario;
    onChange({ ...draft, fecha, horario });
  }

  function handleHorario(horario) {
    onChange({ ...draft, horario, pasajeros: Math.min(draft.pasajeros, maxPasajeros) });
  }

  function handlePasajeros(n) {
    onChange({ ...draft, pasajeros: Math.max(1, Math.min(maxPasajeros, n)) });
  }

  return (
    <section className="page">
      <PageHeader
        title="Reservar"
        subtitle="Elige fecha, horario de salida y cantidad de pasajeros."
        onBack={onBack}
      />

      <div className="stack">
        <div className="card route-summary">
          <span className="route-summary__icon">
            <span className="material-symbols-outlined">sailing</span>
          </span>
          <div>
            <p className="route-summary__name">{ruta.nombre}</p>
            <span className="meta">
              <span className="material-symbols-outlined">schedule</span>
              {ruta.duracion}
            </span>
          </div>
        </div>

        <div className="field">
          <label className="field__label" htmlFor="fecha">
            Fecha
          </label>
          <input
            id="fecha"
            type="date"
            className={`input${fechaConError ? ' input--error' : ''}`}
            min={hoy}
            max={maxFecha}
            value={draft.fecha}
            onChange={handleFecha}
          />
          {fechaConError ? (
            <span className="field__error">
              Elige una fecha entre hoy y los próximos {MAX_DIAS_ADELANTE} días.
            </span>
          ) : (
            <span className="field__hint">Puedes reservar hasta {MAX_DIAS_ADELANTE} días hacia adelante.</span>
          )}
        </div>

        <div className="field">
          <span className="field__label" id="horario-label">
            Horario de salida
          </span>
          <div className="chips" role="group" aria-labelledby="horario-label">
            {ruta.horarios.map((horario) => {
              const pasado = isHorarioPasado(draft.fecha, horario);
              const seleccionado = draft.horario === horario;
              return (
                <button
                  key={horario}
                  type="button"
                  className={`chip${seleccionado ? ' chip--selected' : ''}`}
                  aria-pressed={seleccionado}
                  disabled={pasado}
                  onClick={() => handleHorario(horario)}
                >
                  {horario}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card">
          <PassengerStepper
            value={draft.pasajeros}
            max={maxPasajeros}
            precio={ruta.precio}
            onChange={handlePasajeros}
          />
        </div>

        <div className="total" aria-live="polite">
          <span className="total__label">Total</span>
          <span className="total__value">{formatCLP(total)}</span>
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn-primary" disabled={!puedeContinuar} onClick={onContinuar}>
          Continuar
        </button>
      </div>
    </section>
  );
}
