import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService";
import API_CONFIG from "../config/apiConfig";

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [participations, setParticipations] = useState([]);
  const [cities, setCities] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!authService.isAuthenticated()) {
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
        // charger participations
        const parts = await userService.getParticipations(data.id);
        setParticipations(parts);
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

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    // Recharger pour mettre à jour la navbar
    window.location.reload();
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
        profilePictureUrl: profile.profilePictureUrl
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
      </div>

      {/* Informations */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#333", marginBottom: "15px" }}>Informations du compte</h3>
        <div style={{ padding: "15px", backgroundColor: "#f5f5f5", borderRadius: "6px", marginBottom: "10px" }}>
          {!profile ? (
            <p>Chargement...</p>
          ) : (
            <div>
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


      {/* Historique des participations */}
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#333", marginBottom: "15px" }}>
          📍 Historique de mes participations
        </h3>
        
        {participations.length === 0 ? (
          <div 
            style={{ 
              padding: "20px", 
              backgroundColor: "#f8f9fa", 
              borderRadius: "6px",
              textAlign: "center",
              color: "#6c757d"
            }}
          >
            <p style={{ margin: 0 }}>Aucune participation enregistrée pour le moment.</p>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
              Cliquez sur "J'y vais aujourd'hui" sur un lieu pour commencer !
            </p>
          </div>
        ) : (
          <div 
            style={{ 
              border: "1px solid #ddd", 
              borderRadius: "6px",
              overflow: "hidden"
            }}
          >
            {/* En-tête du tableau */}
            <div 
              style={{ 
                display: "grid",
                gridTemplateColumns: "1fr auto",
                backgroundColor: "#646cff",
                color: "#fff",
                padding: "12px 15px",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              <div>Lieu</div>
              <div style={{ textAlign: "right" }}>Date</div>
            </div>

            {/* Corps du tableau avec scroll */}
            <div 
              style={{ 
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "#fff"
              }}
            >
              {participations.map((p, index) => (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    padding: "12px 15px",
                    borderBottom: index < participations.length - 1 ? "1px solid #e9ecef" : "none",
                    transition: "background-color 0.2s",
                    backgroundColor: index % 2 === 0 ? "#fff" : "#f8f9fa"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e7f1ff"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#fff" : "#f8f9fa"}
                >
                  <div style={{ color: "#333", fontWeight: "500" }}>
                    {p.placeName || "Lieu inconnu"}
                  </div>
                  <div style={{ color: "#6c757d", fontSize: "14px", textAlign: "right" }}>
                    {p.participationDate ? new Date(p.participationDate).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    }) : "Date inconnue"}
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
              {participations.length} participation{participations.length > 1 ? 's' : ''} au total
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default Profile;
