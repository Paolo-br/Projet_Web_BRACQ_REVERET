const API_BASE_URL = 'http://localhost:8080/api';
const BACKEND_BASE_URL = 'http://localhost:8080';

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
      BY_ID: (id) => `${API_BASE_URL}/places/${id}`,
      BY_CITY: (cityId) => `${API_BASE_URL}/places/city/${cityId}`,
      BY_CATEGORY: (category) => `${API_BASE_URL}/places/category/${category}`,
    },
    MAP: {
      CITIES: `${API_BASE_URL}/map/cities`,
      PLACES_BY_CITY: (cityId) => `${API_BASE_URL}/map/cities/${cityId}/places`,
    },
    PARTICIPATION: {
      ALL: `${API_BASE_URL}/participations`,
      BY_PLACE: (placeId) => `${API_BASE_URL}/participations/place/${placeId}`,
      BY_USER: (userId) => `${API_BASE_URL}/participations/user/${userId}`,
      PARTICIPATE: (placeId) => `${API_BASE_URL}/participations/${placeId}`,
    },
    USER: {
      PROFILE: `${API_BASE_URL}/profile/me`,
      UPDATE: `${API_BASE_URL}/profile/me`,
      UPLOAD_PHOTO: `${API_BASE_URL}/images/user`,
      UPLOAD_MY_PHOTO: `${API_BASE_URL}/profile/me/photo`,
      UPDATE_PASSWORD: `${API_BASE_URL}/users/{id}/password`,
    },
  },
};

// Helper pour récupérer les headers d'authentification
export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('jwt_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export default API_CONFIG;

