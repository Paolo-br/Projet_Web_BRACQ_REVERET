# 🌍 Alltogether - Plateforme Erasmus

Application web collaborative permettant aux étudiants Erasmus de découvrir, partager et organiser des activités dans différentes villes françaises.

**Auteurs :** BRACQ Paolo & REVERET Pablo
**Formation :** Master Informatique - Polytech Paris-Saclay  
**Année :** 2024-2025

---

## 📋 Technologies

- **Backend :** Spring Boot 3.5.6 (Java 17)
- **Frontend :** React 19 + Vite
- **Base de données :** PostgreSQL 15
- **Sécurité :** Spring Security + JWT
- **Cartographie :** Leaflet
- **Tests :** JUnit 5, Vitest (44 tests au total)

---

## 🚀 Installation et Lancement

### Prérequis
- Docker Desktop
- Java JDK 17+
- Node.js 18+
- Git

### Méthode 1 : Docker (Recommandé)

```bash
# Cloner le projet
git clone https://github.com/Paolo-br/Projet_Web_BRACQ_REVERET.git
cd Projet_Web_BRACQ_REVERET

# Lancer tous les services
docker-compose up --build
```

**Accès :**
- Frontend : http://localhost:5173
- Backend : http://localhost:8080
- Base de données : localhost:5432

### Méthode 2 : Développement Local

```bash
# 1. Base de données
docker-compose up -d db

# 2. Backend (IntelliJ IDEA)
# Ouvrir AlltogetherApplication.java → Run

# 3. Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev
```

---

## 🧪 Tests

### Backend (33 tests)
```bash
cd backend
mvn test
```

### Frontend (11 tests)
```bash
cd frontend
npm test -- --run
```

---

## ⚙️ Configuration

### Base de Données
- **Host :** localhost:5432
- **Database :** alltogether
- **Username :** postgres
- **Password :** BaseD@ta2025

### Données Préchargées
- 11 villes françaises
- ~130 lieux (bars, restaurants, parcs, musées, monuments)
- Photos pour chaque lieu

---

## 🔐 Sécurité

- Authentification JWT
- Endpoints publics : `/api/auth/**`, `/api/cities/**`, `/api/places/**`
- Endpoints protégés : requièrent un token JWT valide
- Mots de passe hashés avec BCrypt

---

## 🛠️ Résolution de Problèmes

**Erreur de connexion à la base :**
```bash
docker-compose restart db
```

**Port déjà utilisé :**
```powershell
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Erreur npm :**
```bash
cd frontend
npm install --legacy-peer-deps
```
---

## 📄 Licence

Projet éducatif - Polytech Paris-Saclay


