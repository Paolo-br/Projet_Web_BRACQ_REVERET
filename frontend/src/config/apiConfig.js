/**
 * Configuration de l'API et des endpoints du backend.
 * Détecte automatiquement l'URL du backend selon l'environnement.
 */

/**
 * Détermine l'URL du backend selon l'environnement d'exécution.
 * En développement local : utilise localhost:8080
 * En réseau ou production : utilise l'IP actuelle avec le port 8080
 */
const getBackendUrl = () => {
  // Si on accède via localhost, on utilise localhost pour le backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8080';
  }
  // Sinon, on utilise l'IP actuelle avec le port 8080
  return `http://${window.location.hostname}:8080`;
};

const BACKEND_BASE_URL = getBackendUrl();
const API_BASE_URL = `${BACKEND_BASE_URL}/api`;

/**
 * Configuration centralisée de tous les endpoints de l'API.
 * Organise les URLs par domaine fonctionnel (auth, cities, places, etc.).
 */
const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  BACKEND_URL: BACKEND_BASE_URL,
  ENDPOINTS: {
    AUTH: {
      REGISTER: `${API_BASE_URL}/auth/register`,
      LOGIN: `${API_BASE_URL}/auth/login`,
      LOGOUT: `${API_BASE_URL}/auth/logout`,
    },
    CITIES: {
      ALL: `${API_BASE_URL}/cities`,
      BY_NAME: (name) => `${API_BASE_URL}/cities/name/${name}`,
      BY_ID: (id) => `${API_BASE_URL}/cities/${id}`,
    },
    PLACES: {
      ALL: `${API_BASE_URL}/places`,
      GET_ALL: `${API_BASE_URL}/places`,
      BY_ID: (id) => `${API_BASE_URL}/places/${id}`,
      GET_BY_ID: (id) => `${API_BASE_URL}/places/${id}`,
      BY_CITY: (cityId) => `${API_BASE_URL}/places/city/${cityId}`,
      GET_BY_CITY: (cityId) => `${API_BASE_URL}/places/city/${cityId}`,
      BY_CATEGORY: (category) => `${API_BASE_URL}/places/category/${category}`,
      SEARCH: `${API_BASE_URL}/places/search`,
    },
    MAP: {
      CITIES: `${API_BASE_URL}/map/cities`,
      PLACES_BY_CITY: (cityId) => `${API_BASE_URL}/map/cities/${cityId}/places`,
    },
    PARTICIPATIONS: {
      ALL: `${API_BASE_URL}/participations`,
      BY_PLACE: (placeId) => `${API_BASE_URL}/participations/place/${placeId}`,
      GET_BY_PLACE: (placeId) => `${API_BASE_URL}/participations/place/${placeId}`,
      BY_USER: (userId) => `${API_BASE_URL}/participations/user/${userId}`,
      CREATE: `${API_BASE_URL}/participations`,
      DELETE: (participationId) => `${API_BASE_URL}/participations/${participationId}`,
      PARTICIPATE: (placeId) => `${API_BASE_URL}/participations/${placeId}`,
      USER_PLACE_TODAY: (userId, placeId) => `${API_BASE_URL}/participations/user/${userId}/place/${placeId}/today`,
    },
    USER: {
      PROFILE: `${API_BASE_URL}/profile/me`,
      UPDATE: `${API_BASE_URL}/profile/me`,
      SOCIAL_CONNECT: (provider) => `${API_BASE_URL}/profile/me/social/connect/${provider}`,
      SOCIAL_LINK: `${API_BASE_URL}/profile/me/social`,
      UPLOAD_PHOTO: `${API_BASE_URL}/images/user`,
      UPLOAD_MY_PHOTO: `${API_BASE_URL}/profile/me/photo`,
      UPDATE_PASSWORD: `${API_BASE_URL}/users/{id}/password`,
      BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
      FAVORITES: {
        GET_MY: `${API_BASE_URL}/profile/me/favorites`,
        ADD: (placeId) => `${API_BASE_URL}/profile/me/favorites/${placeId}`,
        REMOVE: (placeId) => `${API_BASE_URL}/profile/me/favorites/${placeId}`
      },
    },
  },
};

/**
 * Helper pour générer les headers HTTP avec authentification.
 * Ajoute automatiquement le token JWT s'il existe dans le sessionStorage.
 */
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export default API_CONFIG;

