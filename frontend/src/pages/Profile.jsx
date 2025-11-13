import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import authService from "../services/authService";
import userService from "../services/userService";
import InstaIcon from "../assets/insta.png";
import FbIcon from "../assets/facebook.png";
import XIcon from "../assets/x.png";
import { participationService } from "../services/participationService";
import favoriteService from "../services/favoriteService";
import API_CONFIG from "../config/apiConfig";
import { useParticipation } from "../contexts/ParticipationContext";
import RoleBadge from "../components/RoleBadge";

function Profile() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { participationTrigger, notifyParticipationChange } = useParticipation();
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [participations, setParticipations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cities, setCities] = useState([]);
  const [cancelingId, setCancelingId] = useState(null);
  const fileInputRef = useRef(null);
  const instaRef = useRef(null);
  const fbRef = useRef(null);
  const xRef = useRef(null);

  // Fonction pour charger les participations
  const loadParticipations = async (userId) => {
    try {
      const parts = await userService.getParticipations(userId);
      setParticipations(parts);
    } catch (e) {
      console.error('Erreur chargement participations', e);
    }
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // Récupérer l'email de l'utilisateur
    const email = authService.getCurrentUserEmail();
    setUserEmail(email);

    // Récupérer profil complet
    (async () => {
      try {
        const data = await userService.getMyProfile();
        setProfile(data);
        setOriginalProfile(data);
        // charger participations uniquement si l'utilisateur partage son historique
        if (data.showParticipationHistory !== false) {
          await loadParticipations(data.id);
        } else {
          setParticipations([]);
        }
          // charger favoris
          try {
            const favs = await favoriteService.getMyFavorites();
            setFavorites(favs || []);
          } catch (e) {
            console.warn('Impossible de charger les favoris', e);
            setFavorites([]);
          }
      } catch (e) {
        console.error('Erreur chargement profil', e);
      }
    })();

    // Charger les villes
    (async () => {
      try {
        const url = API_CONFIG.ENDPOINTS.CITIES.ALL;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) {
          console.warn('Chargement des villes: réponse non OK', res.status);
          return;
        }
        const contentType = res.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          console.warn('Chargement des villes: content-type inattendu', contentType);
          return;
        }
        const list = await res.json();
        setCities(list || []);
      } catch (e) {
        console.error('Impossible de charger les villes', e);
      }
    })();
  }, [navigate]);

  // Effet pour recharger les participations quand le trigger change
  useEffect(() => {
    if (profile && profile.id && participationTrigger > 0) {
      loadParticipations(profile.id);
    }
  }, [participationTrigger, profile?.id]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    // Restaurer les valeurs originales
    setProfile({ ...originalProfile });
    setEditing(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateMyProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        yearOfBirth: profile.yearOfBirth,
        currentCity: profile.currentCity,
        countryOrigin: profile.countryOrigin,
        profilePictureUrl: profile.profilePictureUrl,
        showParticipationHistory: profile.showParticipationHistory,
        instagramUrl: profile.instagramUrl,
        facebookUrl: profile.facebookUrl,
        xUrl: profile.xUrl
      });
      setProfile(updated);
      setOriginalProfile(updated);
      setEditing(false);
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleCancelParticipation = async (participationId, placeName) => {
    const confirmed = window.confirm(`Voulez-vous vraiment annuler votre participation à "${placeName}" ?`);
    if (!confirmed) return;

    setCancelingId(participationId);
    try {
      await participationService.cancelParticipation(participationId);
      // Recharger les participations immédiatement
      await loadParticipations(profile.id);
      // Notifier le contexte pour mettre à jour les autres pages
      notifyParticipationChange();
    } catch (err) {
      console.error('Erreur lors de l\'annulation:', err);
      alert('Erreur lors de l\'annulation de la participation');
    } finally {
      setCancelingId(null);
    }
  };

  const handleGoToPlace = (placeId) => {
    navigate(`/place/${placeId}`);
  };

  // Filtrer les participations futures (aujourd'hui ou après)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const activeParticipations = participations.filter(p => {
    if (!p.participationDate) return false;
    const partDate = new Date(p.participationDate);
    partDate.setHours(0, 0, 0, 0);
    return partDate >= today && p.status === 'INSCRIT';
  });

  const pastParticipations = participations.filter(p => {
    if (!p.participationDate) return false;
    const partDate = new Date(p.participationDate);
    partDate.setHours(0, 0, 0, 0);
    return partDate < today || p.status !== 'INSCRIT';
  });

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "100px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {/* Photo de profil */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {profile && profile.profilePictureUrl ? (
            (() => {
              const rel = profile.profilePictureUrl;
              const imageSrc = rel.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${rel}` : `${API_CONFIG.BACKEND_URL}/${rel}`;
              return (
                <img
                  src={imageSrc}
                  alt="avatar"
                  style={{ width:100, height:100, borderRadius: '50%', objectFit:'cover' }}
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = ''; }}
                />
              );
            })()
          ) : (
            <div
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                backgroundColor: "#646cff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "3rem",
                marginBottom: "15px"
              }}
            >
              👤
            </div>
          )}

          <button
            aria-label="Upload profile photo"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              position: 'absolute',
              right: -6,
              bottom: -6,
              backgroundColor: '#646cff',
              color: '#fff',
              borderRadius: 20,
              border: 'none',
              width: 32,
              height: 32,
              padding: 0,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4e53d6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#646cff'}
          >
            +
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" style={{ display:'none' }} onChange={async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            setLoading(true);
            try {
              const url = await userService.uploadMyPhoto(file);
              // refresh profile
              const updated = await userService.getMyProfile();
              setProfile(updated);
            } catch (err) {
              console.error('Upload failed', err);
              alert('Erreur lors de l\'upload');
            } finally { setLoading(false); }
          }} />
        </div>
        <h2 style={{ margin: "10px 0", color: "#333" }}>Mon Profil</h2>
        <p style={{ color: "#666", margin: "5px 0" }}>{userEmail}</p>
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 10 }}>
          {/** Instagram */}
          <img
            src={InstaIcon}
            alt="Instagram"
            style={{ width: 36, height: 36, cursor: 'pointer' }}
            onClick={async () => {
              if (editing) {
                const choice = window.confirm('Voulez-vous lier via OAuth (OK) ou coller une URL manuellement (Annuler) ?');
                if (choice) {
                  try {
                    const res = await userService.getSocialConnectUrl('instagram');
                    if (res && res.url) window.open(res.url, '_blank', 'noopener');
                  } catch (e) { alert('Impossible d\'initier la connexion sociale'); }
                } else {
                  const url = window.prompt('Collez l\'URL complète de votre profil Instagram (ex: https://instagram.com/...)');
                  if (url) {
                    try {
                      await userService.linkSocialUrl('instagram', url);
                      const updated = await userService.getMyProfile();
                      setProfile(updated);
                      setOriginalProfile(updated);
                    } catch (e) { alert('Erreur lors du lien Instagram'); }
                  }
                }
              } else {
                if (profile?.instagramUrl) {
                  window.open(profile.instagramUrl, '_blank', 'noopener');
                } else {
                  // passer en mode édition et focus sur l'input Instagram
                  setEditing(true);
                  setTimeout(() => { if (instaRef.current) instaRef.current.focus(); }, 120);
                }
              }
            }}
          />

          {/** Facebook */}
          <img
            src={FbIcon}
            alt="Facebook"
            style={{ width: 36, height: 36, cursor: 'pointer' }}
            onClick={async () => {
              if (editing) {
                const choice = window.confirm('Voulez-vous lier via OAuth (OK) ou coller une URL manuellement (Annuler) ?');
                if (choice) {
                  try {
                    const res = await userService.getSocialConnectUrl('facebook');
                    if (res && res.url) window.open(res.url, '_blank', 'noopener');
                  } catch (e) { alert('Impossible d\'initier la connexion sociale'); }
                } else {
                  const url = window.prompt('Collez l\'URL complète de votre profil Facebook (ex: https://facebook.com/...)');
                  if (url) {
                    try {
                      await userService.linkSocialUrl('facebook', url);
                      const updated = await userService.getMyProfile();
                      setProfile(updated);
                      setOriginalProfile(updated);
                    } catch (e) { alert('Erreur lors du lien Facebook'); }
                  }
                }
              } else {
                if (profile?.facebookUrl) {
                  window.open(profile.facebookUrl, '_blank', 'noopener');
                } else {
                  setEditing(true);
                  setTimeout(() => { if (fbRef.current) fbRef.current.focus(); }, 120);
                }
              }
            }}
          />

          {/** X/Twitter */}
          <img
            src={XIcon}
            alt="X"
            style={{ width: 36, height: 36, cursor: 'pointer' }}
            onClick={async () => {
              if (editing) {
                const choice = window.confirm('Voulez-vous lier via OAuth (OK) ou coller une URL manuellement (Annuler) ?');
                if (choice) {
                  try {
                    const res = await userService.getSocialConnectUrl('x');
                    if (res && res.url) window.open(res.url, '_blank', 'noopener');
                  } catch (e) { alert('Impossible d\'initier la connexion sociale'); }
                } else {
                  const url = window.prompt('Collez l\'URL complète de votre profil X (ex: https://x.com/...)');
                  if (url) {
                    try {
                      await userService.linkSocialUrl('x', url);
                      const updated = await userService.getMyProfile();
                      setProfile(updated);
                      setOriginalProfile(updated);
                    } catch (e) { alert('Erreur lors du lien X'); }
                  }
                }
              } else {
                if (profile?.xUrl) {
                  window.open(profile.xUrl, '_blank', 'noopener');
                } else {
                  setEditing(true);
                  setTimeout(() => { if (xRef.current) xRef.current.focus(); }, 120);
                }
              }
            }}
          />
        </div>
      </div>

      {/* Informations */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#333", marginBottom: "15px" }}>Informations du compte</h3>
        <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "6px", marginBottom: "10px" }}>
          {!profile ? (
            <p>Chargement...</p>
          ) : (
            <div>
              {/* Affichage des rôles */}
              {profile.roles && profile.roles.length > 0 && (
                <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                  <strong style={{ minWidth: "120px", color: "#555" }}>Rôles :</strong>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                    {Array.from(profile.roles).map((role) => (
                      <RoleBadge key={role} role={role} size="small" />
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Prénom :</strong>
                {editing ? (
                  <input 
                    type="text" 
                    value={profile.firstName || ''} 
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.firstName}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Nom :</strong>
                {editing ? (
                  <input 
                    type="text" 
                    value={profile.lastName || ''} 
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.lastName}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Email :</strong>
                {editing ? (
                  <input 
                    type="email" 
                    value={profile.email || ''} 
                    onChange={(e) => handleChange('email', e.target.value)}
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.email}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Age :</strong>
                {editing ? (
                  <input 
                    type="number" 
                    min="1900"
                    max="2007"
                    value={profile.yearOfBirth || ''} 
                    onChange={(e) => handleChange('yearOfBirth', e.target.value)}
                    placeholder="Année de naissance"
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.age}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Ville :</strong>
                {editing ? (
                  <select 
                    value={profile.currentCity || ''} 
                    onChange={(e) => handleChange('currentCity', e.target.value)}
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  >
                    <option value="">-- Choisir une ville --</option>
                    {cities.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                ) : (
                  <span style={{ color: "#555" }}>{profile.currentCity}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Origine :</strong>
                {editing ? (
                  <input 
                    type="text" 
                    value={profile.countryOrigin || ''} 
                    onChange={(e) => handleChange('countryOrigin', e.target.value)}
                    style={{ 
                      padding: "6px 10px", 
                      border: "1px solid #ccc", 
                      borderRadius: "4px", 
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.countryOrigin}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Instagram :</strong>
                {editing ? (
                  <input
                    type="text"
                      ref={instaRef}
                      value={profile.instagramUrl || ''}
                      onChange={(e) => handleChange('instagramUrl', e.target.value)}
                    placeholder="https://instagram.com/votreprofil"
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.instagramUrl || 'Non renseigné'}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Facebook :</strong>
                {editing ? (
                  <input
                      ref={fbRef}
                      type="text"
                      value={profile.facebookUrl || ''}
                      onChange={(e) => handleChange('facebookUrl', e.target.value)}
                    placeholder="https://facebook.com/votreprofil"
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.facebookUrl || 'Non renseigné'}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>X (Twitter) :</strong>
                {editing ? (
                  <input
                      ref={xRef}
                      type="text"
                      value={profile.xUrl || ''}
                      onChange={(e) => handleChange('xUrl', e.target.value)}
                    placeholder="https://x.com/votreprofil"
                    style={{
                      padding: "6px 10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      flex: 1,
                      fontSize: "14px"
                    }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.xUrl || 'Non renseigné'}</span>
                )}
              </div>

              <div style={{ margin: "10px 0", display: "flex", alignItems: "center" }}>
                <strong style={{ minWidth: "120px", color: "#555" }}>Historique visible :</strong>
                {editing ? (
                  <input
                    type="checkbox"
                    checked={profile.showParticipationHistory !== false}
                    onChange={(e) => handleChange('showParticipationHistory', e.target.checked)}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (
                  <span style={{ color: "#555" }}>{profile.showParticipationHistory !== false ? 'Oui' : 'Non'}</span>
                )}
              </div>

            </div>
          )}
        </div>

        <div style={{ display:'flex', gap:10 }}>
          {!editing ? (
            <>
              <button 
                onClick={handleEdit} 
                style={{ 
                  padding: "8px 16px",
                  backgroundColor: "#646cff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#4e53d6"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#646cff"}
              >
                Modifier mon profil
              </button>
              <button 
                onClick={handleLogout} 
                style={{ 
                  padding: "8px 16px", 
                  background: "#dc3545", 
                  color: "#fff", 
                  border: "none", 
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c82333"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#dc3545"}
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={handleSave}
                disabled={saving}
                style={{ 
                  padding: "8px 16px",
                  backgroundColor: saving ? "#ccc" : "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = "#218838";
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = "#28a745";
                }}
              >
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </button>
              <button 
                onClick={handleCancel}
                disabled={saving}
                style={{ 
                  padding: "8px 16px",
                  backgroundColor: saving ? "#ccc" : "#6c757d",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: saving ? "not-allowed" : "pointer",
                  fontSize: "14px"
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = "#5a6268";
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = "#6c757d";
                }}
              >
                Annuler
              </button>
            </>
          )}
        </div>
      </div>


        {/* Favoris */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#333", marginBottom: "15px" }}>Mes favoris</h3>
          {favorites.length === 0 ? (
            <div style={{ padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "6px", color: "#6c757d", textAlign: 'center' }}>
              Vous n'avez pas encore ajouté de favoris.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
              {favorites.map((place) => (
                <div key={place.id} style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
                  <div style={{ height: 110, backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {place.photos && place.photos.length > 0 ? (
                      <img src={place.photos[0].startsWith('/') ? `${API_CONFIG.BACKEND_URL}${place.photos[0]}` : `${API_CONFIG.BACKEND_URL}/${place.photos[0]}`} alt={place.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ fontSize: 36 }}>{/* placeholder */}📍</div>
                    )}
                  </div>
                  <div style={{ padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, color: '#333', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{place.name}</div>
                      <div style={{ fontSize: 12, color: '#6c757d' }}>{place.city?.name || ''}</div>
                    </div>
                    <div>
                      <button onClick={() => handleGoToPlace(place.id)} style={{ padding: '6px 10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Voir</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      {/* Participations actives */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#333", marginBottom: "15px" }}>
           Mes participations actives
        </h3>
        
        {activeParticipations.length === 0 ? (
          <div 
            style={{ 
              padding: "20px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "6px",
              textAlign: "center",
              color: "#6c757d"
            }}
          >
            <p style={{ margin: 0 }}>Aucune participation active pour le moment.</p>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
              Cliquez sur "J'y vais aujourd'hui" sur un lieu pour commencer !
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {activeParticipations.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: "16px", 
                      fontWeight: "600", 
                      color: "#333",
                      marginBottom: "5px"
                    }}>
                      📍 {p.placeName || "Lieu inconnu"}
                    </div>
                    <div style={{ fontSize: "14px", color: "#6c757d" }}>
                      📅 {p.participationDate ? new Date(p.participationDate).toLocaleDateString('fr-FR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      }) : "Date inconnue"}
                    </div>
                    {p.participationDate && new Date(p.participationDate).toDateString() === new Date().toDateString() && (
                      <div style={{ 
                        display: "inline-block",
                        marginTop: "8px",
                        padding: "4px 10px",
                        backgroundColor: "#d4edda",
                        color: "#155724",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        🎉 Aujourd'hui !
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "8px", marginLeft: "15px" }}>
                    <button
                      onClick={() => handleGoToPlace(p.placeId)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0056b3"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#007bff"}
                    >
                      Voir le lieu
                    </button>
                    <button
                      onClick={() => handleCancelParticipation(p.id, p.placeName)}
                      disabled={cancelingId === p.id}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: cancelingId === p.id ? "#ccc" : "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        cursor: cancelingId === p.id ? "not-allowed" : "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                        whiteSpace: "nowrap"
                      }}
                      onMouseEnter={(e) => {
                        if (cancelingId !== p.id) e.currentTarget.style.backgroundColor = "#c82333";
                      }}
                      onMouseLeave={(e) => {
                        if (cancelingId !== p.id) e.currentTarget.style.backgroundColor = "#dc3545";
                      }}
                    >
                      {cancelingId === p.id ? "..." : "Annuler"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Historique des participations passées */}
      {pastParticipations.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ color: "#333", marginBottom: "15px" }}>
             Historique des participations
          </h3>
          
          <div 
            style={{ 
              border: "1px solid #ddd", 
              borderRadius: "8px",
              overflow: "hidden"
            }}
          >
            {/* En-tête du tableau */}
            <div 
              style={{ 
                display: "grid",
                gridTemplateColumns: "1fr auto auto",
                backgroundColor: "#6c757d",
                color: "#fff",
                padding: "12px 15px",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              <div>Lieu</div>
              <div style={{ textAlign: "center", minWidth: "100px" }}>Date</div>
              <div style={{ textAlign: "center", minWidth: "80px" }}>Action</div>
            </div>

            {/* Corps du tableau avec scroll */}
            <div 
              style={{ 
                maxHeight: "250px",
                overflowY: "auto",
                backgroundColor: "#fff"
              }}
            >
              {pastParticipations.map((p, index) => (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    padding: "12px 15px",
                    borderBottom: index < pastParticipations.length - 1 ? "1px solid #e9ecef" : "none",
                    alignItems: "center",
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa"
                  }}
                >
                  <div style={{ color: "#6c757d", fontWeight: "500" }}>
                    {p.placeName || "Lieu inconnu"}
                  </div>
                  <div style={{ color: "#6c757d", fontSize: "13px", textAlign: "center", minWidth: "100px" }}>
                    {p.participationDate ? new Date(p.participationDate).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : "Date inconnue"}
                  </div>
                  <div style={{ textAlign: "center", minWidth: "80px" }}>
                    <button
                      onClick={() => handleGoToPlace(p.placeId)}
                      style={{
                        padding: "4px 10px",
                        backgroundColor: "#6c757d",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "12px"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#5a6268"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#6c757d"}
                    >
                      Voir
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer avec compteur */}
            <div 
              style={{ 
                padding: "10px 15px",
                backgroundColor: "#f8f9fa",
                borderTop: "1px solid #ddd",
                fontSize: "13px",
                color: "#6c757d",
                textAlign: "center"
              }}
            >
              {pastParticipations.length} participation{pastParticipations.length > 1 ? 's' : ''} passée{pastParticipations.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Profile;
