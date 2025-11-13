import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Initialiser avec les valeurs actuelles du localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [userRoles, setUserRoles] = useState(() => authService.getUserRoles());
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

  // Fonction pour mettre à jour l'état d'authentification
  const updateAuthState = () => {
    const authenticated = authService.isAuthenticated();
    const roles = authService.getUserRoles();
    const user = authService.getCurrentUser();
    
    console.log('🔄 AuthContext - Mise à jour de l\'état:', { 
      authenticated, 
      roles, 
      userId: user?.id,
      isAdmin: roles.includes('ADMIN')
    });
    
    setIsAuthenticated(authenticated);
    setUserRoles(roles);
    setCurrentUser(user);
  };

  // Fonction de connexion
  const login = async (email, password) => {
    console.log('🔐 AuthContext - Tentative de connexion pour:', email);
    await authService.login(email, password);
    updateAuthState();
  };

  // Fonction de déconnexion
  const logout = () => {
    console.log('🚪 AuthContext - Déconnexion');
    authService.logout();
    updateAuthState();
  };

  // Fonction pour rafraîchir le profil
  const refreshProfile = async () => {
    try {
      console.log('♻️ AuthContext - Rafraîchissement du profil');
      await authService.refreshToken();
      updateAuthState();
    } catch (error) {
      console.error('❌ Erreur lors du rafraîchissement du profil:', error);
    }
  };

  // Vérifier l'état d'authentification au montage
  useEffect(() => {
    console.log('🎬 AuthContext - Initialisation');
    updateAuthState();
  }, []);

  const isAdmin = userRoles.includes('ADMIN');

  const value = {
    isAuthenticated,
    userRoles,
    currentUser,
    isAdmin,
    login,
    logout,
    refreshProfile,
    updateAuthState
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}

export default AuthContext;
