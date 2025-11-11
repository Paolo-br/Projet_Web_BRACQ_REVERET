import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

/**
 * Service pour la gestion du profil utilisateur.
 * Permet de consulter et modifier le profil, gérer la photo et les liens sociaux.
 */
const userService = {
  /**
   * Récupère le profil de l'utilisateur connecté.
   */
  async getMyProfile() {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.PROFILE, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer le profil');
    return await res.json();
  },

  /**
   * Met à jour le profil de l'utilisateur connecté.
   */
  async updateMyProfile(updateDTO) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.UPDATE, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updateDTO),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de la mise à jour');
    }
    return await res.json();
  },

  /**
   * Upload une photo de profil pour l'utilisateur connecté.
   */
  async uploadMyPhoto(file) {
    const token = sessionStorage.getItem('jwt_token');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.UPLOAD_MY_PHOTO, {
      method: 'POST',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      body: form,
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de l\'upload');
    }
    return await res.text();
  },

  /**
   * Récupère les participations d'un utilisateur spécifique.
   */
  async getParticipations(userId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.BY_USER(userId), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer les participations');
    return await res.json();
  },

  /**
   * Récupère le profil public d'un utilisateur par son ID.
   */
  async getUserById(userId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.BY_ID(userId), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer le profil utilisateur');
    return await res.json();
  },

  /**
   * Récupère l'URL de connexion OAuth pour un fournisseur social.
   */
  async getSocialConnectUrl(provider) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.SOCIAL_CONNECT(provider), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Impossible de récupérer l\'URL de connexion sociale');
    }
    return await res.json();
  },

  /**
   * Lie un profil de réseau social au compte de l'utilisateur.
   */
  async linkSocialUrl(provider, url) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.SOCIAL_LINK, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ provider, url }),
    });
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors du lien du profil social');
    }
    return;
  },
};

export default userService;
