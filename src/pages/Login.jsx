import { useState } from "react";
import { Link } from "react-router-dom"; // si tu utilises react-router

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Connexion :", formData);
    // 🔹 Ici tu pourras plus tard appeler ton backend pour authentifier l'utilisateur
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
          style={{
            marginTop: "15px",
            backgroundColor: "#646cff",
            color: "white",
            padding: "12px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem"
          }}
        >
          Se connecter
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
