import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import adminService from '../services/adminService';
import UserManagement from '../components/admin/UserManagement';
import CityManagement from '../components/admin/CityManagement';
import PlaceManagement from '../components/admin/PlaceManagement';
import PermissionManagement from '../components/admin/PermissionManagement';

/**
 * Page d'administration principale avec navigation par sections
 * Permet de gérer les utilisateurs, villes, lieux et permissions
 * Accessible uniquement aux administrateurs
 */
function AdminPanel() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('users'); // 'users', 'cities', 'places', 'permissions'
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    regularUsers: 0,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est admin
    if (!isAdmin) {
      navigate('/');
      return;
    }

    loadStatistics();
  }, [navigate, isAdmin]);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const stats = await adminService.getStatistics();
      setStatistics(stats);
    } catch (err) {
      console.error('Erreur lors du chargement des statistiques:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '100px 40px', textAlign: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Chargement des données...</p>
      </div>
    );
  }

  // Icônes pour les sections
  const getSectionIcon = (section) => {
    switch (section) {
      case 'users': return '👥';
      case 'cities': return '🏙️';
      case 'places': return '📍';
      case 'permissions': return '🔐';
      default: return '📋';
    }
  };

  return (
    <div style={{ padding: '100px 40px 40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header avec titre et statistiques */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ marginBottom: '10px', fontSize: '2.5rem' }}>Panneau d'Administration</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>Gestion complète de la plateforme</p>
      </div>

      {/* Statistiques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '2px solid #667eea',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{statistics.totalUsers}</div>
          <div style={{ fontSize: '0.9rem', color: '#333' }}>Total Utilisateurs</div>
        </div>
        
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '2px solid #f5576c',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f5576c' }}>{statistics.totalAdmins}</div>
          <div style={{ fontSize: '0.9rem', color: '#333' }}>Administrateurs</div>
        </div>
        
        <div style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '2px solid #38ef7d',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38ef7d' }}>{statistics.regularUsers}</div>
          <div style={{ fontSize: '0.9rem', color: '#333' }}>Utilisateurs Standard</div>
        </div>
      </div>

      {/* Navigation par sections */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
        marginBottom: '40px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}>
        <button
          onClick={() => setActiveSection('users')}
          style={{
            padding: '20px',
            background: activeSection === 'users' 
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
              : 'white',
            color: activeSection === 'users' ? 'white' : '#333',
            border: activeSection === 'users' ? 'none' : '2px solid #ddd',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: activeSection === 'users' 
              ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'users') {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'users') {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }
          }}
        >
          <span style={{ fontSize: '2rem' }}>👥</span>
          Utilisateurs
        </button>

        <button
          onClick={() => setActiveSection('cities')}
          style={{
            padding: '20px',
            background: activeSection === 'cities' 
              ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' 
              : 'white',
            color: activeSection === 'cities' ? 'white' : '#333',
            border: activeSection === 'cities' ? 'none' : '2px solid #ddd',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: activeSection === 'cities' 
              ? '0 4px 12px rgba(56, 239, 125, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'cities') {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'cities') {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }
          }}
        >
          <span style={{ fontSize: '2rem' }}>🏙️</span>
          Villes
        </button>

        <button
          onClick={() => setActiveSection('places')}
          style={{
            padding: '20px',
            background: activeSection === 'places' 
              ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
              : 'white',
            color: activeSection === 'places' ? 'white' : '#333',
            border: activeSection === 'places' ? 'none' : '2px solid #ddd',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: activeSection === 'places' 
              ? '0 4px 12px rgba(240, 147, 251, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'places') {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'places') {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }
          }}
        >
          <span style={{ fontSize: '2rem' }}>📍</span>
          Lieux
        </button>

        <button
          onClick={() => setActiveSection('permissions')}
          style={{
            padding: '20px',
            background: activeSection === 'permissions' 
              ? 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' 
              : 'white',
            color: activeSection === 'permissions' ? 'white' : '#333',
            border: activeSection === 'permissions' ? 'none' : '2px solid #ddd',
            borderRadius: '12px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: activeSection === 'permissions' 
              ? '0 4px 12px rgba(250, 112, 154, 0.4)' 
              : '0 2px 4px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => {
            if (activeSection !== 'permissions') {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (activeSection !== 'permissions') {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }
          }}
        >
          <span style={{ fontSize: '2rem' }}>🔐</span>
          Permissions
        </button>
      </div>

      {/* Contenu des sections */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '400px',
      }}>
        {activeSection === 'users' && <UserManagement />}
        {activeSection === 'cities' && <CityManagement />}
        {activeSection === 'places' && <PlaceManagement />}
        {activeSection === 'permissions' && <PermissionManagement />}
      </div>
    </div>
  );
}

export default AdminPanel;
