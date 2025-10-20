import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    city: "",
    country: "",
    languages: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    // 🔹 Ici tu ajouteras plus tard l'envoi à ton backend
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {/* Prénom */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="firstName" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Prénom</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Nom */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left"}}>
          <label htmlFor="lastName" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Nom</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="email" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000"}}>Email</label>
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
          <label htmlFor="password" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Mot de passe</label>
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

        {/* Âge */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="age" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Âge</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Ville */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="city" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Ville à découvrir</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Pays */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="country" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Pays d'origine</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        {/* Langues parlées */}
        <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
          <label htmlFor="languages" style={{ marginBottom: "5px", fontWeight: "bold",color: "#000" }}>Langues parlées</label>
          <input
            type="text"
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
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
          S’inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;
