
import { Link } from "react-router-dom";

const cities = [
  {
    id: 1,
    name: "Paris",
    description: "La ville lumière, capitale de la culture et de la gastronomie.",
    image: "/Paris.jpg", 
    link: "/ville/paris"
  },
  {
    id: 2,
    name: "Lyon",
    description: "Capitale vibrante de l’Espagne, connue pour sa vie nocturne.",
    image: "/Lyon.jpg",
    link: "/ville/Lyon"
  },
  {
    id: 3,
    name: "Lille",
    description: "La ville éternelle, berceau de l’histoire et de l’art.",
    image: "/Lille.jpg",
    link: "/ville/Lille"
  }
];


function Home() {
  return (
    <div      
      style={{ marginTop: "20px", marginLeft: "40px", marginRight: "40px", marginBottom: "40px"}}>
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

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {cities.map((city) => (
          <div
            key={city.id}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
          >
            {/* Image */}
            <img
              src={city.image}
              alt={city.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginRight: "20px"
              }}
            />

            {/* Texte */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 10px 0",color: "#000" }}>{city.name}</h3>
              <p style={{ margin: 0, color: "#555" }}>{city.description}</p>
            </div>

            {/* Bouton */}
            <Link
              to={city.link}
              style={{
                marginLeft: "20px",
                padding: "8px 16px",
                backgroundColor: "#646cff",
                color: "white",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "500"
              }}
            >
              Visiter
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
