import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Effacer l'erreur lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password);
      
      // Succès : rediriger vers la page d'accueil
      navigate("/");
    } catch (err) {
      setError(err.message || "Erreur lors de la connexion. Veuillez réessayer.");
      console.error("Erreur de connexion:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#333",
          fontSize: "1.8rem"
        }}
      >
        Se connecter
      </h2>

      {/* Message d'erreur */}
      {error && (
        <div style={{
          padding: "10px",
          marginBottom: "15px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "6px",
          color: "#c33",
          textAlign: "center"
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="email" style={{ marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Mot de passe */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="password" style={{ marginBottom: "5px", fontWeight: "bold", color: "#000" }}>Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "15px",
            backgroundColor: loading ? "#999" : "#646cff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>

      {/* Lien vers l'inscription */}
      <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
        Pas encore de compte ?{" "}
        <Link to="/register" style={{ color: "#646cff", fontWeight: "bold" }}>
          S’inscrire
        </Link>
      </p>
    </div>
  );
}

export default Login;
