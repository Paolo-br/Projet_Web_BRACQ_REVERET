import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

// Service d'authentification
export const authService = {
  // Inscription
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

  // Connexion
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

    // Stocker le token et les infos utilisateur
    if (data.token) {
      sessionStorage.setItem('jwt_token', data.token);
      sessionStorage.setItem('user_email', email);
      // Le backend ne renvoie pas les rôles dans la réponse de login
      // On pourrait les récupérer via un endpoint /user/profile si nécessaire
    }

    return data;
  },

  // Déconnexion
  logout() {
    sessionStorage.removeItem('jwt_token');
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_roles');
  },

  // Vérifier si connecté
  isAuthenticated() {
    return !!sessionStorage.getItem('jwt_token');
  },

  // Vérifier si admin
  isAdmin() {
    const roles = JSON.parse(sessionStorage.getItem('user_roles') || '[]');
    return roles.includes('ADMIN');
  },

  // Obtenir l'email de l'utilisateur connecté
  getCurrentUserEmail() {
    return sessionStorage.getItem('user_email');
  },
};

export default authService;

