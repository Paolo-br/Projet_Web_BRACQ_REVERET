import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../config/apiConfig";

function Home() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.ALL);
        if (!response.ok) throw new Error('Erreur lors du chargement des villes');

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return (
    <div style={{ marginTop: "20px", marginLeft: "40px", marginRight: "40px", marginBottom: "40px"}}>
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "400px",
          marginTop: "60px",
          border: "2px dashed #aaa",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#aaa",
          fontSize: "1.2rem"
        }}
      >
        Carte à venir...
      </div>

      {/* Section Explorer par ville */}
      <h2 style={{ marginTop: "50px", marginBottom: "20px" }}>
        Explorer par ville
      </h2>

      {loading ? (
        <p style={{ textAlign: "center", color: "#888" }}>Chargement des villes...</p>
      ) : cities.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>Aucune ville disponible.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px"
          }}
        >
          {cities.map((city) => {
            const cityUrl = `/city/${encodeURIComponent(city.name)}`;
            console.log(`🔗 Lien généré pour ${city.name}: ${cityUrl}`);
            return (
            <Link
              to={cityUrl}
              key={city.id}
              style={{
                textDecoration: "none",
                color: "inherit",
                border: "1px solid #ddd",
                borderRadius: "10px",
                overflow: "hidden",
                backgroundColor: "#fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                transition: "transform 0.2s, box-shadow 0.2s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
              }}
            >
              <img
                src={city.imageUrl ? `${API_CONFIG.BACKEND_URL}${city.imageUrl}` : `${API_CONFIG.BACKEND_URL}/uploads/paris.jpg`}
                alt={city.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3 style={{ 
                  margin: "0 0 10px 0",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#333"
                }}>
                  {city.name}
                </h3>
                <p style={{ 
                  margin: 0, 
                  color: "#555", 
                  fontSize: "0.95rem",
                  lineHeight: "1.4"
                }}>
                  {city.description || `Découvrez ${city.name} !`}
                </p>
              </div>
            </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
