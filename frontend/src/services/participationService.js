import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

// Fonction helper pour récupérer l'utilisateur depuis le profil si manquant
async function ensureUserData() {
  let userStr = sessionStorage.getItem('user');
  
  // Si l'objet user existe déjà, le retourner
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.id) {
        return user;
      }
    } catch (e) {
      console.error('Erreur parsing user, tentative de récupération:', e);
    }
  }
  
  // Si pas d'objet user ou invalide, tenter de le récupérer depuis l'API
  const token = sessionStorage.getItem('jwt_token');
  if (!token) {
    throw new Error('Vous devez être connecté pour participer (token manquant)');
  }
  
  try {
    const response = await fetch(API_CONFIG.ENDPOINTS.USER.PROFILE, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Erreur ${response.status} lors de la récupération du profil`);
    }
    
    const user = await response.json();
    
    // Stocker pour les prochaines fois
    sessionStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (e) {
    console.error('Impossible de récupérer le profil:', e);
    throw new Error('Informations utilisateur manquantes. Veuillez vous reconnecter.');
  }
}

// Service pour les participations
export const participationService = {
  // "J'y vais aujourd'hui"
  async participate(placeId) {
    // Vérifier le token JWT
    const token = sessionStorage.getItem('jwt_token');
    
    if (!token) {
      throw new Error('Vous devez être connecté pour participer (token manquant)');
    }
    
    // Récupérer ou fetcher les données utilisateur
    let user;
    try {
      user = await ensureUserData();
    } catch (e) {
      console.error('Erreur lors de la récupération des données utilisateur:', e);
      throw e;
    }
    
    const userId = user.id;
    
    if (!userId) {
      throw new Error('ID utilisateur manquant. Veuillez vous reconnecter.');
    }
    
    // Construire l'URL avec les paramètres de requête
    const url = `${API_CONFIG.ENDPOINTS.PARTICIPATIONS.CREATE}?userId=${userId}&placeId=${placeId}&status=INSCRIT`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Vous devez être connecté pour participer');
      }
      const errorText = await response.text();
      throw new Error(errorText || 'Erreur lors de la participation');
    }

    return response.json();
  },

  // Annuler sa participation
  async cancelParticipation(participationId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.DELETE(participationId), {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'annulation');
    }
  },

  // Voir qui participe à un lieu aujourd'hui
  async getParticipations(placeId) {
    const token = sessionStorage.getItem('jwt_token');
    const headers = {};
    
    // Ajouter le token seulement s'il existe (endpoint peut être public ou nécessiter auth)
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.GET_BY_PLACE(placeId), {
      headers: headers
    });

    if (!response.ok) {
      // Récupérer le message d'erreur du backend
      let errorMessage = 'Erreur lors de la récupération des participations';
      try {
        const errorText = await response.text();
        if (errorText) {
          errorMessage += `: ${errorText}`;
        }
      } catch (e) {
        // Ignore si impossible de lire le texte
      }
      console.error(`Erreur ${response.status} lors de getParticipations:`, errorMessage);
      throw new Error(errorMessage);
    }

    const allParticipations = await response.json();
    
    // Filtrer pour ne garder que les participations d'aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    return allParticipations.filter(p => {
      const participationDate = new Date(p.participationDate).toISOString().split('T')[0];
      return participationDate === today && p.status === 'INSCRIT';
    });
  },
  
  // Obtenir les participations d'un utilisateur
  async getParticipationsByUser(userId) {
    const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.BY_USER(userId), {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des participations');
    }

    return response.json();
  },

  // Vérifier si l'utilisateur participe déjà aujourd'hui à un lieu
  async checkUserParticipationToday(userId, placeId) {
    const response = await fetch(
      `${API_CONFIG.BASE_URL}/participations/user/${userId}/place/${placeId}/today`,
      {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`,
        },
      }
    );

    if (response.status === 404) {
      // L'utilisateur ne participe pas
      return null;
    }

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification de la participation');
    }

    return response.json();
  },
};

export default participationService;

