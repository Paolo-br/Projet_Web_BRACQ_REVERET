import { useParams } from "react-router-dom";

function City() {
  const { cityName } = useParams();

  // 🔹 Exemple de données (tu pourras les mettre dans un fichier séparé plus tard)
  const cityData = {
    Paris: {
      image: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Paris_as_seen_from_the_Tour_Saint-Jacques_2011_07.jpg",
      activities: [
        {
          name: "Tour Eiffel",
          description: "Monument emblématique de Paris, parfait pour admirer la ville d’en haut.",
          image: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg"
        },
        {
          name: "Louvre",
          description: "Musée célèbre accueillant des œuvres comme la Joconde.",
          image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Louvre_Museum_Wikimedia_Commons.jpg"
        }
      ]
    },
    Rome: {
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
      activities: [
        {
          name: "Colisée",
          description: "Ancien amphithéâtre romain, symbole de la ville.",
          image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg"
        }
      ]
    }
  };

  const city = cityData[cityName];

  if (!city) {
    return <h2 style={{ marginTop: "80px", textAlign: "center" }}>Ville non trouvée</h2>;
  }

  return (
    <div style={{ marginTop: "60px" }}>
      {/* Image de couverture */}
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
          alt={cityName}
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
            textShadow: "2px 2px 5px rgba(0,0,0,0.7)"
          }}
        >
          {cityName}
        </h1>
      </div>

      {/* Contenu principal */}
      <div style={{ display: "flex", marginTop: "20px", padding: "20px" }}>
        
        {/* Activités (à gauche) */}
        <div style={{ flex: 3, display: "flex", flexDirection: "column", gap: "20px" }}>
          <h2>Activités à {cityName}</h2>
          {city.activities.map((activity, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
              }}
            >
              <img
                src={activity.image}
                alt={activity.name}
                style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
              />
              <div>
                <h3 style={{ margin: "0 0 5px 0" }}>{activity.name}</h3>
                <p style={{ margin: 0, color: "#555" }}>{activity.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Espace infos (à droite) */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h3>Infos utiles</h3>
          <p>(Tu pourras mettre ici des infos pratiques, météo, transports...)</p>
        </div>
      </div>
    </div>
  );
}

export default City;





