import { useEffect, useState } from "react";
import API_CONFIG from "../config/apiConfig";
import MapView from "../components/MapView";
import Carousel from "../components/Carousel";
import { CityCard, PlaceCard } from "../components/Cards";
import QuickFilters from "../components/QuickFilters";
import { placeService } from "../services/placeService";

function Home() {
  const [cities, setCities] = useState([]);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée pour le filtre
  const [loading, setLoading] = useState(true);
  const [loadingPlaces, setLoadingPlaces] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger les villes
        const citiesResponse = await fetch(API_CONFIG.ENDPOINTS.CITIES.ALL);
        if (!citiesResponse.ok) throw new Error('Erreur lors du chargement des villes');
        const citiesData = await citiesResponse.json();
        setCities(citiesData);
        setLoading(false);

        // Charger les lieux
        try {
          const placesResponse = await fetch(API_CONFIG.ENDPOINTS.PLACES.ALL);
          console.log('Places response status:', placesResponse.status);
          console.log('Places response headers:', placesResponse.headers.get('content-type'));
          
          if (!placesResponse.ok) {
            const errorText = await placesResponse.text();
            console.error('Places response error:', errorText);
            throw new Error('Erreur lors du chargement des lieux');
          }
          
          const placesData = await placesResponse.json();
          console.log('Places data loaded:', placesData.length, 'places');
          setPlaces(placesData);
          setFilteredPlaces(placesData);
        } catch (placeError) {
          console.error('Erreur détaillée pour les lieux:', placeError);
          // Continuer même si les lieux ne se chargent pas
          setPlaces([]);
          setFilteredPlaces([]);
        }
        
        setLoadingPlaces(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
        setLoadingPlaces(false);
      }
    };

    fetchData();
  }, []);

  // Filtre par catégorie uniquement (pour les boutons de filtre rapide)
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter(place => place.category === category));
    }
  };

  return (
    <div style={{ 
      marginTop: "20px", 
      marginBottom: "40px",
      maxWidth: "1400px",
      marginLeft: "auto",
      marginRight: "auto",
      padding: "0 40px"
    }}>
      {/* Hero Section */}
      <div style={{ 
        marginTop: "60px",
        marginBottom: "50px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "white",
          margin: "0 0 15px 0"
        }}>
          Partage des moments inoubliables
        </h1>
        <p style={{
          fontSize: "1.2rem",
          color: "white",
          margin: "0 0 30px 0"
        }}>
          Suivez vos envies et explorez les meilleures destinations en France
        </p>
      </div>

      {/* Section Carte interactive */}
      <div style={{ marginBottom: "60px" }}>
        <h2 style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          margin: "0 0 20px 0",
          color: "white"
        }}>
          Explorez la carte
        </h2>
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "500px",
              border: "2px dashed #aaa",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: "1.2rem"
            }}
          >
            Chargement de la carte...
          </div>
        ) : cities.length > 0 ? (
          <MapView cities={cities} />
        ) : (
          <div
            style={{
              width: "100%",
              height: "500px",
              border: "2px dashed #aaa",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: "1.2rem"
            }}
          >
            Aucune ville à afficher sur la carte
          </div>
        )}
      </div>

      {/* Section Explorer par ville */}
      {!loading && cities.length > 0 && (
        <Carousel 
          title="Explorer par ville"
          subtitle="Ces destinations prisées ont beaucoup à offrir"
        >
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </Carousel>
      )}

      {/* Section Tous les Lieux avec Filtres par Catégorie */}
      {!loadingPlaces && (
        <div style={{ marginTop: "60px" }}>
          {/* Titre de la section */}
          <h2 style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            margin: "0 0 20px 0",
            color: "white"
          }}>
            Découvrez nos lieux
          </h2>

          {/* Boutons de filtre par catégorie */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <button
              onClick={() => handleCategoryFilter('')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === '' ? '#007bff' : '#e9ecef',
                color: selectedCategory === '' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === '' ? '0 2px 8px rgba(0,123,255,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== '') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== '') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              Tous les lieux ({places.length})
            </button>

            <button
              onClick={() => handleCategoryFilter('BAR')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'BAR' ? '#ff6b6b' : '#e9ecef',
                color: selectedCategory === 'BAR' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'BAR' ? '0 2px 8px rgba(255,107,107,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'BAR') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'BAR') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              🍺 Bars ({places.filter(p => p.category === 'BAR').length})
            </button>

            <button
              onClick={() => handleCategoryFilter('MUSEE')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'MUSEE' ? '#f06595' : '#e9ecef',
                color: selectedCategory === 'MUSEE' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'MUSEE' ? '0 2px 8px rgba(240,101,149,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'MUSEE') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'MUSEE') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              🎨 Musées ({places.filter(p => p.category === 'MUSEE').length})
            </button>

            <button
              onClick={() => handleCategoryFilter('BOITE_DE_NUIT')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'BOITE_DE_NUIT' ? '#a05fdb' : '#e9ecef',
                color: selectedCategory === 'BOITE_DE_NUIT' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'BOITE_DE_NUIT' ? '0 2px 8px rgba(160,95,219,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'BOITE_DE_NUIT') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'BOITE_DE_NUIT') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              🎵 Boîtes de nuit ({places.filter(p => p.category === 'BOITE_DE_NUIT').length})
            </button>

            <button
              onClick={() => handleCategoryFilter('PARC')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'PARC' ? '#51cf66' : '#e9ecef',
                color: selectedCategory === 'PARC' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'PARC' ? '0 2px 8px rgba(81,207,102,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'PARC') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'PARC') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              🌳 Parcs ({places.filter(p => p.category === 'PARC').length})
            </button>

            <button
              onClick={() => handleCategoryFilter('BIBLIOTHEQUE')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'BIBLIOTHEQUE' ? '#339af0' : '#e9ecef',
                color: selectedCategory === 'BIBLIOTHEQUE' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'BIBLIOTHEQUE' ? '0 2px 8px rgba(51,154,240,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'BIBLIOTHEQUE') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'BIBLIOTHEQUE') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              📚 Bibliothèques ({places.filter(p => p.category === 'BIBLIOTHEQUE').length})
            </button>

            <button
              onClick={() => handleCategoryFilter('MONUMENT_HISTORIQUE')}
              style={{
                padding: '10px 20px',
                backgroundColor: selectedCategory === 'MONUMENT_HISTORIQUE' ? '#868e96' : '#e9ecef',
                color: selectedCategory === 'MONUMENT_HISTORIQUE' ? 'white' : '#495057',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedCategory === 'MONUMENT_HISTORIQUE' ? '0 2px 8px rgba(134,142,150,0.3)' : '0 2px 5px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'MONUMENT_HISTORIQUE') {
                  e.target.style.backgroundColor = '#dee2e6';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'MONUMENT_HISTORIQUE') {
                  e.target.style.backgroundColor = '#e9ecef';
                }
              }}
            >
              🏛️ Monuments ({places.filter(p => p.category === 'MONUMENT_HISTORIQUE').length})
            </button>
          </div>

          {/* Carrousel unique pour tous les lieux */}
          {filteredPlaces.length > 0 ? (
            <Carousel 
              title={null}
              subtitle={`${filteredPlaces.length} lieu${filteredPlaces.length > 1 ? 'x' : ''} ${selectedCategory ? 'dans cette catégorie' : 'au total'}`}
            >
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </Carousel>
          ) : (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#888"
            }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                Aucun lieu trouvé
              </h3>
              <p>Aucun lieu disponible dans cette catégorie</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
