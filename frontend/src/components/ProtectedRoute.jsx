import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

/**
 * Composant de protection de route pour les pages nécessitant une authentification
 * @param {Object} props
 * @param {React.ReactNode} props.children - Le composant enfant à protéger
 * @param {boolean} [props.requireAdmin=false] - Si true, nécessite le rôle ADMIN
 */
function ProtectedRoute({ children, requireAdmin = false }) {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si la route nécessite les droits admin et que l'utilisateur n'est pas admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
