import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import authService from "../services/authService";
import userService from "../services/userService";
import API_CONFIG from "../config/apiConfig";

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    if (authService.isAuthenticated()) {
      (async () => {
        try {
          const profile = await userService.getMyProfile();
          if (profile && profile.profilePictureUrl) {
            const rel = profile.profilePictureUrl;
            const src = rel.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${rel}` : `${API_CONFIG.BACKEND_URL}/${rel}`;
            setProfilePhoto(src);
          }
        } catch (e) {
          console.debug('Navbar: impossible de charger la photo de profil', e);
        }
      })();
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <nav 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        zIndex: 1000
      }}
    >
      {/* Logo + Accueil */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img 
          src={Logo}
          alt="Logo" 
          style={{ height: "80px", cursor: "pointer" }} 
          onClick={() => window.location.href = "/"} 
        />
        <Link to="/" style={{ textDecoration: "none", fontWeight: "bold", color: "#333" }}>
          Accueil
        </Link>
      </div>

      {/* Boutons à droite */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {isAuthenticated ? (
          // Utilisateur connecté : afficher le bouton profil
          <div style={{ position: "relative" }}>
            <Link 
              to="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "#333"
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#646cff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                title="Mon profil"
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = ''; setProfilePhoto(null); }} />
                ) : (
                  '👤'
                )}
              </div>
            </Link>
          </div>
        ) : (
          // Utilisateur non connecté : afficher les liens d'inscription et connexion
          <>
            <Link to="/register" style={{ textDecoration: "none", color: "#333", fontWeight: "500" }}>
              S'inscrire
            </Link>
            <Link 
              to="/login" 
              style={{ 
                textDecoration: "none", 
                color: "white",
                backgroundColor: "#646cff",
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500",
                transition: "background-color 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#5458d9"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#646cff"}
            >
              Se connecter
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
