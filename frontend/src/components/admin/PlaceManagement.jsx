import { useState, useEffect } from 'react';
import placeService from '../../services/placeService';
import cityService from '../../services/cityService';
import API_CONFIG from '../../config/apiConfig';

/**
 * Composant de gestion des lieux pour les administrateurs
 * Permet de créer, modifier et supprimer des lieux avec leurs relations aux villes
 */
function PlaceManagement() {
  const [places, setPlaces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create', 'edit'
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    address: '',
    openingHours: '',
    latitude: '',
    longitude: '',
    cityId: '',
    photos: [],
  });
  const [photoFile, setPhotoFile] = useState(null);

  // Catégories disponibles pour les lieux (alignées avec le backend)
  const categories = [
    'BAR',
    'MUSEE',
    'BOITE_DE_NUIT',
    'PARC',
    'BIBLIOTHEQUE',
    'MONUMENT_HISTORIQUE'
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [placesData, citiesData] = await Promise.all([
        placeService.getAllPlaces(),
        cityService.getAllCities(),
      ]);
      setPlaces(placesData);
      setCities(citiesData);
    } catch (err) {
      setError('Impossible de charger les données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : 'Inconnue';
  };

  const filteredPlaces = places.filter(place => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const cityName = getCityName(place.cityId).toLowerCase();
    return (
      place.name.toLowerCase().includes(query) ||
      (place.description && place.description.toLowerCase().includes(query)) ||
      (place.category && place.category.toLowerCase().includes(query)) ||
      (place.address && place.address.toLowerCase().includes(query)) ||
      cityName.includes(query)
    );
  });

  const handleOpenModal = (mode, place = null) => {
    setModalMode(mode);
    setSelectedPlace(place);
    if (mode === 'create') {
      setFormData({
        name: '',
        description: '',
        category: '',
        address: '',
        openingHours: '',
        latitude: '',
        longitude: '',
        cityId: cities.length > 0 ? cities[0].id : '',
        photos: [],
      });
      setPhotoFile(null);
    } else if (mode === 'edit' && place) {
      setFormData({
        name: place.name,
        description: place.description || '',
        category: place.category || '',
        address: place.address || '',
        openingHours: place.openingHours || '',
        latitude: place.latitude || '',
        longitude: place.longitude || '',
        cityId: place.cityId || '',
        photos: place.photos || [],
      });
      setPhotoFile(null);
    }
    setShowModal(true);
    setError('');
    setSuccessMessage('');
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlace(null);
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

      if (!formData.cityId) {
        setError('La ville est obligatoire');
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

      let placeData = {
        name: formData.name,
        description: formData.description || null,
        category: formData.category || null,
        address: formData.address || null,
        openingHours: formData.openingHours || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        cityId: parseInt(formData.cityId),
        photos: formData.photos || [],
      };

      let createdOrUpdatedPlace;

      if (modalMode === 'create') {
        createdOrUpdatedPlace = await placeService.createPlace(placeData);
        setSuccessMessage('Lieu créé avec succès');
      } else if (modalMode === 'edit') {
        createdOrUpdatedPlace = await placeService.updatePlace(selectedPlace.id, placeData);
        setSuccessMessage('Lieu mis à jour avec succès');
      }

      // Upload de la photo si présente (ajout d'une nouvelle photo)
      if (photoFile && createdOrUpdatedPlace && createdOrUpdatedPlace.id) {
        try {
          await placeService.uploadPlacePhoto(createdOrUpdatedPlace.id, photoFile);
        } catch (photoErr) {
          console.error('Erreur upload photo:', photoErr);
          setError('Lieu enregistré mais erreur lors de l\'upload de la photo');
        }
      }

      await loadData();
      setTimeout(() => handleCloseModal(), 1500);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleDelete = async (placeId, placeName) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le lieu "${placeName}" ? Cette action est irréversible.`)) {
      return;
    }

    try {
      setError('');
      setSuccessMessage('');
      await placeService.deletePlace(placeId);
      setSuccessMessage('Lieu supprimé avec succès');
      await loadData();
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
        <h2 style={{ margin: 0, color: '#000' }}>Gestion des Lieux</h2>
        <button
          onClick={() => handleOpenModal('create')}
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'all 0.3s',
            boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Nouveau Lieu
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
        placeholder="Rechercher par nom, catégorie, ville ou adresse..."
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

      {/* Grille des lieux */}
      {filteredPlaces.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#f5f5f5',
          borderRadius: '12px',
        }}>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            {searchQuery ? 'Aucun lieu trouvé pour cette recherche' : 'Aucun lieu'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
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
              {/* Image du lieu */}
              {place.photos && place.photos.length > 0 ? (
                <img
                  src={`${API_CONFIG.BACKEND_URL}${place.photos[0]}`}
                  alt={place.name}
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
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  color: 'white',
                }}>
                  📍
                </div>
              )}

              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', fontWeight: 'bold', color: '#000' }}>{place.name}</h3>
                
                {place.category && (
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    backgroundColor: '#667eea',
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                  }}>
                    {place.category}
                  </span>
                )}

                <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.95rem' }}>
                  {getCityName(place.cityId)}
                </p>

                {place.address && (
                  <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '0.9rem' }}>
                    📍 {place.address}
                  </p>
                )}

                {place.description && (
                  <p style={{
                    margin: '0 0 15px 0',
                    color: '#555',
                    fontSize: '0.9rem',
                    lineHeight: '1.4',
                    maxHeight: '60px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {place.description}
                  </p>
                )}

                {(place.latitude && place.longitude) && (
                  <p style={{ margin: '0 0 15px 0', color: '#888', fontSize: '0.85rem' }}>
                    Coordonnées: {place.latitude}, {place.longitude}
                  </p>
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button
                    onClick={() => handleOpenModal('edit', place)}
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
                    onClick={() => handleDelete(place.id, place.name)}
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
              {modalMode === 'create' ? 'Créer un Lieu' : 'Modifier le Lieu'}
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
                  Nom du lieu *
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
                  Ville *
                </label>
                <select
                  name="cityId"
                  value={formData.cityId}
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
                    backgroundColor: 'white',
                    color: '#000',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#646cff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                >
                  <option value="">Sélectionner une ville</option>
                  {cities.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.country}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Catégorie *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                    backgroundColor: 'white',
                    color: '#000',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#646cff'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Adresse *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  Horaires d'ouverture
                </label>
                <input
                  type="text"
                  name="openingHours"
                  value={formData.openingHours}
                  onChange={handleInputChange}
                  placeholder="Ex: Lun-Ven 9h-18h, Sam-Dim 10h-20h"
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                  {modalMode === 'edit' && formData.photos && formData.photos.length > 0 
                    ? 'Ajouter une nouvelle photo (optionnel)' 
                    : 'Télécharger une photo'}
                </label>
                {modalMode === 'edit' && formData.photos && formData.photos.length > 0 && (
                  <div style={{
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#e7f3ff',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    color: '#0066cc',
                  }}>
                    ℹ️ Ce lieu a déjà {formData.photos.length} photo(s). Vous pouvez en ajouter une nouvelle ou laisser les photos existantes.
                  </div>
                )}
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
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
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

export default PlaceManagement;
