const TABS = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  { id: 'reservas', label: 'Reservas', icon: 'confirmation_number' },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      <div className="bottom-nav__inner">
        {TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              className={`bottom-nav__tab${isActive ? ' bottom-nav__tab--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onChange(tab.id)}
            >
              <span className="bottom-nav__icon">
                <span className="material-symbols-outlined">{tab.icon}</span>
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
