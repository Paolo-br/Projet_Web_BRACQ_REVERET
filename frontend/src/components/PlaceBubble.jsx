import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_CONFIG from '../config/apiConfig';
import HoverCarousel from './HoverCarousel';

export default function PlaceBubble({ place, hoverDelay = 200 }) {
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);
  const hoverTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
        hoverTimer.current = null;
      }
    };
  }, []);

  const images = (place.photos || []).map(p => `${API_CONFIG.BACKEND_URL}${p}`);

  const handleMouseEnter = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setShowCarousel(true);
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setShowCarousel(false);
  };

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      }}
    >
  {/* Colonne image à gauche (agrandie pour être quasi aussi large que l'onglet) */}
  <div style={{ width: 240, height: 140, flex: '0 0 240px', borderRadius: 8, overflow: 'hidden', backgroundColor: '#eaeaea' }}>
        {images.length > 0 ? (
          showCarousel ? (
            <div style={{ width: '100%', height: '100%' }}>
              <HoverCarousel images={images} visible={true} interval={2000} />
            </div>
          ) : (
            <img src={images[0]} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '2rem' }}>📍</div>
        )}
      </div>

      {/* Contenu texte à droite */}
      <div style={{ flex: 1 }}>
        <h3 style={{
          margin: '0 0 10px 0',
          color: '#333',
          fontSize: '1.3rem',
          fontWeight: 'bold'
        }}>{place.name}</h3>

        {place.description && (
          <p style={{ margin: '10px 0', color: '#666' }}>{place.description}</p>
        )}

        {place.address && (
          <p style={{ margin: '5px 0', color: '#888', fontSize: '0.9rem' }}>📍 {place.address}</p>
        )}

        {/* Afficher toujours le nombre de participations aujourd'hui (0 si aucune donnée) */}
        {(() => {
          const count = typeof place.participationCount === 'number' ? place.participationCount : 0;
          const personsLabel = count > 1 ? 'personnes' : 'personne';
          const verb = count > 1 ? 'vont' : 'va';
          const text = count === 0 ? "Aucune personne disponible aujourd'hui" : `👥 ${count} ${personsLabel} ${verb} aujourd'hui`;
          return (
            <p style={{ margin: '10px 0', color: '#007bff', fontWeight: 'bold' }}>{text}</p>
          );
        })()}
      </div>
    </div>
  );
}
