import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

const favoriteService = {
  async getMyFavorites() {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.FAVORITES.GET_MY, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Impossible de récupérer les favoris');
    }
    return await res.json();
  },

  async addFavorite(placeId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.FAVORITES.ADD(placeId), {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de l\'ajout aux favoris');
    }
    return;
  },

  async removeFavorite(placeId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.FAVORITES.REMOVE(placeId), {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de la suppression du favori');
    }
    return;
  }
};

export default favoriteService;
