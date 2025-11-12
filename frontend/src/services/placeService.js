import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

/**
 * Service pour la gestion des lieux.
 * Permet de récupérer et rechercher des lieux depuis l'API.
 */
export const placeService = {
  /**
   * Récupère la liste de tous les lieux.
   */
  async getAllPlaces() {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_ALL);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des lieux');
    }

    return response.json();
  },

  /**
   * Récupère un lieu spécifique par son ID.
   */
  async getPlaceById(id) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_BY_ID(id));

    if (!response.ok) {
      throw new Error('Lieu non trouvé');
    }

    return response.json();
  },

  /**
   * Récupère tous les lieux d'une ville spécifique.
   */
  async getPlacesByCity(cityId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PLACES.GET_BY_CITY(cityId));

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des lieux');
    }

    return response.json();
  },

  /**
   * Recherche des lieux avec filtres optionnels (catégorie et/ou ville).
   */
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

