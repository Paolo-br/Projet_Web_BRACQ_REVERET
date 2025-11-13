import { useState, useEffect } from 'react';
import cityService from '../../services/cityService';
import API_CONFIG from '../../config/apiConfig';

/**
 * Utilitaire pour construire l'URL complète d'une image.
 * Si l'URL commence par http:// ou https://, elle est retournée telle quelle.
 * Sinon, elle est préfixée par BACKEND_URL.
 */
const getImageUrl = (imageUrl, fallback = '/uploads/paris.jpg') => {
  if (!imageUrl) {
    return `${API_CONFIG.BACKEND_URL}${fallback}`;
  }
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${API_CONFIG.BACKEND_URL}${imageUrl}`;
};

/**
 * Composant de gestion des villes pour les administrateurs
 * Permet de créer, modifier et supprimer des villes
 */
function CityManagement() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit'
  const [selectedCity, setSelectedCity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    imageUrl: '',
  });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await cityService.getAllCities();
      setCities(data);
    } catch (err) {
      setError('Impossible de charger les villes');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter(city => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      city.name.toLowerCase().includes(query) ||
      (city.description && city.description.toLowerCase().includes(query))
    );
  });

  const handleOpenModal = (mode, city = null) => {
    setModalMode(mode);
    setSelectedCity(city);
    if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        imageUrl: '',
      });
      setPhotoFile(null);
    } else if (mode === 'edit' && city) {
      setFormData({
        name: city.name,
        description: city.description || '',
        latitude: city.latitude || '',
        longitude: city.longitude || '',
        imageUrl: city.imageUrl || '',
      });
      setPhotoFile(null);
    }
    setShowModal(true);
    setError('');
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCity(null);
    setPhotoFile(null);
    setError('');
    setSuccessMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      // Validation
      if (!formData.name) {
        setError('Le nom est obligatoire');
        return;
      }

      if (formData.latitude && (isNaN(formData.latitude) || formData.latitude < -90 || formData.latitude > 90)) {
        setError('La latitude doit être entre -90 et 90');
        return;
      }

      if (formData.longitude && (isNaN(formData.longitude) || formData.longitude < -180 || formData.longitude > 180)) {
        setError('La longitude doit être entre -180 et 180');
        return;
      }

      let cityData = {
        name: formData.name,
        description: formData.description,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        imageUrl: formData.imageUrl || null,
      };

      let createdOrUpdatedCity;

      if (modalMode === 'create') {
        createdOrUpdatedCity = await cityService.createCity(cityData);
        setSuccessMessage('Ville créée avec succès');
      } else if (modalMode === 'edit') {
        createdOrUpdatedCity = await cityService.updateCity(selectedCity.id, cityData);
        setSuccessMessage('Ville mise à jour avec succès');
      }

      // Upload de la photo si présente
      if (photoFile && createdOrUpdatedCity && createdOrUpdatedCity.id) {
        try {
          await cityService.uploadCityPhoto(createdOrUpdatedCity.id, photoFile);
        } catch (photoErr) {
          console.error('Erreur upload photo:', photoErr);
          setError('Ville enregistrée mais erreur lors de l\'upload de la photo');
        }
      }

      await loadCities();
      setTimeout(() => handleCloseModal(), 1500);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleDelete = async (cityId, cityName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer la ville "${cityName}" ? Cette action est irréversible.`)) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await cityService.deleteCity(cityId);
      setSuccessMessage('Ville supprimée avec succès');
      await loadCities();
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
        <h2 style={{ margin: 0, color: '#333' }}>Gestion des Villes</h2>
        <button
          onClick={() => handleOpenModal('create')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(56, 239, 125, 0.3)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Nouvelle Ville
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
        placeholder="Rechercher par nom, pays ou description..."
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

      {/* Grille des villes */}
      {filteredCities.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {searchQuery ? 'Aucune ville trouvée pour cette recherche' : 'Aucune ville'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {filteredCities.map((city) => (
            <div
              key={city.id}
              style={{
                border: '2px solid #ddd',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Image de la ville */}
              {city.imageUrl ? (
                <img
                  src={getImageUrl(city.imageUrl)}
                  alt={city.name}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '180px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: 'white',
                }}>
                  🏙️
                </div>
              )}

              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', color: '#333' }}>{city.name}</h3>
                {city.description && (
                  <p style={{
                    margin: '0 0 15px 0',
                    color: '#555',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    maxHeight: '60px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {city.description}
                  </p>
                )}
                {(city.latitude && city.longitude) && (
                  <p style={{ margin: '0 0 15px 0', color: '#888', fontSize: '0.85rem' }}>
                    Coordonnées: {city.latitude}, {city.longitude}
                  </p>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => handleOpenModal('edit', city)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(city.id, city.name)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #c92a2a 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                     Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
              {modalMode === 'create' ? 'Créer une Ville' : 'Modifier la Ville'}
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
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Nom de la ville *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#646cff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    resize: 'vertical',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#646cff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="-90 à 90"
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
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="-180 à 180"
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
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  URL de l'image
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://..."
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
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Ou télécharger une photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                />
                {photoFile && (
                  <p style={{ marginTop: '5px', fontSize: '0.85rem', color: '#666' }}>
                    Fichier sélectionné: {photoFile.name}
                  </p>
                )}
              </div>

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
                    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(56, 239, 125, 0.3)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {modalMode === 'create' ? 'Créer' : 'Modifier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CityManagement;
