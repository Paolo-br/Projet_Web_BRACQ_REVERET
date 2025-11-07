import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

const userService = {
  async getMyProfile() {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.PROFILE, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer le profil');
    return await res.json();
  },

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

  async getParticipations(userId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.BY_USER(userId), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer les participations');
    return await res.json();
  },

  async getUserById(userId) {
    const res = await fetch(API_CONFIG.ENDPOINTS.USER.BY_ID(userId), {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Impossible de récupérer le profil utilisateur');
    return await res.json();
  },

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
