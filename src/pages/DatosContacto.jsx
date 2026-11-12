import { useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function telefonoValido(tel) {
  return tel.replace(/\D/g, '').length >= 8;
}

export default function DatosContacto({ contacto, onChange, onBack, onConfirmar }) {
  const [tocados, setTocados] = useState({});

  const nombre = contacto.nombre.trim();
  const email = contacto.email.trim();
  const telefono = contacto.telefono.trim();

  const nombreOk = nombre.length >= 2;
  const emailError = email !== '' && !EMAIL_RE.test(email);
  const telefonoError = telefono !== '' && !telefonoValido(telefono);
  const tieneMedio = (email !== '' && !emailError) || (telefono !== '' && !telefonoError);
  const puedeConfirmar = nombreOk && tieneMedio && !emailError && !telefonoError;

  function set(campo) {
    return (e) => onChange({ ...contacto, [campo]: e.target.value });
  }

  function tocar(campo) {
    return () => setTocados((t) => ({ ...t, [campo]: true }));
  }

  return (
    <section className="page">
      <PageHeader
        title="Datos de contacto"
        subtitle="Necesitamos tu nombre y al menos un medio de contacto: email o teléfono."
        onBack={onBack}
      />

      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          if (puedeConfirmar) onConfirmar();
        }}
        noValidate
      >
        <div className="field">
          <label className="field__label" htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            className={`input${tocados.nombre && !nombreOk ? ' input--error' : ''}`}
            value={contacto.nombre}
            onChange={set('nombre')}
            onBlur={tocar('nombre')}
            autoComplete="name"
          />
          {tocados.nombre && !nombreOk && <span className="field__error">Ingresa tu nombre completo.</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            className={`input${tocados.email && emailError ? ' input--error' : ''}`}
            value={contacto.email}
            onChange={set('email')}
            onBlur={tocar('email')}
            autoComplete="email"
            placeholder="nombre@correo.com"
          />
          {tocados.email && emailError && <span className="field__error">Revisa el formato del email.</span>}
        </div>

        <div className="field">
          <label className="field__label" htmlFor="telefono">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            inputMode="tel"
            className={`input${tocados.telefono && telefonoError ? ' input--error' : ''}`}
            value={contacto.telefono}
            onChange={set('telefono')}
            onBlur={tocar('telefono')}
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
          />
          {tocados.telefono && telefonoError && (
            <span className="field__error">El teléfono debe tener al menos 8 dígitos.</span>
          )}
        </div>

        <div className="notice">
          <span className="material-symbols-outlined">info</span>
          <span>Basta con uno de los dos: email o teléfono.</span>
        </div>

        <div className="actions" style={{ marginTop: 8 }}>
          <button type="submit" className="btn-primary" disabled={!puedeConfirmar}>
            Confirmar reserva
          </button>
        </div>
      </form>
    </section>
  );
}
