import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import API_CONFIG from '../config/apiConfig';
import { placeService } from '../services/placeService';
import { participationService } from '../services/participationService';
import { useParticipation } from '../contexts/ParticipationContext';
import { useAuth } from '../contexts/AuthContext';
import favoriteService from '../services/favoriteService';

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
  const { isAuthenticated, currentUser } = useAuth();
  
  const [place, setPlace] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [participants, setParticipants] = useState([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [userParticipationId, setUserParticipationId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participationLoading, setParticipationLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [arrivalTimeInput, setArrivalTimeInput] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const isLoggedIn = () => {
    return isAuthenticated;
  };

  const getCurrentUserId = () => {
    return currentUser?.id || null;
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

      // Charger l'état favoris si connecté
      if (isLoggedIn()) {
        try {
          setFavLoading(true);
          const favs = await favoriteService.getMyFavorites();
          const found = favs.some(f => f.id === placeData.id);
          setIsFavorite(found);
        } catch (e) {
          console.warn('Impossible de charger les favoris', e);
        } finally {
          setFavLoading(false);
        }
      } else {
        setIsFavorite(false);
      }

      // Charger les participations
      await loadParticipations();
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError(err.message || 'Erreur lors du chargement du lieu');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!isLoggedIn()) {
      alert('Vous devez être connecté pour ajouter aux favoris');
      navigate('/login');
      return;
    }

    try {
      setFavLoading(true);
      if (isFavorite) {
        await favoriteService.removeFavorite(place.id);
        setIsFavorite(false);
      } else {
        await favoriteService.addFavorite(place.id);
        setIsFavorite(true);
      }
    } catch (e) {
      console.error('Erreur favoris', e);
      alert(e.message || 'Erreur lors de la gestion des favoris');
    } finally {
      setFavLoading(false);
    }
  };

  const loadParticipations = async () => {
    try {
      const participationsData = await participationService.getParticipations(placeId);
      console.log('Participations chargées:', participationsData);
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
                // Pré-remplir le champ heure si l'utilisateur a déjà une participation
                if (userParticipation.arrivalTime) {
                  const parts = String(userParticipation.arrivalTime).split(':');
                  setArrivalTimeInput(parts.slice(0,2).join(':'));
                } else {
                  setArrivalTimeInput('');
                }
              } else {
              setIsParticipating(false);
              setUserParticipationId(null);
                setArrivalTimeInput('');
              }
          } catch (err) {
            console.error('Erreur lors de la vérification de la participation:', err);
            setIsParticipating(false);
            setUserParticipationId(null);
            setArrivalTimeInput('');
          }
        } else {
          setIsParticipating(false);
          setUserParticipationId(null);
          setArrivalTimeInput('');
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

    // Si l'utilisateur est déjà inscrit -> annuler immédiatement
    if (isParticipating) {
      try {
        setParticipationLoading(true);
        await participationService.cancelParticipation(userParticipationId);
        setIsParticipating(false);
        setUserParticipationId(null);
        // Recharger et notifier
        await loadParticipations();
        notifyParticipationChange();
      } catch (err) {
        console.error("Erreur lors de l'annulation de participation:", err);
        alert(err.message || 'Erreur lors de l\'annulation');
      } finally {
        setParticipationLoading(false);
      }
      return;
    }

    // Si le time picker n'est pas visible, on l'affiche (premier clic)
    if (!showTimePicker) {
      setShowTimePicker(true);
      return;
    }

    // Si on arrive ici, le picker est visible et on doit confirmer la participation
    try {
      setParticipationLoading(true);
      const timeToSend = (arrivalTimeInput && arrivalTimeInput.trim()) ? arrivalTimeInput.trim() : null;
      const result = await participationService.participate(placeId, timeToSend);
      setIsParticipating(true);
      setUserParticipationId(result.id);

      // Fermer le picker après confirmation
      setShowTimePicker(false);

      // Recharger et notifier
      await loadParticipations();
      notifyParticipationChange();
    } catch (err) {
      console.error('Erreur lors de la participation:', err);
      if (err.message && err.message.includes('utilisateur manquant')) {
        const shouldReconnect = confirm('Vos informations de session sont incomplètes. Voulez-vous vous reconnecter ?');
        if (shouldReconnect) navigate('/login');
      } else {
        alert(err.message || 'Erreur lors de la participation');
      }
    } finally {
      setParticipationLoading(false);
    }
  };

  const handleCancelPicker = () => {
    // Ne pas supprimer l'heure saisie (pratique pour réutiliser)
    setShowTimePicker(false);
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

      {/* Header: catégorie, nom et adresse */}
      <div style={{ marginBottom: '18px' }}>
        <div style={{ marginBottom: '8px' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <h1 style={{
            margin: '6px 0 6px 0',
            fontSize: '2rem',
            color: 'white',
            fontWeight: '700'
          }}>{place.name}</h1>

          <div>
            <button
              onClick={handleToggleFavorite}
              disabled={favLoading}
              aria-pressed={isFavorite}
              title={isFavorite ? 'Retirer des favoris' : "Ajouter aux favoris"}
              style={{
                background: 'transparent',
                border: 'none',
                color: isFavorite ? '#ff6b6b' : 'white',
                fontSize: '1.8rem',
                cursor: 'pointer'
              }}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>

        <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.1rem' }}>📍</span>
          <span>{place.address}</span>
        </div>
      </div>

      {/* Bandeau photo full width */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        marginBottom: '30px'
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
            color: 'white'
          }}>
            {getCategoryEmoji(place.category)}
          </div>
        )}
      </div>

      {/* Deux colonnes : gauche (description + horaires + participants), droite (bouton + mini map) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 360px',
        gap: '30px',
        marginBottom: '40px'
      }}>
        {/* Colonne gauche : description, horaires et participants */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                Horaires d'ouverture
              </div>
              <div style={{ color: '#555' }}>
                {place.openingHours}
              </div>
            </div>
          )}

          {/* Participants */}
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', color: 'white' }}>Qui y va aujourd'hui ? ({participants.length})</h2>
            {participants.length === 0 ? (
              <div style={{
                padding: '24px',
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                color: '#666',
                fontSize: '1rem'
              }}>
                Personne n'a encore prévu d'y aller aujourd'hui. Soyez le premier !
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    onClick={() => {
                      if (isLoggedIn()) {
                        navigate(`/user/${participant.userId}`);
                      }
                    }}
                    style={{
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      cursor: isLoggedIn() ? 'pointer' : 'default'
                    }}
                    onMouseOver={(e) => {
                      if (isLoggedIn()) {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (isLoggedIn()) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.07)';
                      }
                    }}
                  >
                    {participant.userProfilePictureUrl ? (
                      <img
                        src={participant.userProfilePictureUrl.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${participant.userProfilePictureUrl}` : `${API_CONFIG.BACKEND_URL}/${participant.userProfilePictureUrl}`}
                        alt={`${participant.userFirstName} ${participant.userLastName}`}
                        style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          flexShrink: 0,
                          border: '2px solid #007bff'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#007bff',
                      display: participant.userProfilePictureUrl ? 'none' : 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {participant.userFirstName?.charAt(0)?.toUpperCase() || '?'}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {participant.userFirstName} {participant.userLastName}
                      </div>
                      {participant.arrivalTime && (
                        <div style={{ 
                          fontSize: '0.85rem', 
                          color: '#666', 
                          marginTop: '6px', 
                          display: 'flex', 
                          flexDirection: isLoggedIn() ? 'row' : 'column',
                          alignItems: isLoggedIn() ? 'center' : 'flex-start', 
                          gap: '6px' 
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span>Arrivée prévue:</span>
                            {isLoggedIn() ? (
                              <span>{String(participant.arrivalTime).split(':').slice(0,2).join(':')}</span>
                            ) : (
                              <span style={{ 
                                filter: 'blur(5px)', 
                                userSelect: 'none',
                                pointerEvents: 'none'
                              }}>
                                12:34
                              </span>
                            )}
                          </div>
                          {!isLoggedIn() && (
                            <a 
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate('/login');
                              }}
                              style={{ 
                                color: '#007bff',
                                textDecoration: 'none',
                                fontSize: '0.8rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              Connectez-vous
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Colonne droite : bouton de participation et mini carte */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Statut de participation */}
          {isParticipating && (
            <div style={{
              padding: '12px',
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>✅</span>
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

          {/* Bouton de participation (clique pour ouvrir le sélecteur) */}
          <div>
            {showTimePicker && !isParticipating ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{
                  padding: '10px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <label htmlFor="arrival-time" style={{fontSize: '0.95rem', color: '#333', minWidth: '1px'}}>Heure d'arrivée (optionnel)</label>
                  <input
                    id="arrival-time"
                    type="time"
                    value={arrivalTimeInput}
                    onChange={(e) => setArrivalTimeInput(e.target.value)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      border: '1px solid #ccd0d5',
                      background: '#ffffff',
                      color: '#000000',
                      fontSize: '0.95rem'
                    }}
                    disabled={participationLoading}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleParticipate}
                    disabled={participationLoading}
                    style={{
                      flex: 1,
                      padding: '12px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: participationLoading ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600'
                    }}
                  >
                    {participationLoading ? 'Chargement...' : 'Confirmer ma venue'}
                  </button>

                  <button
                    onClick={handleCancelPicker}
                    disabled={participationLoading}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: participationLoading ? 'not-allowed' : 'pointer',
                      fontSize: '1rem'
                    }}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
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
                  {participationLoading ? 'Chargement...' : isParticipating ? 'Annuler ma participation' : 'J\'y vais aujourd\'hui !'}
                </button>
              </div>
            )}
          </div>

          {/* Petite carte */}
          <div style={{ padding: '12px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ fontWeight: '600', color: '#333', marginBottom: '10px' }}>Localisation</div>
            <div style={{ height: '220px', borderRadius: '8px', overflow: 'hidden' }}>
              <MapContainer center={[place.latitude, place.longitude]} zoom={15} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[place.latitude, place.longitude]}>
                  <Popup>
                    <div style={{ textAlign: 'center' }}>
                      <strong style={{ fontSize: '1.05rem' }}>{place.name}</strong>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>{place.address}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
