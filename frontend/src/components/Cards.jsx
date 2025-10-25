import { Link } from 'react-router-dom';
import API_CONFIG from '../config/apiConfig';

export function CityCard({ city }) {
  const imageUrl = city.imageUrl ? `${API_CONFIG.BACKEND_URL}${city.imageUrl}` : `${API_CONFIG.BACKEND_URL}/uploads/paris.jpg`;
  console.log('City:', city.name, 'imageUrl:', city.imageUrl, 'Full URL:', imageUrl);
  
  return (
    <Link
      to={`/city/${encodeURIComponent(city.name)}`}
      style={{
        minWidth: '280px',
        maxWidth: '280px',
        textDecoration: 'none',
        color: 'inherit',
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      }}
    >
      <img
        src={imageUrl}
        alt={city.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          display: 'block'
        }}
      />
      <div style={{ padding: '15px' }}>
        <h3 style={{ 
          margin: '0 0 8px 0',
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#333'
        }}>
          {city.name}
        </h3>
        <p style={{ 
          margin: 0, 
          color: '#666', 
          fontSize: '0.9rem',
          lineHeight: '1.4',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {city.description || `Découvrez ${city.name} !`}
        </p>
      </div>
    </Link>
  );
}

export function PlaceCard({ place }) {
  const getCategoryLabel = (category) => {
    const labels = {
      'BAR': 'Bar',
      'BOITE_DE_NUIT': 'Boîte de nuit',
      'PARC': 'Parc',
      'BIBLIOTHEQUE': 'Bibliothèque',
      'MUSEE': 'Musée',
      'MONUMENT_HISTORIQUE': 'Monument historique'
    };
    return labels[category] || category;
  };

  // Récupérer la première photo (celle qui finit par _1)
  const getFirstPhoto = () => {
    console.log('Place:', place.name);
    console.log('Place photos:', place.photos);
    
    if (place.photos && place.photos.length > 0) {
      // Chercher une photo qui finit par _1
      const firstPhoto = place.photos.find(photo => photo.includes('_1'));
      console.log('First photo with _1:', firstPhoto);
      
      if (firstPhoto) {
        const fullUrl = `${API_CONFIG.BACKEND_URL}${firstPhoto}`;
        console.log('Full URL:', fullUrl);
        return fullUrl;
      }
      // Sinon prendre la première photo disponible
      const fullUrl = `${API_CONFIG.BACKEND_URL}${place.photos[0]}`;
      console.log('Full URL (fallback):', fullUrl);
      return fullUrl;
    }
    console.log('No photos found for', place.name);
    return null;
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'BAR': '🍺',
      'BOITE_DE_NUIT': '🎵',
      'PARC': '🌳',
      'BIBLIOTHEQUE': '📚',
      'MUSEE': '🎨',
      'MONUMENT_HISTORIQUE': '🏛️'
    };
    return emojis[category] || '📍';
  };

  const photoUrl = getFirstPhoto();

  return (
    <div
      style={{
        minWidth: '280px',
        maxWidth: '280px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      }}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={place.name}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '200px',
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '3rem'
        }}>
          {getCategoryEmoji(place.category)}
        </div>
      )}
      <div style={{ padding: '15px' }}>
        <div style={{
          display: 'inline-block',
          padding: '4px 10px',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          {getCategoryLabel(place.category)}
        </div>
        <h3 style={{ 
          margin: '0 0 8px 0',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          color: '#333',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {place.name}
        </h3>
        <p style={{ 
          margin: '0 0 8px 0', 
          color: '#666', 
          fontSize: '0.85rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          📍 {place.address || 'Adresse non disponible'}
        </p>
        {place.description && (
          <p style={{ 
            margin: 0, 
            color: '#888', 
            fontSize: '0.85rem',
            lineHeight: '1.3',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {place.description}
          </p>
        )}
      </div>
    </div>
  );
}
