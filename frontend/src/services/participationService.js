import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

/**
 * Fonction helper pour récupérer les données utilisateur depuis le sessionStorage
 * ou depuis l'API si elles sont manquantes.
 */
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

/**
 * Service pour la gestion des participations aux lieux.
 * Permet de créer, annuler et consulter les participations.
 */
export const participationService = {
  /**
   * Crée une participation pour l'utilisateur connecté à un lieu.
   * Optionnellement avec une heure spécifique.
   */
  async participate(placeId, participationTime) {
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
    let url = `${API_CONFIG.ENDPOINTS.PARTICIPATIONS.CREATE}?userId=${userId}&placeId=${placeId}&status=INSCRIT`;
    // participationTime attendu au format HH:mm (optionnel)
    if (participationTime) {
      // S'assurer du format HH:mm (si input fournit HH:mm), sinon ajouter au format
      url += `&participationTime=${encodeURIComponent(participationTime)}`;
    }
    
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

  /**
   * Annule une participation existante par son ID.
   */
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

  /**
   * Récupère toutes les participations pour un lieu donné,
   * filtrées pour ne garder que celles d'aujourd'hui.
   */
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
      return participationDate === today && (p.status === 'INSCRIT' || p.status === 'PRESENT');
    });
  },
  
  /**
   * Récupère toutes les participations d'un utilisateur spécifique.
   */
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

  /**
   * Vérifie si un utilisateur participe déjà aujourd'hui à un lieu donné.
   * Retourne la participation si elle existe, null sinon.
   */
  async checkUserParticipationToday(userId, placeId) {
    try {
      const response = await fetch(API_CONFIG.ENDPOINTS.PARTICIPATIONS.USER_PLACE_TODAY(userId, placeId), {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('jwt_token')}`,
        },
      });

      if (response.status === 404 || response.status === 204) {
        // L'utilisateur ne participe pas
        return null;
      }

      if (!response.ok) {
        // Lire le message d'erreur si possible
        let txt = '';
        try { txt = await response.text(); } catch (e) { /* ignore */ }
        throw new Error(txt || 'Erreur lors de la vérification de la participation');
      }

      return response.json();
    } catch (err) {
      // En cas d'erreur réseau ou d'annulation, retourner null pour indiquer "pas de participation"
      // Evite les logs bruyants dans la console de l'utilisateur.
      return null;
    }
  },
};

export default participationService;

