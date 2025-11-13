import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import adminService from '../../services/adminService';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import RoleBadge from '../RoleBadge';
import API_CONFIG from '../../config/apiConfig';

/**
 * Composant de gestion des permissions et rôles administrateurs
 * Permet de promouvoir et rétrograder des utilisateurs au rôle ADMIN
 */
function PermissionManagement() {
  const navigate = useNavigate();
  const { currentUser, refreshProfile } = useAuth();
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'admins', 'users'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  // Filtrer les utilisateurs quand la recherche ou l'onglet change
  useEffect(() => {
    filterUsers();
  }, [searchQuery, activeTab, users, admins]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [allUsers, allAdmins] = await Promise.all([
        adminService.getAllUsers(),
        adminService.getAllAdmins(),
      ]);
      
      setUsers(allUsers);
      setAdmins(allAdmins);
    } catch (err) {
      setError('Impossible de charger les données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [];
    
    // Sélectionner les utilisateurs selon l'onglet
    if (activeTab === 'admins') {
      filtered = admins;
    } else if (activeTab === 'users') {
      const adminIds = new Set(admins.map(a => a.id));
      filtered = users.filter(u => !adminIds.has(u.id));
    } else {
      filtered = users;
    }
    
    // Appliquer la recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.currentCity.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(filtered);
  };

  const isAdmin = (userId) => {
    return admins.some(admin => admin.id === userId);
  };

  const handlePromote = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir promouvoir cet utilisateur en administrateur ?')) {
      return;
    }

    try {
      setActionLoading(userId);
      setError('');
      setSuccessMessage('');
      
      await adminService.promoteToAdmin(userId);
      
      // Si on vient de promouvoir l'utilisateur actuel, rafraîchir le profil
      if (currentUser && currentUser.id === userId) {
        try {
          await refreshProfile();
          setSuccessMessage('Vous avez été promu administrateur ! Vos permissions ont été mises à jour.');
        } catch (refreshError) {
          console.error('Erreur lors du rafraîchissement du profil:', refreshError);
          setSuccessMessage('Utilisateur promu administrateur. Veuillez vous reconnecter pour que les changements prennent effet.');
        }
      } else {
        setSuccessMessage('Utilisateur promu administrateur avec succès');
      }
      
      await loadData();
    } catch (err) {
      setError(err.message || 'Erreur lors de la promotion');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDemote = async (userId) => {
    
    // Empêcher de se rétrograder soi-même
    if (currentUser && currentUser.id === userId) {
      setError('Vous ne pouvez pas vous rétrograder vous-même !');
      return;
    }
    
    if (!window.confirm('Êtes-vous sûr de vouloir retirer les droits administrateur de cet utilisateur ?')) {
      return;
    }

    try {
      setActionLoading(userId);
      setError('');
      setSuccessMessage('');
      
      await adminService.demoteFromAdmin(userId);
      setSuccessMessage('Droits administrateur retirés avec succès');
      await loadData();
    } catch (err) {
      setError(err.message || 'Erreur lors de la rétrogradation');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>Gestion des Permissions</h2>

      {/* Messages */}
      {error && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          color: '#c33',
        }}>
          {error}
        </div>
      )}

      {successMessage && (
        <div style={{
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#efe',
          border: '1px solid #cfc',
          borderRadius: '8px',
          color: '#3c3',
        }}>
          {successMessage}
        </div>
      )}

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher par nom, email ou ville..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '15px',
          fontSize: '1rem',
          border: '2px solid #ddd',
          borderRadius: '10px',
          marginBottom: '20px',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={(e) => e.target.style.borderColor = '#646cff'}
        onBlur={(e) => e.target.style.borderColor = '#ddd'}
      />

      {/* Onglets */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '30px',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
      }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'all' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f5f5f5',
            color: activeTab === 'all' ? 'white' : '#333',
            border: activeTab === 'all' ? 'none' : '2px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'all 0.3s',
            boxShadow: activeTab === 'all' ? '0 2px 8px rgba(102, 126, 234, 0.4)' : 'none',
          }}
        >
          Tous ({users.length})
        </button>
        
        <button
          onClick={() => setActiveTab('admins')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'admins' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : '#f5f5f5',
            color: activeTab === 'admins' ? 'white' : '#333',
            border: activeTab === 'admins' ? 'none' : '2px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'all 0.3s',
            boxShadow: activeTab === 'admins' ? '0 2px 8px rgba(240, 147, 251, 0.4)' : 'none',
          }}
        >
          Admins ({admins.length})
        </button>
        
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '12px 24px',
            background: activeTab === 'users' ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' : '#f5f5f5',
            color: activeTab === 'users' ? 'white' : '#333',
            border: activeTab === 'users' ? 'none' : '2px solid #ddd',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'all 0.3s',
            boxShadow: activeTab === 'users' ? '0 2px 8px rgba(79, 172, 254, 0.4)' : 'none',
          }}
        >
          Utilisateurs ({users.length - admins.length})
        </button>
      </div>

      {/* Liste des utilisateurs */}
      {filteredUsers.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {searchQuery ? 'Aucun utilisateur trouvé pour cette recherche' : 'Aucun utilisateur'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px',
        }}>
          {filteredUsers.map((user) => {
            const userIsAdmin = isAdmin(user.id);
            const currentUser = authService.getCurrentUser();
            const isSelf = currentUser && currentUser.id === user.id;
            
            return (
              <div
                key={user.id}
                style={{
                  border: userIsAdmin ? '2px solid #ff4444' : '1px solid #ddd',
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: '#fff',
                  boxShadow: userIsAdmin 
                    ? '0 4px 12px rgba(255, 68, 68, 0.2)' 
                    : '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = userIsAdmin
                    ? '0 6px 16px rgba(255, 68, 68, 0.3)'
                    : '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = userIsAdmin
                    ? '0 4px 12px rgba(255, 68, 68, 0.2)'
                    : '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                {isSelf && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#646cff',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                  }}>
                    VOUS
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                  {user.profilePictureUrl ? (
                    <img
                      src={user.profilePictureUrl.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${user.profilePictureUrl}` : `${API_CONFIG.BACKEND_URL}/${user.profilePictureUrl}`}
                      alt={`${user.firstName} ${user.lastName}`}
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: userIsAdmin ? '3px solid #ff4444' : '3px solid #ddd',
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: userIsAdmin 
                        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' 
                        : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    }}>
                      {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#333' }}>
                      {user.firstName} {user.lastName}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#666' }}>
                      {user.email}
                    </p>
                  </div>
                </div>

                <div style={{ 
                  marginBottom: '15px', 
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  borderRadius: '8px',
                }}>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
                    <strong>Âge:</strong> {user.age} ans
                  </p>
                  <p style={{ margin: '5px 0', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#000' }}>
                    <strong>Ville:</strong> {user.currentCity}
                  </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  {user.roles && user.roles.length > 0 ? (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {Array.from(user.roles).map((role) => (
                        <RoleBadge key={role} role={role} size="small" />
                      ))}
                    </div>
                  ) : (
                    <RoleBadge role="USER" size="small" />
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {userIsAdmin ? (
                    <button
                      onClick={() => handleDemote(user.id)}
                      disabled={actionLoading === user.id || isSelf}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: isSelf 
                          ? '#ccc' 
                          : (actionLoading === user.id 
                            ? 'linear-gradient(135deg, #bbb 0%, #999 100%)' 
                            : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: (actionLoading === user.id || isSelf) ? 'not-allowed' : 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      }}
                      title={isSelf ? 'Vous ne pouvez pas vous rétrograder vous-même' : ''}
                    >
                      {actionLoading === user.id ? 'Traitement...' : 'Retirer Admin'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePromote(user.id)}
                      disabled={actionLoading === user.id}
                      style={{
                        flex: 1,
                        padding: '10px',
                        background: actionLoading === user.id 
                          ? 'linear-gradient(135deg, #bbb 0%, #999 100%)' 
                          : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: actionLoading === user.id ? 'not-allowed' : 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                      }}
                    >
                      {actionLoading === user.id ? 'Traitement...' : 'Promouvoir Admin'}
                    </button>
                  )}
                  
                  <button
                    onClick={() => navigate(`/user/${user.id}`)}
                    style={{
                      padding: '10px 15px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                    }}
                    title="Voir le profil"
                  >
                    👤
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PermissionManagement;
