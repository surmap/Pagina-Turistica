const BRAND_NAME = 'Reserva Operador Turistico';

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <p className="app-header__brand">{BRAND_NAME}</p>
      </div>
    </header>
  );
}
