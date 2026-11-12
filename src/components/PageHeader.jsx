export default function PageHeader({ title, subtitle, onBack }) {
  return (
    <div className="page-header">
      {onBack && (
        <button type="button" className="back-button" onClick={onBack}>
          <span className="material-symbols-outlined">arrow_back</span>
          Volver
        </button>
      )}
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
  );
}
