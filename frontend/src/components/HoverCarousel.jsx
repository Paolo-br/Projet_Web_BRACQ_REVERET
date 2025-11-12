import { useEffect, useState, useRef } from 'react';

// Petit carousel automatique pour les images.
// Si `size` est fourni (nombre) le carousel est carré de cette taille.
// Sinon il remplit son conteneur parent (100% x 100%).
export default function HoverCarousel({ images = [], visible = false, size = null, interval = 2000 }) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (!visible || images.length === 0) {
      setIndex(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // démarrer l'auto-play
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [visible, images, interval]);

  if (!visible || images.length === 0) return null;

  const img = images[index];
  const containerStyle = size
    ? { width: size, height: size }
    : { width: '100%', height: '100%' };

  return (
    <div style={{
      ...containerStyle,
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img
        src={img}
        alt={`photo-${index}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
}
