import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import userService from '../../services/userService';
import RoleBadge from '../RoleBadge';
import API_CONFIG from '../../config/apiConfig';

/**
 * Composant de gestion des utilisateurs pour les administrateurs
 * Permet de créer, modifier, supprimer des utilisateurs et gérer leurs mots de passe
 */
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'password'
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    yearOfBirth: '2000',
    currentCity: '',
    countryOrigin: '',
  });
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadUsers();
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      const response = await fetch(API_CONFIG.ENDPOINTS.CITIES.ALL);
      if (response.ok) {
        const data = await response.json();
        setCities(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des villes:', error);
    }
  };

  const loadUsers = async () => {
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
      setError('Impossible de charger les utilisateurs');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = (userId) => {
    return admins.some(admin => admin.id === userId);
  };

  const filteredUsers = users.filter(user => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.currentCity.toLowerCase().includes(query)
    );
  });

  const handleOpenModal = (mode, user = null) => {
    setModalMode(mode);
    setSelectedUser(user);
    if (mode === 'create') {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        yearOfBirth: '2000',
        currentCity: '',
        countryOrigin: '',
      });
    } else if (mode === 'edit' && user) {
      // Calculer l'année de naissance depuis l'âge
      const currentYear = new Date().getFullYear();
      const yearOfBirth = user.age ? currentYear - user.age : 2000;
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        yearOfBirth: yearOfBirth.toString(),
        currentCity: user.currentCity,
        countryOrigin: user.countryOrigin || '',
      });
    } else if (mode === 'password') {
      setPasswordData({
        newPassword: '',
        confirmPassword: '',
      });
    }
    setShowModal(true);
    setError('');
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setError('');
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (modalMode === 'create') {
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setError('Tous les champs obligatoires doivent être remplis');
          return;
        }
        
        if (!formData.currentCity) {
          setError('La ville actuelle est obligatoire');
          return;
        }
        
        const yearOfBirth = parseInt(formData.yearOfBirth);
        if (yearOfBirth < 1900 || yearOfBirth > 2007) {
          setError('L\'année de naissance doit être entre 1900 et 2007');
          return;
        }
        
        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          yearOfBirth: yearOfBirth,
          currentCity: formData.currentCity,
          countryOrigin: formData.countryOrigin || null,
        };
        
        await userService.createUser(userData);
        setSuccessMessage('Utilisateur créé avec succès');
        await loadUsers();
        setTimeout(() => handleCloseModal(), 1500);
      } else if (modalMode === 'edit') {
        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email) {
          setError('Les champs nom, prénom et email sont obligatoires');
          return;
        }
        
        // Pour l'édition, on convertit yearOfBirth en age car l'update utilise age
        const currentYear = new Date().getFullYear();
        const age = currentYear - parseInt(formData.yearOfBirth);
        
        if (age < 18 || age > 150) {
          setError('L\'âge doit être entre 18 et 150 ans');
          return;
        }

        const updateData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          age: age,
          currentCity: formData.currentCity,
          countryOrigin: formData.countryOrigin || null,
        };
        
        await userService.updateUser(selectedUser.id, updateData);
        setSuccessMessage('Utilisateur mis à jour avec succès');
        await loadUsers();
        setTimeout(() => handleCloseModal(), 1500);
      } else if (modalMode === 'password') {
        // Validation
        if (!passwordData.newPassword || !passwordData.confirmPassword) {
          setError('Veuillez remplir tous les champs');
          return;
        }
        if (passwordData.newPassword !== passwordData.confirmPassword) {
          setError('Les mots de passe ne correspondent pas');
          return;
        }
        if (passwordData.newPassword.length < 6) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
          return;
        }

        await userService.changeUserPassword(selectedUser.id, passwordData.newPassword);
        setSuccessMessage('Mot de passe modifié avec succès');
        setTimeout(() => handleCloseModal(), 1500);
      }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${userName} ? Cette action est irréversible.`)) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await userService.deleteUser(userId);
      setSuccessMessage('Utilisateur supprimé avec succès');
      await loadUsers();
    } catch (err) {
      setError(err.message || 'Erreur lors de la suppression');
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: '#000' }}>Gestion des Utilisateurs</h2>
        <button
          onClick={() => handleOpenModal('create')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Nouvel Utilisateur
        </button>
      </div>

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

      {/* Tableau des utilisateurs */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <thead>
            <tr style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>Photo</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Nom</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Âge</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Ville</th>
              <th style={{ padding: '15px', textAlign: 'left' }}>Rôles</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                  Aucun utilisateur trouvé
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user.id}
                  style={{
                    borderBottom: '1px solid #eee',
                    backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fff' : '#f9f9f9'}
                >
                  <td style={{ padding: '15px' }}>
                    {user.profilePictureUrl ? (
                      <img
                        src={user.profilePictureUrl.startsWith('/') ? `${API_CONFIG.BACKEND_URL}${user.profilePictureUrl}` : `${API_CONFIG.BACKEND_URL}/${user.profilePictureUrl}`}
                        alt={`${user.firstName} ${user.lastName}`}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #ddd',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '14px',
                        color: 'white',
                        fontWeight: 'bold',
                      }}>
                        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '15px', color: '#000' }}>
                    {user.firstName} {user.lastName}
                    {isAdmin(user.id) && (
                      <span style={{
                        marginLeft: '8px',
                        padding: '2px 8px',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                      }}>
                        ADMIN
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '15px', color: '#666' }}>{user.email}</td>
                  <td style={{ padding: '15px', color: '#000' }}>{user.age} ans</td>
                  <td style={{ padding: '15px', color: '#000' }}>{user.currentCity}</td>
                  <td style={{ padding: '15px' }}>
                    {user.roles && user.roles.length > 0 ? (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {Array.from(user.roles).map((role) => (
                          <RoleBadge key={role} role={role} size="small" />
                        ))}
                      </div>
                    ) : (
                      <RoleBadge role="USER" size="small" />
                    )}
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => handleOpenModal('edit', user)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#4facfe',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.backgroundColor = '#3a9ce0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.backgroundColor = '#4facfe';
                        }}
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleOpenModal('password', user)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#f093fb',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.backgroundColor = '#e082ea';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.backgroundColor = '#f093fb';
                        }}
                        title="Changer mot de passe"
                      >
                        🔑
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, `${user.firstName} ${user.lastName}`)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#ff6b6b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          transition: 'all 0.3s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.backgroundColor = '#e05555';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.backgroundColor = '#ff6b6b';
                        }}
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#000' }}>
              {modalMode === 'create' && 'Créer un Utilisateur'}
              {modalMode === 'edit' && 'Modifier l\'Utilisateur'}
              {modalMode === 'password' && 'Changer le Mot de Passe'}
            </h3>

            {error && (
              <div style={{
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                borderRadius: '6px',
                color: '#c33',
                fontSize: '0.9rem',
              }}>
                {error}
              </div>
            )}

            {successMessage && (
              <div style={{
                padding: '10px',
                marginBottom: '15px',
                backgroundColor: '#efe',
                border: '1px solid #cfc',
                borderRadius: '6px',
                color: '#3c3',
                fontSize: '0.9rem',
              }}>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {modalMode === 'password' ? (
                <>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Nouveau mot de passe *
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Confirmer le mot de passe *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                  {modalMode === 'create' && (
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                        Mot de passe *
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          border: '2px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          outline: 'none',
                          transition: 'border-color 0.3s',
                          color: '#fff',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#646cff'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                      />
                    </div>
                  )}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Année de naissance
                    </label>
                    <input
                      type="number"
                      name="yearOfBirth"
                      value={formData.yearOfBirth}
                      onChange={handleInputChange}
                      min="1900"
                      max="2007"
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Ville actuelle
                    </label>
                    <select
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#000',
                        backgroundColor: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    >
                      <option value="">Sélectionnez une ville</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#000' }}>
                      Pays d'origine
                    </label>
                    <input
                      type="text"
                      name="countryOrigin"
                      value={formData.countryOrigin}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.3s',
                        color: '#fff',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#646cff'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#ddd',
                    color: '#333',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ccc'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ddd'}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {modalMode === 'create' && 'Créer'}
                  {modalMode === 'edit' && 'Modifier'}
                  {modalMode === 'password' && 'Changer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;
