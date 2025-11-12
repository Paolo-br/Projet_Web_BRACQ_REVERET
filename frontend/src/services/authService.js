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
      sessionStorage.setItem('jwt_token', data.token);
      sessionStorage.setItem('user_email', email);
      
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
          sessionStorage.setItem('user', JSON.stringify(userProfile));
          // Stocker les rôles séparément pour un accès facile
          if (userProfile.roles) {
            sessionStorage.setItem('user_roles', JSON.stringify(Array.from(userProfile.roles)));
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
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_roles');
    sessionStorage.removeItem('user');
  },

  /**
   * Vérifie si l'utilisateur est authentifié.
   */
  isAuthenticated() {
    return !!sessionStorage.getItem('jwt_token');
  },

  /**
   * Vérifie si l'utilisateur connecté a le rôle ADMIN.
   */
  isAdmin() {
    try {
      const roles = JSON.parse(sessionStorage.getItem('user_roles') || '[]');
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
      return JSON.parse(sessionStorage.getItem('user_roles') || '[]');
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
    return sessionStorage.getItem('user_email');
  },

  /**
   * Récupère l'objet utilisateur complet depuis le sessionStorage.
   */
  getCurrentUser() {
    try {
      const userStr = sessionStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', e);
      return null;
    }
  },
};

export default authService;

