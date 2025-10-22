# 🚀 Guide de Démarrage Rapide

## ✅ Vérifications Préalables

Avant de commencer, assurez-vous d'avoir :
- ✅ Java 17 ou supérieur
- ✅ Node.js 18 ou supérieur
- ✅ Docker (ou PostgreSQL installé localement)

---

## 🎯 Démarrage en 3 Étapes

### 1️⃣ Démarrer la Base de Données

```bash
cd backend
docker-compose up -d
```

**Vérification** : La base de données PostgreSQL est disponible sur `localhost:5432`

---

### 2️⃣ Démarrer le Backend

**Dans un nouveau terminal :**

```bash
cd backend
mvnw spring-boot:run
```

**Vérification** : Vous devriez voir dans la console :
```
Started AlltogetherApplication in X.XXX seconds
```

Le backend est maintenant disponible sur **http://localhost:8080**

---

### 3️⃣ Démarrer le Frontend

**Dans un nouveau terminal :**

```bash
cd frontend
npm install     # Seulement la première fois
npm run dev
```

**Vérification** : Vous devriez voir :
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
```

Le frontend est maintenant disponible sur **http://localhost:5173**

---

## 🧪 Tester l'Application

### 1. Ouvrir le navigateur
Allez sur **http://localhost:5173**

### 2. Créer un compte
- Cliquez sur "S'inscrire"
- Remplissez le formulaire
- Soumettez

### 3. Se connecter
- Utilisez vos identifiants
- Vous recevez un token JWT

### 4. Explorer les villes
- Parcourez les 11 villes françaises
- Cliquez sur une ville pour voir ses lieux

### 5. Participer à une activité
- Sur la page d'un lieu, cliquez "J'y vais aujourd'hui"
- Le compteur s'incrémente

---

## 🛠️ Commandes Utiles

### Backend
```bash
# Arrêter le backend
Ctrl + C

# Nettoyer et recompiler
cd backend
mvnw clean install

# Voir les logs
tail -f logs/spring.log
```

### Frontend
```bash
# Arrêter le frontend
Ctrl + C

# Nettoyer et réinstaller
cd frontend
rm -rf node_modules
npm install

# Build pour production
npm run build
```

### Base de Données
```bash
# Arrêter PostgreSQL
cd backend
docker-compose down

# Redémarrer (efface les données)
docker-compose down -v
docker-compose up -d
```

---

## 🔧 Configuration des Ports

**Ne changez PAS ces ports, sinon l'application ne fonctionnera pas !**

| Service | Port | URL |
|---------|------|-----|
| Backend | 8080 | http://localhost:8080 |
| Frontend | 5173 | http://localhost:5173 |
| PostgreSQL | 5432 | localhost:5432 |

---

## ⚠️ Problèmes Courants

### ❌ "Port 8080 already in use"
**Solution** : Un autre processus utilise le port 8080
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

### ❌ "Cannot connect to PostgreSQL"
**Solution** : PostgreSQL n'est pas démarré
```bash
cd backend
docker-compose up -d
```

### ❌ "npm ERR! ECONNREFUSED"
**Solution** : Le backend n'est pas démarré, lancez-le d'abord !

### ❌ Erreur CORS dans la console du navigateur
**Solution** : Vérifiez que :
1. Le backend est bien sur le port 8080
2. Le frontend est bien sur le port 5173
3. Les deux sont lancés

---

## 📊 Données de Test

### Compte Admin
```
Email: admin@alltogether.com
Password: admin123
```

### Villes disponibles
Paris, Lyon, Marseille, Toulouse, Nice, Nantes, Montpellier, Strasbourg, Bordeaux, Lille, Rennes

### Catégories de lieux
BAR, NIGHTCLUB, MUSEUM, LIBRARY, PARK, MONUMENT, RESTAURANT, CINEMA, THEATER, SPORT

---

## 🎓 Workflow de Développement

### Workflow typique :

1. **Matin** : Démarrer tous les services
   ```bash
   # Terminal 1
   cd backend
   docker-compose up -d
   mvnw spring-boot:run
   
   # Terminal 2
   cd frontend
   npm run dev
   ```

2. **Développement** : Modifier le code
   - Backend : Les changements nécessitent un redémarrage
   - Frontend : Hot reload automatique (rechargement instantané)

3. **Test** : Tester dans le navigateur
   - Backend : http://localhost:8080/api/cities (test API)
   - Frontend : http://localhost:5173

4. **Soir** : Arrêter les services
   ```bash
   # Ctrl+C dans chaque terminal
   # Optionnel : arrêter PostgreSQL
   cd backend
   docker-compose down
   ```

---

## 🔐 Authentification

### Comment ça marche ?

1. **Login** → Reçoit un JWT token
2. **Token stocké** dans `sessionStorage`
3. **Requêtes suivantes** → Header `Authorization: Bearer {token}`
4. **Token valide 24h**

### Dans le code frontend :
```javascript
import { authService } from './services/authService';

// Se connecter
const data = await authService.login('email@test.com', 'password');

// Vérifier si connecté
const isAuth = authService.isAuthenticated();

// Se déconnecter
authService.logout();
```

---

## 📝 Prochaines Étapes

1. ✅ Familiarisez-vous avec la structure du code
2. ✅ Testez tous les endpoints API
3. ✅ Vérifiez que le frontend communique bien avec le backend
4. ✅ Commencez à développer les fonctionnalités manquantes
5. ✅ Committez régulièrement vos changements

---

## 🆘 Besoin d'Aide ?

- **Documentation API** : Voir `API_DOCUMENTATION.md`
- **Guide d'intégration** : Voir `INTEGRATION_GUIDE.md`
- **Backend** : Voir `backend/README.md`
- **Frontend** : Voir `frontend/README.md`

---

**Bonne chance avec le développement ! 🚀**
# Compiled class file
*.class

# Log file
*.log

# BlueJ files
*.ctxt

# Mobile Tools for Java (J2ME)
.mtj.tmp/

# Package Files #
*.jar
*.war
*.nar
*.ear
*.zip
*.tar.gz
*.rar

# virtual machine crash logs
hs_err_pid*
replay_pid*

# Maven
target/
pom.xml.tag
pom.xml.releaseBackup
pom.xml.versionsBackup
pom.xml.next
release.properties
dependency-reduced-pom.xml
buildNumber.properties
.mvn/timing.properties
.mvn/wrapper/maven-wrapper.jar

# IntelliJ IDEA
.idea/
*.iws
*.iml
*.ipr

# Eclipse
.apt_generated
.classpath
.factorypath
.project
.settings
.springBeans
.sts4-cache

# NetBeans
/nbproject/private/
/nbbuild/
/dist/
/nbdist/
/.nb-gradle/
build/

# VS Code
.vscode/

# OS
.DS_Store
Thumbs.db

# Application specific
uploads/*.jpg
uploads/*.jpeg
uploads/*.png
uploads/*.gif
uploads/*.webp
!uploads/.gitkeep

