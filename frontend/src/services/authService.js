import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

/**
 * Service d'authentification pour gérer l'inscription, la connexion et la déconnexion des utilisateurs.
 * Stocke le token JWT et les informations utilisateur dans le sessionStorage.
 */
export const authService = {
  /**
   * Inscription d'un nouvel utilisateur.
   */
  async register(userData) {
    const response = await fetch(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      // Essayer de lire la réponse comme JSON ou texte
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.message || error.error || 'Erreur lors de l\'inscription');
      } else {
        const errorText = await response.text();
        throw new Error(errorText || 'Erreur lors de l\'inscription');
      }
    }

    // Le backend renvoie juste un message texte
    const text = await response.text();
    return { message: text };
  },

  /**
   * Connexion d'un utilisateur existant.
   * Stocke le token JWT et récupère le profil utilisateur complet.
   */
  async login(email, password) {
    const response = await fetch(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      // Essayer de lire la réponse comme JSON ou texte
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Email ou mot de passe incorrect');
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    }

    const data = await response.json();

    // Stocker le token
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
      localStorage.setItem('user_email', email);
      
      // Récupérer les informations complètes de l'utilisateur
      try {
        const profileResponse = await fetch(API_CONFIG.ENDPOINTS.USER.PROFILE, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (profileResponse.ok) {
          const userProfile = await profileResponse.json();
          
          // Stocker l'objet utilisateur complet avec l'id et les rôles
          localStorage.setItem('user', JSON.stringify(userProfile));
          
          // Stocker les rôles séparément pour un accès facile
          if (userProfile.roles) {
            let rolesArray;
            // Gérer différents formats de rôles
            if (Array.isArray(userProfile.roles)) {
              rolesArray = userProfile.roles;
            } else if (typeof userProfile.roles === 'object') {
              // Si c'est un objet (Set sérialisé), convertir en array
              rolesArray = Object.values(userProfile.roles);
            } else {
              rolesArray = [userProfile.roles];
            }
            localStorage.setItem('user_roles', JSON.stringify(rolesArray));
          }
        } else {
          console.error('Erreur lors de la récupération du profil, statut:', profileResponse.status);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil:', err);
      }
    }

    return data;
  },

  /**
   * Déconnecte l'utilisateur en supprimant toutes les données de session.
   */
  logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_roles');
    localStorage.removeItem('user');
  },

  /**
   * Vérifie si l'utilisateur est authentifié.
   */
  isAuthenticated() {
    return !!localStorage.getItem('jwt_token');
  },

  /**
   * Vérifie si l'utilisateur connecté a le rôle ADMIN.
   */
  isAdmin() {
    try {
      const roles = JSON.parse(localStorage.getItem('user_roles') || '[]');
      return roles.includes('ADMIN');
    } catch (e) {
      console.error('Erreur lors de la vérification du rôle admin:', e);
      return false;
    }
  },

  /**
   * Récupère la liste des rôles de l'utilisateur connecté.
   */
  getUserRoles() {
    try {
      const roles = JSON.parse(localStorage.getItem('user_roles') || '[]');
      return roles;
    } catch (e) {
      console.error('Erreur lors de la récupération des rôles:', e);
      return [];
    }
  },

  /**
   * Vérifie si l'utilisateur possède un rôle spécifique.
   */
  hasRole(role) {
    const roles = this.getUserRoles();
    return roles.includes(role);
  },

  /**
   * Récupère l'email de l'utilisateur connecté.
   */
  getCurrentUserEmail() {
    return localStorage.getItem('user_email');
  },

  /**
   * Récupère l'objet utilisateur complet depuis le localStorage.
   */
  getCurrentUser() {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', e);
      return null;
    }
  },

  /**
   * Rafraîchit le token JWT et met à jour les informations utilisateur.
   * Utile après une promotion ou un changement de rôle.
   */
  async refreshToken() {
    try {
      const token = localStorage.getItem('jwt_token');
      if (!token) {
        throw new Error('Aucun token disponible');
      }

      const response = await fetch(API_CONFIG.ENDPOINTS.AUTH.REFRESH, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors du rafraîchissement du token');
      }

      const data = await response.json();
      
      if (data.token) {
        // Mettre à jour le token
        localStorage.setItem('jwt_token', data.token);
        
        // Récupérer le profil utilisateur à jour
        const profileResponse = await fetch(API_CONFIG.ENDPOINTS.USER.PROFILE, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (profileResponse.ok) {
          const userProfile = await profileResponse.json();
          localStorage.setItem('user', JSON.stringify(userProfile));
          if (userProfile.roles) {
            let rolesArray;
            // Gérer différents formats de rôles
            if (Array.isArray(userProfile.roles)) {
              rolesArray = userProfile.roles;
            } else if (typeof userProfile.roles === 'object') {
              rolesArray = Object.values(userProfile.roles);
            } else {
              rolesArray = [userProfile.roles];
            }
            localStorage.setItem('user_roles', JSON.stringify(rolesArray));
          }
          return userProfile;
        }
      }

      return null;
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du token:', error);
      throw error;
    }
  },
};

export default authService;

