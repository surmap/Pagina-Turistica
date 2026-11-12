export default function ImagePlaceholder({ height = 180, radius = 'var(--radius-card)', iconSize = 48, label = 'Imagen de ejemplo' }) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{
        width: '100%',
        height,
        borderRadius: radius,
        background: 'var(--color-placeholder-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: iconSize, color: 'var(--color-placeholder-icon)' }}
      >
        image
      </span>
    </div>
  );
}
