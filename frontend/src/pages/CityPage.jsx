// src/pages/CityPage.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API_CONFIG from "../config/apiConfig";
import QuickFilters from "../components/QuickFilters";
import PlaceBubble from "../components/PlaceBubble";

function CityPage() {
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');


  useEffect(() => {
        const abortController = new AbortController();
        
        const fetchCityData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Décoder le nom de la ville depuis l'URL
                const decodedCityName = decodeURIComponent(cityName);
                console.log('Recherche de la ville:', decodedCityName);

                // 1. Récupérer la ville par son nom directement
                const cityUrl = API_CONFIG.ENDPOINTS.CITIES.BY_NAME(decodedCityName);
                console.log('URL appelée:', cityUrl);

                const cityResponse = await fetch(cityUrl, { signal: abortController.signal });
                console.log('Statut réponse:', cityResponse.status);
                console.log('Headers:', Object.fromEntries(cityResponse.headers.entries()));

                if (!cityResponse.ok) {
                    const errorText = await cityResponse.text();
                    console.error('Erreur backend:', errorText);
                    if (cityResponse.status === 404) {
                        throw new Error(`Ville "${decodedCityName}" non trouvée (404)`);
                    }
                    throw new Error(`Erreur ${cityResponse.status}: ${errorText || 'Erreur lors du chargement de la ville'}`);
                }

                const foundCity = await cityResponse.json();
                console.log('Ville trouvée:', foundCity);
                setCity(foundCity);

                // 2. Récupérer les lieux de cette ville
                const placesUrl = API_CONFIG.ENDPOINTS.PLACES.BY_CITY(foundCity.id);
                console.log('URL des lieux:', placesUrl);

                const placesResponse = await fetch(placesUrl, { signal: abortController.signal });
                console.log('Statut places:', placesResponse.status);
                
                if (!placesResponse.ok) {
                    console.warn('Impossible de charger les lieux (erreur backend)');
          setPlaces([]); // Continuer sans les lieux
          setFilteredPlaces([]);
                } else {
                    const placesData = await placesResponse.json();
                    console.log('Lieux trouvés:', placesData.length);
          setPlaces(placesData);
          setFilteredPlaces(placesData);
                }

            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('Requête annulée');
                    return;
                }
                console.error('Erreur:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
        
        // Cleanup : annule la requête si le composant est démonté
        return () => abortController.abort();
    }, [cityName]);

  // Gestion du filtrage par catégorie (réutilise le même comportement que sur la page d'accueil)
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category || '');
    if (!category) {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter((p) => p.category === category));
    }
  };

  if (loading) {
    return <h2 style={{ marginTop: "80px", textAlign: "center" }}>Chargement...</h2>;
  }

  if (error) {
    return (
      <div style={{ marginTop: "80px", textAlign: "center" }}>
        <h2>Erreur</h2>
        <p style={{ color: "#d32f2f", marginTop: "20px" }}>{error}</p>
        <p style={{ color: "#666", marginTop: "10px" }}>Ville recherchée : {cityName}</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div style={{ marginTop: "80px", textAlign: "center" }}>
        <h2>Ville non trouvée</h2>
        <p style={{ color: "#666", marginTop: "10px" }}>Ville recherchée : {cityName}</p>
      </div>
    );
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
          src={city.imageUrl ? `${API_CONFIG.BACKEND_URL}${city.imageUrl}` : `${API_CONFIG.BACKEND_URL}/uploads/paris.jpg`}
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
        {city.description || `Découvrez les meilleurs lieux à ${city.name} !`}
      </p>

      {/* Liste des lieux */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 20px" }}>
        <h2 style={{ marginBottom: "20px" }}>Lieux à {city.name}</h2>
        {/* Filtres rapides (comme sur la page d'accueil) */}
        <div style={{ marginBottom: '20px' }}>
            <QuickFilters
              places={places}
              selectedCategory={selectedCategory}
              onCategorySelect={(cat) => handleCategoryFilter(cat)}
            />

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <button
              onClick={() => handleCategoryFilter('')}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: selectedCategory === '' ? '#007bff' : '#e9ecef',
                color: selectedCategory === '' ? '#fff' : '#333',
                cursor: 'pointer'
              }}
            >
              Tous les lieux ({places.length})
            </button>
          </div>

          {filteredPlaces.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888" }}>
              Aucun lieu disponible pour cette ville pour le moment.
            </p>
          ) : (
            filteredPlaces.map((place) => (
              <PlaceBubble key={place.id} place={place} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CityPage;
