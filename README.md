# 🌍 Alltogether - Plateforme Erasmus

Application web de gestion de villes et d'activités pour étudiants Erasmus.

**Stack:** Spring Boot (Backend) + React (Frontend) + PostgreSQL

---

## 🚀 Démarrage Ultra-Rapide

### Pour les nouveaux utilisateurs :

**Windows:**
```powershell
.\start-project.ps1
```

Puis ouvrir **http://localhost:5173** dans votre navigateur.

**Linux/Mac:**
```bash
docker-compose up --build
```

---

## 📖 Documentation Complète

- **[📘 INSTALLATION.md](INSTALLATION.md)** - Guide complet d'installation et de configuration
- **[✅ CHECKLIST.md](CHECKLIST.md)** - Vérifications avant de partager le projet

---

## ⚡ Démarrage Rapide

### Option 1: Tout avec Docker (Recommandé pour débuter)

```bash
# Démarrer tout le projet
docker-compose up --build

# Accéder à l'application
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080
# Database: localhost:5432
```

### Option 2: Développement Local

```bash
# 1. Démarrer PostgreSQL
docker-compose up -d db

# 2. Lancer le backend (dans IntelliJ)
# Ouvrir AlltogetherApplication.java et cliquer sur Run ▶️

# 3. Lancer le frontend
cd frontend
npm install
npm run dev
```

---

## 📋 Prérequis

- **Docker Desktop** - https://www.docker.com/products/docker-desktop/
- **Java JDK 17+** - https://adoptium.net/
- **Node.js 18+** - https://nodejs.org/
- **IntelliJ IDEA** - https://www.jetbrains.com/idea/ (pour le développement)

---

## 🔧 Ports Utilisés

| Service | Port | URL |
|---------|------|-----|
| Frontend | 5173 | http://localhost:5173 |
| Backend | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | localhost:5432 |

---

## 🗄️ Base de Données

**PostgreSQL** (via Docker)

```
Host:     localhost
Port:     5432
Database: alltogether
Username: postgres
Password: BaseD@ta2025
```

---

## 📚 Technologies

| Composant | Technologie |
|-----------|-------------|
| Backend | Spring Boot 3.5.6 |
| Frontend | React 19 + Vite |
| Database | PostgreSQL 15 |
| Security | JWT + Spring Security |
| ORM | Spring Data JPA |
| Maps | Leaflet |

---

## 🛠️ Commandes Utiles

```bash
# Démarrer tout
docker-compose up --build

# Arrêter tout
docker-compose down

# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart backend

# Reset complet de la base de données
docker-compose down -v
docker-compose up -d db
```

---

## 📁 Structure du Projet

```
Alltogether/
├── backend/              # Spring Boot (Java)
│   ├── src/main/java/   # Code source
│   └── src/main/resources/
│       ├── application.properties
│       ├── application-prod.properties
│       └── data-*.sql   # Données initiales
├── frontend/            # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── docker-compose.yml   # Configuration Docker
```

---

## 🐛 Problèmes Courants

### "Cannot connect to database"
```bash
# Vérifier que Docker tourne
docker ps

# Redémarrer PostgreSQL
docker-compose restart db
```

### "Port 8080 already in use"
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8080 | xargs kill -9
```

### Erreurs de compilation Java
- File → Invalidate Caches → Invalidate and Restart
- Supprimer `backend/target/`
- Maven → Reload Project

---

## 🧪 Tests

```bash
# Tests backend
cd backend
mvn test

# Le projet inclut des tests pour:
# - Services (PlaceService, ParticipationService, etc.)
# - Controllers (MapController)
# - Intégration
```

---

## 🔐 Sécurité

- Authentification par **JWT** (JSON Web Tokens)
- Endpoints publics: `/api/auth/**`, `/api/cities/**`, `/api/places/**`
- Endpoints protégés: nécessitent un token JWT

---

## 🤝 Contribution

1. Cloner le projet
2. Créer une branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commiter les changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Pousser la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📞 Support

Consultez **[INSTALLATION.md](INSTALLATION.md)** pour:
- Instructions détaillées d'installation
- Résolution de problèmes
- Configuration avancée
- Workflow de développement

---

## 📄 Licence

Ce projet est un projet éducatif dans le cadre d'un cours de développement web.

---

**🎉 Prêt à développer ! Bon code !**
