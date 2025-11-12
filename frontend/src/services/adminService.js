import API_CONFIG, { getAuthHeaders } from '../config/apiConfig';

const adminService = {
  /**
   * Promouvoir un utilisateur au rôle d'administrateur
   * @param {number} userId - ID de l'utilisateur à promouvoir
   * @returns {Promise<string>} Message de confirmation
   */
  async promoteToAdmin(userId) {
    const res = await fetch(`${API_CONFIG.BASE_URL}/admin/users/${userId}/promote`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de la promotion');
    }
    
    return await res.text();
  },

  /**
   * Retirer le rôle d'administrateur d'un utilisateur
   * @param {number} userId - ID de l'utilisateur à rétrograder
   * @returns {Promise<string>} Message de confirmation
   */
  async demoteFromAdmin(userId) {
    const res = await fetch(`${API_CONFIG.BASE_URL}/admin/users/${userId}/demote`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || 'Erreur lors de la rétrogradation');
    }
    
    return await res.text();
  },

  /**
   * Récupérer la liste de tous les administrateurs
   * @returns {Promise<Array>} Liste des utilisateurs administrateurs
   */
  async getAllAdmins() {
    const res = await fetch(`${API_CONFIG.BASE_URL}/admin/admins`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      throw new Error('Impossible de récupérer la liste des administrateurs');
    }
    
    return await res.json();
  },

  /**
   * Vérifier si un utilisateur est administrateur
   * @param {number} userId - ID de l'utilisateur à vérifier
   * @returns {Promise<boolean>} True si l'utilisateur est admin
   */
  async isUserAdmin(userId) {
    const res = await fetch(`${API_CONFIG.BASE_URL}/admin/users/${userId}/is-admin`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      throw new Error('Erreur lors de la vérification du statut admin');
    }
    
    return await res.json();
  },

  /**
   * Récupérer tous les utilisateurs (nécessite droits admin)
   * @returns {Promise<Array>} Liste de tous les utilisateurs
   */
  async getAllUsers() {
    const res = await fetch(`${API_CONFIG.BASE_URL}/users`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) {
      throw new Error('Impossible de récupérer la liste des utilisateurs');
    }
    
    return await res.json();
  },

  /**
   * Récupérer les statistiques de la plateforme
   * @returns {Promise<Object>} Statistiques globales
   */
  async getStatistics() {
    try {
      const users = await this.getAllUsers();
      const admins = await this.getAllAdmins();
      
      return {
        totalUsers: users.length,
        totalAdmins: admins.length,
        regularUsers: users.length - admins.length,
      };
    } catch (err) {
      console.error('Erreur lors du calcul des statistiques:', err);
      return {
        totalUsers: 0,
        totalAdmins: 0,
        regularUsers: 0,
      };
    }
  },
};

export default adminService;
