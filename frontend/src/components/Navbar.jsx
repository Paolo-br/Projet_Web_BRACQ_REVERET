import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import authService from "../services/authService";
import userService from "../services/userService";
import API_CONFIG from "../config/apiConfig";
import RoleBadge from "./RoleBadge";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [_userRoles, _setUserRoles] = useState([]);

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());
    if (authService.isAuthenticated()) {
      // Récupérer les rôles de l'utilisateur
      const roles = authService.getUserRoles();
      setUserRoles(roles);
      
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

  const _handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Si on n'est pas sur la page d'accueil, naviguer d'abord vers la page d'accueil
      navigate('/');
      // Attendre un peu que la page se charge avant de scroller
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Si on est déjà sur la page d'accueil, scroller directement
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        zIndex: 1000
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img 
          src={Logo}
          alt="Logo" 
          style={{ height: "100px", cursor: "pointer" }} 
          onClick={() => window.location.href = "/"} 
        />
      </div>

      {/* Liens de navigation */}
      <div style={{
        display: "flex",
        gap: "30px",
        alignItems: "center",
        flex: 1,
        justifyContent: "center"
      }}>
        <button
          onClick={() => scrollToSection('section-carte')}
          style={{
            background: "none",
            border: "none",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
            e.currentTarget.style.color = "#646cff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#333";
          }}
        >
          Carte
        </button>
        <button
          onClick={() => scrollToSection('section-villes')}
          style={{
            background: "none",
            border: "none",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
            e.currentTarget.style.color = "#646cff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#333";
          }}
        >
          Villes
        </button>
        <button
          onClick={() => scrollToSection('section-lieux')}
          style={{
            background: "none",
            border: "none",
            color: "#333",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: "6px",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#e0e0e0";
            e.currentTarget.style.color = "#646cff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#333";
          }}
        >
          Lieux
        </button>
      </div>

      {/* Boutons à droite */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {isAuthenticated ? (
          // Utilisateur connecté : afficher le bouton profil et les rôles
          <>
            {/* Badge admin si l'utilisateur est admin */}
            {authService.isAdmin() && (
              <Link 
                to="/admin"
                style={{ textDecoration: "none" }}
                title="Panneau d'administration"
              >
                <RoleBadge role="ADMIN" size="small" />
              </Link>
            )}
            
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
          </>
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
