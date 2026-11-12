import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import BottomNav from './components/BottomNav.jsx';
import Inicio from './pages/Inicio.jsx';
import DetalleRuta from './pages/DetalleRuta.jsx';
import Reservar from './pages/Reservar.jsx';
import DatosContacto from './pages/DatosContacto.jsx';
import Confirmacion from './pages/Confirmacion.jsx';
import Reservas from './pages/Reservas.jsx';
import mock from './data/mock.json';
import { generarCodigoReserva } from './utils/format.js';
import './styles/app.css';

const BORRADOR_VACIO = { fecha: '', horario: '', pasajeros: 1 };
const CONTACTO_VACIO = { nombre: '', email: '', telefono: '' };

export default function App() {
  const [pantalla, setPantalla] = useState('inicio');
  const [rutaId, setRutaId] = useState(null);
  // Selecciones de Reservar: se conservan mientras se reserva la misma ruta.
  const [borrador, setBorrador] = useState({ rutaId: null, ...BORRADOR_VACIO });
  const [contacto, setContacto] = useState(CONTACTO_VACIO);
  // Historial de la sesión: solo en memoria, se pierde al recargar.
  const [reservas, setReservas] = useState([]);
  const [ultimaReserva, setUltimaReserva] = useState(null);

  const ruta = mock.rutas.find((r) => r.id === rutaId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pantalla]);

  function irA(destino) {
    setPantalla(destino);
  }

  function seleccionarRuta(id) {
    setRutaId(id);
    irA('detalle');
  }

  function irAReservar() {
    if (borrador.rutaId !== rutaId) {
      setBorrador({ rutaId, ...BORRADOR_VACIO });
    }
    irA('reservar');
  }

  function confirmarReserva() {
    const reserva = {
      codigo: generarCodigoReserva(),
      rutaId: ruta.id,
      rutaNombre: ruta.nombre,
      fecha: borrador.fecha,
      horario: borrador.horario,
      pasajeros: borrador.pasajeros,
      total: ruta.precio * borrador.pasajeros,
      contacto,
    };
    setReservas((prev) => [reserva, ...prev]);
    setUltimaReserva(reserva);
    setBorrador({ rutaId: null, ...BORRADOR_VACIO });
    setContacto(CONTACTO_VACIO);
    irA('confirmacion');
  }

  let contenido;
  if (pantalla === 'detalle' && ruta) {
    contenido = <DetalleRuta ruta={ruta} onBack={() => irA('inicio')} onReservar={irAReservar} />;
  } else if (pantalla === 'reservar' && ruta) {
    contenido = (
      <Reservar
        ruta={ruta}
        draft={borrador}
        onChange={setBorrador}
        onBack={() => irA('detalle')}
        onContinuar={() => irA('contacto')}
      />
    );
  } else if (pantalla === 'contacto' && ruta) {
    contenido = (
      <DatosContacto
        contacto={contacto}
        onChange={setContacto}
        onBack={() => irA('reservar')}
        onConfirmar={confirmarReserva}
      />
    );
  } else if (pantalla === 'confirmacion' && ultimaReserva) {
    contenido = <Confirmacion reserva={ultimaReserva} onVolverInicio={() => irA('inicio')} />;
  } else if (pantalla === 'reservas') {
    contenido = <Reservas reservas={reservas} />;
  } else {
    contenido = <Inicio rutas={mock.rutas} onSelectRuta={seleccionarRuta} />;
  }

  return (
    <>
      <Header />
      <main className="app-main">{contenido}</main>
      <BottomNav active={pantalla === 'reservas' ? 'reservas' : 'inicio'} onChange={irA} />
    </>
  );
}
