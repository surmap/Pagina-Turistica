import { useRef, useState } from 'react';
import ImagePlaceholder from './ImagePlaceholder.jsx';

// Carrusel con scroll-snap nativo: swipe en touch, flechas para mouse/trackpad y puntos.
export default function Carousel({ count, height = 260 }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  function goTo(i) {
    const track = trackRef.current;
    if (!track) return;
    const next = Math.max(0, Math.min(count - 1, i));
    track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div className="carousel">
      <div className="carousel__track" ref={trackRef} onScroll={handleScroll}>
        {Array.from({ length: count }, (_, i) => (
          <div className="carousel__slide" key={i}>
            <ImagePlaceholder height={height} radius="0" iconSize={64} label={`Foto ${i + 1} de ${count}`} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel__arrow carousel__arrow--prev"
        onClick={() => goTo(index - 1)}
        disabled={index === 0}
        aria-label="Foto anterior"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button
        type="button"
        className="carousel__arrow carousel__arrow--next"
        onClick={() => goTo(index + 1)}
        disabled={index >= count - 1}
        aria-label="Foto siguiente"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <div className="carousel__dots" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className={`carousel__dot${i === index ? ' carousel__dot--active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
