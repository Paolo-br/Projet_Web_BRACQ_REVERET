import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import API_CONFIG from "../config/apiConfig";
import InstaIcon from "../assets/insta.png";
import FbIcon from "../assets/facebook.png";
import XIcon from "../assets/x.png";

function UserProfileView() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [participations, setParticipations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Charger le profil de l'utilisateur
      const profileData = await userService.getUserById(userId);
      setProfile(profileData);

      // Charger les participations de l'utilisateur uniquement si l'utilisateur partage son historique
      if (profileData.showParticipationHistory !== false) {
        const participationsData = await userService.getParticipations(userId);
        setParticipations(participationsData);
      } else {
        setParticipations([]);
      }
    } catch (err) {
      console.error('Erreur lors du chargement du profil:', err);
      setError(err.message || 'Erreur lors du chargement du profil');
    } finally {
      setLoading(false);
    }
  };

  const handleGoToPlace = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  // Filtrer les participations passées (avant aujourd'hui)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const pastParticipations = participations.filter(p => {
    if (!p.participationDate) return false;
    const partDate = new Date(p.participationDate);
    partDate.setHours(0, 0, 0, 0);
    return partDate < today && p.status === 'INSCRIT';
  });

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

  if (error || !profile) {
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
          {error || 'Profil non trouvé'}
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
      maxWidth: '800px',
      margin: '60px auto',
      padding: '40px 20px'
    }}>
      {/* Bouton retour */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '30px',
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

      {/* Carte du profil */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        {/* Photo et nom */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '30px',
          borderBottom: '2px solid #f0f0f0'
        }}>
          {/* Photo de profil */}
          {profile.profilePictureUrl ? (
            (() => {
              const rel = profile.profilePictureUrl;
              const imageSrc = rel.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${rel}` : `${API_CONFIG.BACKEND_URL}/${rel}`;
              return (
                <img
                  src={imageSrc}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '20px',
                    border: '4px solid #007bff'
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'flex';
                  }}
                />
              );
            })()
          ) : null}
          {(!profile.profilePictureUrl || true) && (
            <div
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: '#007bff',
                display: profile.profilePictureUrl ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3.5rem',
                fontWeight: 'bold',
                marginBottom: '20px',
                border: '4px solid #0056b3'
              }}
            >
              {profile.firstName?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}

          {/* Nom complet */}
          <h1 style={{
            margin: '0 0 10px 0',
            fontSize: '2.2rem',
            color: '#333',
            fontWeight: 'bold'
          }}>
            {profile.firstName} {profile.lastName}
          </h1>

          {/* Badge age */}
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#e7f3ff',
            color: '#007bff',
            borderRadius: '20px',
            fontSize: '0.95rem',
            fontWeight: '600'
          }}>
            {profile.age} ans
          </div>

          {/* Social icons */}
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            {profile.instagramUrl && (
              <a href={profile.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" style={{ textDecoration: 'none' }}>
                <img src={InstaIcon} alt="Instagram" style={{ width:36, height:36 }} />
              </a>
            )}
            {profile.facebookUrl && (
              <a href={profile.facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook" style={{ textDecoration: 'none' }}>
                <img src={FbIcon} alt="Facebook" style={{ width:36, height:36 }} />
              </a>
            )}
            {profile.xUrl && (
              <a href={profile.xUrl} target="_blank" rel="noreferrer" aria-label="X (Twitter)" style={{ textDecoration: 'none' }}>
                <img src={XIcon} alt="X" style={{ width:36, height:36 }} />
              </a>
            )}
          </div>
        </div>

        {/* Informations détaillées */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '20px'
        }}>
          {/* Ville actuelle */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '0.85rem',
              color: '#6c757d',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Ville actuelle
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: '#333',
              fontWeight: '600'
            }}>
              {profile.currentCity || 'Non renseignée'}
            </div>
          </div>

          {/* Pays d'origine */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{
              fontSize: '0.85rem',
              color: '#6c757d',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Pays d'origine
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: '#333',
              fontWeight: '600'
            }}>
              {profile.countryOrigin || 'Non renseigné'}
            </div>
          </div>
        </div>
      </div>

      {/* Historique des participations */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{
          margin: '0 0 25px 0',
          fontSize: '1.8rem',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          Historique des participations
          <span style={{
            fontSize: '1rem',
            color: '#6c757d',
            fontWeight: 'normal'
          }}>
            ({pastParticipations.length})
          </span>
        </h2>

        {profile.showParticipationHistory === false ? (
          <div style={{
            padding: '30px',
            textAlign: 'center',
            backgroundColor: '#fff',
            borderRadius: '8px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}> Historique privé</div>
            <div>Cet utilisateur a choisi de ne pas partager son historique de participation.</div>
          </div>
        ) : pastParticipations.length === 0 ? (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            color: '#6c757d',
            fontSize: '1.05rem'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🗓️</div>
            Aucune participation passée pour le moment.
          </div>
        ) : (
          <div style={{
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            {/* En-tête du tableau */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto auto',
              backgroundColor: '#f8f9fa',
              padding: '15px 20px',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: '#495057',
              borderBottom: '2px solid #dee2e6'
            }}>
              <div>Lieu</div>
              <div style={{ textAlign: 'center', minWidth: '120px' }}>Date</div>
              <div style={{ textAlign: 'center', minWidth: '100px' }}>Action</div>
            </div>

            {/* Liste des participations */}
            <div style={{
              maxHeight: '400px',
              overflowY: 'auto'
            }}>
              {pastParticipations.map((p, index) => (
                <div
                  key={p.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    padding: '15px 20px',
                    borderBottom: index < pastParticipations.length - 1 ? '1px solid #e9ecef' : 'none',
                    alignItems: 'center',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e7f3ff'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f8f9fa'}
                >
                  <div style={{
                    color: '#333',
                    fontWeight: '500',
                    fontSize: '1rem'
                  }}>
                    📍 {p.placeName || 'Lieu inconnu'}
                  </div>
                  <div style={{
                    color: '#6c757d',
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    minWidth: '120px'
                  }}>
                    {p.participationDate ? new Date(p.participationDate).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    }) : 'Date inconnue'}
                  </div>
                  <div style={{
                    textAlign: 'center',
                    minWidth: '100px'
                  }}>
                    <button
                      onClick={() => handleGoToPlace(p.placeId)}
                      style={{
                        padding: '6px 16px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                    >
                      Voir le lieu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileView;
