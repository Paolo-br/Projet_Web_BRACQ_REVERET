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
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.ALL);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des villes');
    }

    return response.json();
  },

  /**
   * Récupère une ville spécifique par son ID.
   */
  async getCityById(id) {
    const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.BY_ID(id));

    if (!response.ok) {
      throw new Error('Ville non trouvée pipi');
    }

    return response.json();
  },

  /**
   * Crée une nouvelle ville (admin uniquement).
   */
  async createCity(cityData) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cities`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(cityData),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Accès refusé. Vous devez être administrateur pour créer une ville.');
      }
      if (response.status === 401) {
        throw new Error('Non authentifié. Veuillez vous reconnecter.');
      }
      const txt = await response.text();
      throw new Error(txt || 'Erreur lors de la création de la ville');
    }

    return response.json();
  },

  /**
   * Met à jour une ville existante (admin uniquement).
   */
  async updateCity(cityId, cityData) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cities/${cityId}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(cityData),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Accès refusé. Vous devez être administrateur pour modifier une ville.');
      }
      if (response.status === 401) {
        throw new Error('Non authentifié. Veuillez vous reconnecter.');
      }
      const txt = await response.text();
      throw new Error(txt || 'Erreur lors de la mise à jour de la ville');
    }

    return response.json();
  },

  /**
   * Supprime une ville (admin uniquement).
   */
  async deleteCity(cityId) {
    const response = await fetch(`${API_CONFIG.BASE_URL}/cities/${cityId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Accès refusé. Vous devez être administrateur pour supprimer une ville.');
      }
      if (response.status === 401) {
        throw new Error('Non authentifié. Veuillez vous reconnecter.');
      }
      const txt = await response.text();
      throw new Error(txt || 'Erreur lors de la suppression de la ville');
    }

    return response.text();
  },

  /**
   * Upload une photo pour une ville (admin uniquement).
   */
  async uploadCityPhoto(cityId, file) {
    const token = localStorage.getItem('jwt_token');
    const form = new FormData();
    form.append('file', file);
    const response = await fetch(`${API_CONFIG.BASE_URL}/images/city/${cityId}`, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: form,
    });

    if (!response.ok) {
      const txt = await response.text();
      throw new Error(txt || 'Erreur lors de l\'upload de la photo');
    }

    return response.text();
  },
};

export default cityService;

