# Frontend Alltogether

Interface React pour l'application Alltogether.

## 🚀 Démarrage

### Installation des dépendances

```bash
npm install
```

### Lancement en mode développement

```bash
npm run dev
```

L'application sera disponible sur **http://localhost:5173**

---

## 🔧 Configuration

### Variables d'environnement

Le fichier `.env.development` contient la configuration locale :

```env
VITE_API_URL=http://localhost:8080/api
```

**Important** : Le backend doit être lancé sur le port 8080 !

---

## 📡 Connexion au Backend

### Services disponibles

Tous les services pour communiquer avec l'API sont dans `src/services/` :

- **authService.js** - Authentification (login, register, logout)
- **cityService.js** - Gestion des villes
- **placeService.js** - Gestion des lieux
- **participationService.js** - Participations "J'y vais"

### Exemple d'utilisation

```jsx
import { authService } from './services/authService';
import { placeService } from './services/placeService';

// Connexion
const handleLogin = async (email, password) => {
  try {
    const data = await authService.login(email, password);
    console.log('Connecté !', data);
  } catch (error) {
    console.error(error.message);
  }
};

// Récupérer les lieux d'une ville
const fetchPlaces = async (cityId) => {
  try {
    const places = await placeService.getPlacesByCity(cityId);
    console.log('Lieux:', places);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## 📁 Structure

```
frontend/
├── src/
│   ├── components/       → Composants réutilisables
│   ├── pages/           → Pages de l'application
│   ├── services/        → Services API (authService, etc.)
│   ├── config/          → Configuration (apiConfig.js)
│   ├── assets/          → Images, styles
│   ├── App.jsx          → Composant principal
│   └── main.jsx         → Point d'entrée
├── public/              → Fichiers statiques
├── .env.development     → Variables d'environnement (dev)
├── package.json         → Dépendances
└── vite.config.js       → Configuration Vite
```

---

## 🎨 Technologies

- **React 19** - Framework frontend
- **React Router** - Navigation
- **Vite** - Build tool rapide
- **Fetch API** - Appels HTTP vers le backend

---

## 📝 Pages Existantes

- `/` - Home
- `/login` - Connexion
- `/register` - Inscription
- `/profile` - Profil utilisateur
- `/cities` - Liste des villes
- `/city/:id` - Détails d'une ville
- `/activities` - Activités

---

## 🔐 Authentification

Le JWT est stocké dans `sessionStorage` :

```javascript
// Après login
sessionStorage.getItem('jwt_token')        // Le token JWT
sessionStorage.getItem('user_email')       // Email utilisateur
sessionStorage.getItem('user_roles')       // Rôles (JSON)

// Vérifier si connecté
import { authService } from './services/authService';
const isLoggedIn = authService.isAuthenticated();
```

---

## 🧪 Scripts Disponibles

```bash
npm run dev      # Mode développement
npm run build    # Build pour production
npm run preview  # Preview du build
npm run lint     # Vérifier le code
```

---

## ⚠️ Important

1. **Le backend doit être lancé** avant le frontend
2. **Port backend** : 8080 (ne pas changer)
3. **Port frontend** : 5173 (par défaut Vite)
4. **CORS** : Déjà configuré dans le backend

---

## 🐛 Problèmes Courants

### Erreur CORS
→ Vérifier que le backend est bien lancé sur le port 8080

### Erreur 401 Unauthorized
→ Le token JWT a expiré ou est invalide, se reconnecter

### Images ne s'affichent pas
→ Utiliser `API_CONFIG.ENDPOINTS.IMAGES.GET(filename)`

---

**Port** : 5173  
**API Backend** : http://localhost:8080/api
// Configuration de l'API Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  ENDPOINTS: {
    // Authentification
    AUTH: {
      REGISTER: `${API_BASE_URL}/auth/register`,
      LOGIN: `${API_BASE_URL}/auth/login`,
      FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    },
    
    // Villes
    CITIES: {
      GET_ALL: `${API_BASE_URL}/cities`,
      GET_BY_ID: (id) => `${API_BASE_URL}/cities/${id}`,
    },
    
    // Lieux
    PLACES: {
      GET_ALL: `${API_BASE_URL}/places`,
      GET_BY_ID: (id) => `${API_BASE_URL}/places/${id}`,
      GET_BY_CITY: (cityId) => `${API_BASE_URL}/places/city/${cityId}`,
      SEARCH: `${API_BASE_URL}/places`, // ?category=BAR&city=Paris
    },
    
    // Participations
    PARTICIPATIONS: {
      CREATE: `${API_BASE_URL}/participations`,
      DELETE: (id) => `${API_BASE_URL}/participations/${id}`,
      GET_BY_PLACE: (placeId) => `${API_BASE_URL}/participations/place/${placeId}`,
    },
    
    // Carte
    MAP: {
      GET_CITIES: `${API_BASE_URL}/map/cities`,
      GET_PLACES: (cityId) => `${API_BASE_URL}/map/city/${cityId}/places`,
    },
    
    // Images
    IMAGES: {
      GET: (filename) => `http://localhost:8080/uploads/${filename}`,
    },
  },
};

// Helper pour obtenir le token JWT
export const getAuthToken = () => {
  return sessionStorage.getItem('jwt_token');
};

// Helper pour les headers avec authentification
export const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

export default API_CONFIG;

