import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

// Service pour les villes
export const cityService = {
  // Récupérer toutes les villes
  async getAllCities() {
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.GET_ALL);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des villes');
    }

    return response.json();
  },

  // Récupérer une ville par ID
  async getCityById(id) {
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.GET_BY_ID(id));

    if (!response.ok) {
      throw new Error('Ville non trouvée pipi');
    }

    return response.json();
  },
};

export default cityService;

