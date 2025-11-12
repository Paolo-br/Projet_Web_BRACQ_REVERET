import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

/**
 * Service pour la gestion des villes.
 * Permet de récupérer les informations des villes depuis l'API.
 */
export const cityService = {
  /**
   * Récupère la liste de toutes les villes.
   */
  async getAllCities() {
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.GET_ALL);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des villes');
    }

    return response.json();
  },

  /**
   * Récupère une ville spécifique par son ID.
   */
  async getCityById(id) {
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.GET_BY_ID(id));

    if (!response.ok) {
      throw new Error('Ville non trouvée pipi');
    }

    return response.json();
  },
};

export default cityService;

