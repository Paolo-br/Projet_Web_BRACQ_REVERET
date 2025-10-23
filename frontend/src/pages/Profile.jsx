import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService";
import API_CONFIG from "../config/apiConfig";

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [participations, setParticipations] = useState([]);
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
        // charger participations
        const parts = await userService.getParticipations(data.id);
        setParticipations(parts);
      } catch (e) {
        console.error('Erreur chargement profil', e);
      }
    })();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/");
    // Recharger pour mettre à jour la navbar
    window.location.reload();
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
              <p style={{ margin: "5px 0", color: "#555" }}><strong>Nom :</strong> {profile.firstName} {profile.lastName}</p>
              <p style={{ margin: "5px 0", color: "#555" }}><strong>Email :</strong> {profile.email}</p>
              <p style={{ margin: "5px 0", color: "#555" }}><strong>Age :</strong> {profile.age}</p>
              <p style={{ margin: "5px 0", color: "#555" }}><strong>Ville :</strong> {profile.currentCity}</p>
              <p style={{ margin: "5px 0", color: "#555" }}><strong>Origine :</strong> {profile.countryOrigin}</p>
            </div>
          )}
        </div>

        <div style={{ display:'flex', gap:10 }}>
          <button onClick={() => setEditing(!editing)} style={{ padding:8 }}>{editing ? 'Annuler' : 'Modifier mon profil'}</button>
          <button onClick={handleLogout} style={{ padding:8, background:'#dc3545', color:'#fff', border:'none', borderRadius:6 }}>Se déconnecter</button>
        </div>
      </div>

      {editing && profile && (
        <EditProfileForm profile={profile} onSaved={(p) => { setProfile(p); setEditing(false); }} onCancel={() => setEditing(false)} />
      )}

      <div style={{ marginTop:30 }}>
        <h3>Mes participations</h3>
        {participations.length === 0 ? (
          <p>Aucune participation trouvée</p>
        ) : (
          <ul>
            {participations.map(p => (
              <li key={p.id}>{p.placeName} — {p.participationDate}</li>
            ))}
          </ul>
        )}
      </div>

      
    </div>
  );
}

export default Profile;

function EditProfileForm({ profile, onSaved, onCancel }) {
  const [form, setForm] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    age: profile.age,
    currentCity: profile.currentCity,
    countryOrigin: profile.countryOrigin,
    profilePictureUrl: profile.profilePictureUrl
  });
  const [saving, setSaving] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Utiliser la constante API_CONFIG pour pointer vers le backend
        const url = API_CONFIG.ENDPOINTS.CITIES.ALL;
        const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
        if (!res.ok) {
          console.warn('Chargement des villes: réponse non OK', res.status);
          return;
        }
        // Défensive: si le serveur retourne HTML (ex: index.html), éviter JSON.parse error
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
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await userService.updateMyProfile(form);
      onSaved(updated);
    } catch (err) {
      alert('Erreur sauvegarde');
    } finally { setSaving(false); }
  };

  return (
    <div style={{ padding:15, background:'#fafafa', borderRadius:6 }}>
      <div style={{ display:'grid', gap:8 }}>
        <input name="firstName" value={form.firstName} onChange={handleChange} />
        <input name="lastName" value={form.lastName} onChange={handleChange} />
        <input name="email" value={form.email} onChange={handleChange} />
        <input name="age" type="number" value={form.age} onChange={handleChange} />
        {/* currentCity select populated from backend */}
        <select name="currentCity" value={form.currentCity} onChange={handleChange}>
          <option value="">-- Choisir une ville --</option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input name="countryOrigin" value={form.countryOrigin} onChange={handleChange} />
      </div>
      <div style={{ display:'flex', gap:8, marginTop:10 }}>
        <button onClick={handleSave} disabled={saving}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        <button onClick={onCancel}>Annuler</button>
      </div>
    </div>
  );
}
