import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

function Profile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Récupérer l'email de l'utilisateur
    const email = authService.getCurrentUserEmail();
    setUserEmail(email);
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
        <h2 style={{ margin: "10px 0", color: "#333" }}>Mon Profil</h2>
        <p style={{ color: "#666", margin: "5px 0" }}>{userEmail}</p>
      </div>

      {/* Informations */}
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ color: "#333", marginBottom: "15px" }}>Informations du compte</h3>
        <div style={{ 
          padding: "15px", 
          backgroundColor: "#f5f5f5", 
          borderRadius: "6px",
          marginBottom: "10px"
        }}>
          <p style={{ margin: "5px 0", color: "#555" }}>
            <strong>Email :</strong> {userEmail}
          </p>
        </div>
      </div>

      {/* Bouton de déconnexion */}
      <button
        onClick={handleLogout}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#c82333"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#dc3545"}
      >
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;
