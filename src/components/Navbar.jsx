// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

function Navbar() {
  return (
    <nav 
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #ddd",
        position: "fixed",   // 🔹 fixé en haut
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
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/register" style={{ textDecoration: "none", color: "#333" }}>
          S’inscrire
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
          Se connecter
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
