// src/pages/CityPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Exemple de données temporaires (avant ta base de données)
const fakeCities = {
  paris: {
    name: "Paris",
    image: "/Paris.jpg",
    description: "La ville lumière, capitale de la culture et de la gastronomie.",
    activities: [
      { id: 1, title: "Soirée Erasmus au Bar Le Duplex", type: "Bar" },
      { id: 2, title: "Croisière sur la Seine", type: "Activité" },
      { id: 3, title: "Cours de cuisine française", type: "Atelier" }
    ]
  },
  lyon: {
    name: "Lyon",
    image: "/Lyon.jpg",
    description: "Ville historique connue pour sa gastronomie et ses traboules.",
    activities: [
      { id: 1, title: "Apéro international à la Confluence", type: "Bar" },
      { id: 2, title: "Visite du Vieux-Lyon", type: "Activité" }
    ]
  },
  lille: {
    name: "Lille",
    image: "/Lille.jpg",
    description: "Ville chaleureuse du Nord, pleine de vie étudiante.",
    activities: [
      { id: 1, title: "Soirée Erasmus au Network Bar", type: "Bar" },
      { id: 2, title: "Visite du Palais des Beaux-Arts", type: "Culture" }
    ]
  }
};

function CityPage() {
  const { cityName } = useParams(); // récupère "paris", "lyon", etc. depuis l’URL
  const [city, setCity] = useState(null);

  useEffect(() => {
    // plus tard tu feras ici une requête vers ton backend
    const data = fakeCities[cityName.toLowerCase()];
    setCity(data);
  }, [cityName]);

  if (!city) {
    return <h2 style={{ marginTop: "80px", textAlign: "center" }}>Ville non trouvée </h2>;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      {/* Image en haut */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          overflow: "hidden"
        }}
      >
        <img
          src={city.image}
          alt={city.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(70%)"
          }}
        />
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "3rem",
            fontWeight: "bold",
            textShadow: "0 0 15px rgba(0,0,0,0.6)"
          }}
        >
          {city.name}
        </h1>
      </div>

      {/* Description */}
      <p style={{ maxWidth: "800px", margin: "40px auto", fontSize: "1.2rem", textAlign: "center" }}>
        {city.description}
      </p>

      {/* Liste d’activités */}
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "20px" }}>Annonces et activités à {city.name}</h2>
        {city.activities.map((act) => (
          <div
            key={act.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>{act.title}</h3>
            <p style={{ margin: 0, color: "#555" }}>Type : {act.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CityPage;
