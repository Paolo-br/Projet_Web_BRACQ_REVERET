import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapView({ cities }) {
  const navigate = useNavigate();

  // Calcul du centre de la carte basé sur les villes disponibles
  const getMapCenter = () => {
    if (cities.length === 0) return [48.8566, 2.3522]; // Paris par défaut

    const avgLat = cities.reduce((sum, city) => sum + city.latitude, 0) / cities.length;
    const avgLng = cities.reduce((sum, city) => sum + city.longitude, 0) / cities.length;
    
    return [avgLat, avgLng];
  };

  // Calcul du zoom initial basé sur la dispersion des villes
  const getInitialZoom = () => {
    if (cities.length === 0) return 6;
    if (cities.length === 1) return 10;

    const lats = cities.map(c => c.latitude);
    const lngs = cities.map(c => c.longitude);
    const latRange = Math.max(...lats) - Math.min(...lats);
    const lngRange = Math.max(...lngs) - Math.min(...lngs);
    const maxRange = Math.max(latRange, lngRange);

    if (maxRange < 1) return 10;
    if (maxRange < 5) return 7;
    if (maxRange < 10) return 6;
    if (maxRange < 20) return 5;
    return 4;
  };

  const handleMarkerClick = (cityName) => {
    navigate(`/city/${encodeURIComponent(cityName)}`);
  };

  return (
    <div style={{ 
      width: "100%", 
      height: "500px", 
      borderRadius: "12px", 
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
    }}>
      <MapContainer
        center={getMapCenter()}
        zoom={getInitialZoom()}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.latitude, city.longitude]}
            eventHandlers={{
              click: () => handleMarkerClick(city.name)
            }}
          >
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem' }}>{city.name}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#666' }}>
                  {city.description || `Découvrez ${city.name} !`}
                </p>
                <button
                  onClick={() => handleMarkerClick(city.name)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Voir la ville
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
