import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

// Service pour les participations
export const participationService = {
  // "J'y vais aujourd'hui"
  async participate(placeId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.CREATE, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ placeId }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Vous devez être connecté pour participer');
      }
      throw new Error('Erreur lors de la participation');
    }

    return response.json();
  },

  // Annuler sa participation
  async cancelParticipation(participationId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.DELETE(participationId), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'annulation');
    }
  },

  // Voir qui participe à un lieu
  async getParticipations(placeId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.GET_BY_PLACE(placeId));

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des participations');
    }

    return response.json();
  },
};

export default participationService;

