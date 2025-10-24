import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import API_CONFIG from "../config/apiConfig";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    yearOfBirth: "2000",
    currentCity: "",
    countryOrigin: ""
  });
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);

  // Charger les villes au montage du composant
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.ALL);
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des villes:', error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // Effacer l'erreur lors de la saisie
  };

  // Styles communs pour les champs de formulaire
  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    color: "#333",
    backgroundColor: "#fff"
  };

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#000"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convertir l'année de naissance en nombre
      const userData = {
        ...formData,
        yearOfBirth: parseInt(formData.yearOfBirth, 10)
      };

      await authService.register(userData);
      
      // Succès : rediriger vers la page de connexion
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Erreur lors de l'inscription. Veuillez réessayer.");
      console.error("Erreur d'inscription:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "80px auto", // espace sous la navbar
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}
    >
      {/* Titre */}
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#333",
          fontSize: "1.8rem"
        }}
      >
        Créez un compte
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
        
        {/* Prénom */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="firstName" style={labelStyle}>Prénom *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Nom */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left"}}>
          <label htmlFor="lastName" style={labelStyle}>Nom *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="email" style={labelStyle}>Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Mot de passe */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="password" style={labelStyle}>Mot de passe *</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Année de naissance */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="yearOfBirth" style={labelStyle}>Année de naissance *</label>
          <input
            type="number"
            id="yearOfBirth"
            name="yearOfBirth"
            min="1900"
            max="2007"
            value={formData.yearOfBirth}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        {/* Ville */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="currentCity" style={labelStyle}>Ville actuelle *</label>
          <select
            id="currentCity"
            name="currentCity"
            value={formData.currentCity}
            onChange={handleChange}
            required
            disabled={loadingCities}
            style={{
              ...inputStyle,
              cursor: loadingCities ? "wait" : "pointer"
            }}
          >
            <option value="" style={{ color: "#999" }}>-- Sélectionnez une ville --</option>
            {cities.map(city => (
              <option key={city.id} value={city.name} style={{ color: "#333" }}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Pays */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="countryOrigin" style={labelStyle}>Pays d'origine</label>
          <input
            type="text"
            id="countryOrigin"
            name="countryOrigin"
            value={formData.countryOrigin}
            onChange={handleChange}
            style={inputStyle}
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
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>

      {/* Aide mot de passe */}
      <p style={{ 
        marginTop: "15px", 
        fontSize: "0.85rem", 
        color: "#666", 
        textAlign: "center",
        lineHeight: "1.4"
      }}>
        Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre.
      </p>
    </div>
  );
}

export default Register;
