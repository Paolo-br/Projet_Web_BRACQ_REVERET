import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import API_CONFIG from '../config/apiConfig';
import { placeService } from '../services/placeService';
import { participationService } from '../services/participationService';
import { useParticipation } from '../contexts/ParticipationContext';

// Configuration de l'icône Leaflet
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

function PlacePage() {
  const { placeId } = useParams();
  const navigate = useNavigate();
  const { participationTrigger, notifyParticipationChange } = useParticipation();
  
  const [place, setPlace] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [userParticipationId, setUserParticipationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participationLoading, setParticipationLoading] = useState(false);

  const isLoggedIn = () => {
    return sessionStorage.getItem('jwt_token') !== null;
  };

  const getCurrentUserId = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id;
      } catch (e) {
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    loadPlaceData();
  }, [placeId]);

  // Écouter les changements de participation depuis d'autres pages (ex: profil)
  useEffect(() => {
    if (participationTrigger > 0 && place) {
      // Recharger les participations quand un changement est détecté
      loadParticipations();
    }
  }, [participationTrigger]);

  const loadPlaceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger les détails du lieu
      const placeData = await placeService.getPlaceById(placeId);
      setPlace(placeData);

      // Charger les participations
      await loadParticipations();
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err.message || 'Erreur lors du chargement du lieu');
    } finally {
      setLoading(false);
    }
  };

  const loadParticipations = async () => {
    try {
      const participationsData = await participationService.getParticipations(placeId);
      setParticipants(participationsData);

      // Vérifier si l'utilisateur actuel participe en utilisant le nouvel endpoint
      if (isLoggedIn()) {
        const currentUserId = getCurrentUserId();
        if (currentUserId) {
          try {
            const userParticipation = await participationService.checkUserParticipationToday(currentUserId, placeId);
            
            if (userParticipation) {
              setIsParticipating(true);
              setUserParticipationId(userParticipation.id);
            } else {
              setIsParticipating(false);
              setUserParticipationId(null);
            }
          } catch (err) {
            console.error('Erreur lors de la vérification de la participation:', err);
            setIsParticipating(false);
            setUserParticipationId(null);
          }
        } else {
          setIsParticipating(false);
          setUserParticipationId(null);
        }
      } else {
        // Si pas connecté, réinitialiser l'état
        setIsParticipating(false);
        setUserParticipationId(null);
      }
    } catch (err) {
      console.error('Erreur lors du chargement des participations:', err);
    }
  };

  const handleParticipate = async () => {
    if (!isLoggedIn()) {
      alert('Vous devez être connecté pour participer !');
      navigate('/login');
      return;
    }

    try {
      setParticipationLoading(true);

      if (isParticipating) {
        // Annuler la participation
        await participationService.cancelParticipation(userParticipationId);
        setIsParticipating(false);
        setUserParticipationId(null);
      } else {
        // Participer
        const result = await participationService.participate(placeId);
        setIsParticipating(true);
        setUserParticipationId(result.id);
      }

      // Recharger les participations pour mettre à jour le tableau
      await loadParticipations();
      
      // Notifier le contexte pour mettre à jour la page de profil
      notifyParticipationChange();
    } catch (err) {
      console.error('Erreur lors de la participation:', err);
      
      // Si l'erreur indique que les infos utilisateur sont manquantes, 
      // proposer de se reconnecter
      if (err.message && err.message.includes('utilisateur manquant')) {
        const shouldReconnect = confirm(
          'Vos informations de session sont incomplètes. Voulez-vous vous reconnecter ?'
        );
        if (shouldReconnect) {
          navigate('/login');
        }
      } else {
        alert(err.message || 'Erreur lors de la participation');
      }
    } finally {
      setParticipationLoading(false);
    }
  };

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

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? place.photos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === place.photos.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Chargement...
      </div>
    );
  }

  if (error || !place) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        gap: '20px'
      }}>
        <div style={{ fontSize: '1.2rem', color: '#dc3545' }}>
          {error || 'Lieu non trouvé'}
        </div>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retour
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
      >
        ← Retour
      </button>

      {/* Contenu principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {/* Colonne gauche : Carrousel de photos */}
        <div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            {place.photos && place.photos.length > 0 ? (
              <>
                <img
                  src={`${API_CONFIG.BACKEND_URL}${place.photos[currentPhotoIndex]}`}
                  alt={`${place.name} - Photo ${currentPhotoIndex + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                
                {place.photos.length > 1 && (
                  <>
                    {/* Bouton précédent */}
                    <button
                      onClick={handlePrevPhoto}
                      style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                    >
                      ‹
                    </button>

                    {/* Bouton suivant */}
                    <button
                      onClick={handleNextPhoto}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.7)'}
                      onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(0,0,0,0.5)'}
                    >
                      ›
                    </button>

                    {/* Indicateurs */}
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '8px'
                    }}>
                      {place.photos.map((_, index) => (
                        <div
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: index === currentPhotoIndex ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s'
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                color: '#999'
              }}>
                {getCategoryEmoji(place.category)}
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite : Informations */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Catégorie */}
          <div>
            <span style={{
              display: 'inline-block',
              padding: '6px 14px',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              {getCategoryEmoji(place.category)} {getCategoryLabel(place.category)}
            </span>
          </div>

          {/* Nom du lieu */}
          <h1 style={{
            margin: 0,
            fontSize: '2.5rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            {place.name}
          </h1>

          {/* Adresse */}
          <div style={{
            fontSize: '1.1rem',
            color: '#666',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px'
          }}>
            <span style={{ fontSize: '1.3rem' }}>📍</span>
            <span>{place.address}</span>
          </div>

          {/* Description */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            lineHeight: '1.6',
            color: '#555',
            fontSize: '1rem'
          }}>
            {place.description || 'Pas de description disponible.'}
          </div>

          {/* Horaires d'ouverture */}
          {place.openingHours && (
            <div style={{
              padding: '15px',
              backgroundColor: '#e7f3ff',
              borderRadius: '8px',
              borderLeft: '4px solid #007bff'
            }}>
              <div style={{
                fontWeight: 'bold',
                marginBottom: '5px',
                color: '#333'
              }}>
                🕐 Horaires d'ouverture
              </div>
              <div style={{ color: '#555' }}>
                {place.openingHours}
              </div>
            </div>
          )}

          {/* Statut de participation */}
          {isParticipating && (
            <div style={{
              padding: '15px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#155724', marginBottom: '2px' }}>
                  Vous participez !
                </div>
                <div style={{ fontSize: '0.9rem', color: '#155724' }}>
                  Vous êtes inscrit pour aujourd'hui
                </div>
              </div>
            </div>
          )}

          {/* Bouton de participation */}
          <button
            onClick={handleParticipate}
            disabled={participationLoading}
            style={{
              padding: '15px',
              backgroundColor: isParticipating ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: participationLoading ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              opacity: participationLoading ? 0.6 : 1,
              width: '100%'
            }}
            onMouseOver={(e) => {
              if (!participationLoading) {
                e.target.style.backgroundColor = isParticipating ? '#c82333' : '#218838';
                e.target.style.transform = 'scale(1.02)';
              }
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = isParticipating ? '#dc3545' : '#28a745';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {participationLoading ? 'Chargement...' : isParticipating ? '❌ Annuler ma participation' : '✅ J\'y vais aujourd\'hui !'}
          </button>
        </div>
      </div>

      {/* Section carte */}
      <div style={{
        marginBottom: '40px'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#333'
        }}>
          📍 Localisation
        </h2>
        <div style={{
          height: '400px',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <MapContainer
            center={[place.latitude, place.longitude]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[place.latitude, place.longitude]}>
              <Popup>
                <div style={{ textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{place.name}</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', color: '#666' }}>
                    {place.address}
                  </p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Section participants */}
      <div>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '20px',
          color: '#333'
        }}>
          👥 Qui y va aujourd'hui ? ({participants.length})
        </h2>
        
        {participants.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            color: '#666',
            fontSize: '1.1rem'
          }}>
            Personne n'a encore prévu d'y aller aujourd'hui. Soyez le premier !
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {participants.map((participant) => (
              <div
                key={participant.id}
                onClick={() => navigate(`/user/${participant.userId}`)}
                style={{
                  padding: '20px',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }}
              >
                {/* Photo de profil */}
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#007bff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {participant.userFirstName?.charAt(0)?.toUpperCase() || '?'}
                </div>

                {/* Informations utilisateur */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: '#333',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {participant.userFirstName} {participant.userLastName}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacePage;
