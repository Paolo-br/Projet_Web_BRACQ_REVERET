import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

// Service pour les lieux
export const placeService = {
  // Récupérer tous les lieux
  async getAllPlaces() {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_ALL);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des lieux');
    }

    return response.json();
  },

  // Récupérer un lieu par ID
  async getPlaceById(id) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_BY_ID(id));

    if (!response.ok) {
      throw new Error('Lieu non trouvé');
    }

    return response.json();
  },

  // Récupérer les lieux d'une ville
  async getPlacesByCity(cityId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_BY_CITY(cityId));

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des lieux');
    }

    return response.json();
  },

  // Rechercher des lieux avec filtres
  async searchPlaces(category = null, city = null) {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (city) params.append('city', city);

    const url = `${API_CONFIG.ENDPOINTS.PLACES.SEARCH}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }

    return response.json();
  },
};

export default placeService;

