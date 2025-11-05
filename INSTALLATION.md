# 🚀 Guide d'Installation Complet - Alltogether

Ce guide est conçu pour permettre à **n'importe qui** de démarrer le projet rapidement sur un nouveau PC.

## 📋 Prérequis Obligatoires

### 1. Installer les logiciels nécessaires

Téléchargez et installez dans cet ordre :

1. **Git** → https://git-scm.com/downloads
2. **Docker Desktop** → https://www.docker.com/products/docker-desktop/
   - ⚠️ **IMPORTANT** : Après l'installation, lancez Docker Desktop et attendez qu'il soit complètement démarré (icône verte dans la barre des tâches)
3. **Java JDK 17+** → https://adoptium.net/ (Télécharger Temurin 17 LTS)
4. **IntelliJ IDEA Ultimate** → https://www.jetbrains.com/idea/download/
   - Ou IntelliJ Community + plugins Spring Boot
5. **Node.js 18+** → https://nodejs.org/ (version LTS recommandée)

### 2. Vérifier les installations

Ouvrez un terminal (PowerShell sur Windows, Terminal sur Mac/Linux) et tapez :

```bash
git --version
docker --version
docker-compose --version
java -version
node -v
npm -v
```

Toutes les commandes doivent retourner un numéro de version.

---

## 📥 Récupérer le Projet

### Option 1 : Cloner avec Git (recommandé)
```bash
git clone https://github.com/Paolo-br/Projet_Web_BRACQ_REVERET.git
cd Projet_Web_BRACQ_REVERET
```

### Option 2 : Télécharger le ZIP
1. Aller sur GitHub → Bouton "Code" vert → "Download ZIP"
2. Extraire le ZIP dans un dossier de votre choix
3. Ouvrir un terminal dans ce dossier

---

## 🐳 Méthode 1 : Tout avec Docker (La plus simple !)

Cette méthode lance **tout le projet** (base de données + backend + frontend) avec une seule commande.

### Étape 1 : Démarrer Docker Desktop
- Lancez Docker Desktop et attendez qu'il soit prêt (icône verte)

### Étape 2 : Lancer le projet
```bash
docker-compose up --build
```

**Première fois** : L'opération peut prendre 5-10 minutes (téléchargement des images, compilation).

**Ensuite, accéder aux services** :
- 🌐 Frontend : http://localhost:5173
- 🔧 Backend API : http://localhost:8080
- 🗄️ Base de données PostgreSQL : localhost:5432

### Arrêter le projet
```bash
# Ctrl+C dans le terminal, puis :
docker-compose down
```

### Redémarrer le projet (plus rapide)
```bash
docker-compose up
```

---

## 💻 Méthode 2 : Développement Local (IntelliJ + npm)

Cette méthode est préférable pour le développement car elle permet le **hot reload** (rechargement automatique).

### Étape 1 : Lancer uniquement PostgreSQL
```bash
docker-compose up -d db
```

Vérifier que PostgreSQL tourne :
```bash
docker ps
```
Vous devez voir `alltogether-db` en cours d'exécution.

### Étape 2 : Configurer et lancer le Backend

#### A. Ouvrir le projet dans IntelliJ
1. **File** → **Open** → Sélectionner le dossier racine `Projet_Web_BRACQ_REVERET`
2. Attendre que IntelliJ indexe le projet

#### B. Configurer le JDK
1. **File** → **Project Structure** (Ctrl+Alt+Shift+S)
2. Onglet **Project**
3. **SDK** : Sélectionner JDK 17 ou supérieur
   - Si absent : **Add SDK** → **Download JDK** → Choisir Temurin 17

#### C. Charger les dépendances Maven
1. Clic droit sur `backend/pom.xml`
2. **Maven** → **Reload Project**
3. Ou cliquer sur l'icône 🔄 Maven dans la sidebar

#### D. Lancer le Backend
1. Ouvrir `backend/src/main/java/com/example/alltogether/AlltogetherApplication.java`
2. Clic droit sur le fichier → **Run 'AlltogetherApplication'**
3. Ou cliquer sur le bouton ▶️ vert

**Vérification** : Dans la console, vous devez voir :
```
Started AlltogetherApplication in X.XXX seconds (JVM running for X.XXX)
```

Tester dans un navigateur : http://localhost:8080/api/cities

### Étape 3 : Lancer le Frontend

#### A. Installer les dépendances
Ouvrir un terminal dans IntelliJ (**View** → **Tool Windows** → **Terminal** ou `Alt+F12`) :

```bash
cd frontend
npm install
```

#### B. Lancer le serveur de développement
```bash
npm run dev
```

Le frontend démarre sur **http://localhost:5173**

---

## ⚙️ Configuration de la Base de Données

### Informations de connexion PostgreSQL

Ces informations sont déjà configurées dans le projet, mais au cas où :

| Paramètre | Valeur |
|-----------|---------|
| Host | localhost |
| Port | 5432 |
| Database | alltogether |
| Username | postgres |
| Password | BaseD@ta2025 |

### Se connecter à PostgreSQL (optionnel)

Vous pouvez utiliser DBeaver, pgAdmin, ou la ligne de commande :

```bash
docker exec -it alltogether-db psql -U postgres -d alltogether
```

### Réinitialiser la base de données

Si vous voulez repartir de zéro :
```bash
docker-compose down -v
docker-compose up -d db
```

---

## 🧪 Vérifications et Tests

### 1. Backend opérationnel
```bash
# Doit retourner un JSON avec des villes
curl http://localhost:8080/api/cities
```

Ou dans un navigateur : http://localhost:8080/api/cities

### 2. Frontend opérationnel
Ouvrir http://localhost:5173 → Vous devez voir la page d'accueil

### 3. Base de données connectée
Dans les logs du backend (console IntelliJ), vous devez voir :
```
HikariPool-1 - Start completed.
```

---

## 🐛 Résolution des Problèmes Courants

### ❌ Erreur : "Port 8080 is already in use"

**Cause** : Un autre processus utilise le port 8080.

**Solutions** :
1. Trouver et arrêter le processus :
   ```bash
   # Windows PowerShell
   netstat -ano | findstr :8080
   # Noter le PID et tuer le processus
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:8080 | xargs kill -9
   ```

2. Ou changer le port dans `backend/src/main/resources/application.properties` :
   ```properties
   server.port=8081
   ```

### ❌ Erreur : "Cannot connect to database" / "Connection refused"

**Cause** : PostgreSQL n'est pas démarré ou pas accessible.

**Solutions** :
1. Vérifier que Docker Desktop est lancé
2. Vérifier les conteneurs actifs :
   ```bash
   docker ps
   ```
3. Relancer PostgreSQL :
   ```bash
   docker-compose restart db
   ```
4. Vérifier les logs :
   ```bash
   docker-compose logs db
   ```

### ❌ Erreur : "Password authentication failed for user postgres"

**Cause** : Le mot de passe ne correspond pas.

**Solutions** :
1. Vérifier que `application-prod.properties` contient bien :
   ```properties
   spring.datasource.password=BaseD@ta2025
   ```
2. Si vous avez modifié le docker-compose, il faut supprimer le volume :
   ```bash
   docker-compose down -v
   docker-compose up -d db
   ```

### ❌ Erreur : "Cannot resolve symbol" ou problèmes de compilation Java

**Solutions** :
1. **File** → **Invalidate Caches** → **Invalidate and Restart**
2. Supprimer le dossier `backend/target/`
3. Maven Reload : Clic droit sur `pom.xml` → **Maven** → **Reload Project**
4. Vérifier le JDK : **File** → **Project Structure** → **SDK** doit être JDK 17+

### ❌ Erreur npm : "ENOENT: no such file or directory"

**Solutions** :
1. Supprimer `node_modules` et `package-lock.json`
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

### ❌ CORS Errors dans le navigateur

**Cause** : Le backend n'autorise pas les requêtes depuis le frontend.

**Solutions** :
1. Vérifier que le backend tourne bien sur port 8080
2. La configuration CORS devrait déjà être correcte dans `SecurityConfig.java`
3. Vider le cache du navigateur (Ctrl+Shift+R)

### ❌ Docker Compose ne démarre pas

**Solutions** :
1. Vérifier que Docker Desktop est bien lancé
2. Redémarrer Docker Desktop
3. Vérifier les logs :
   ```bash
   docker-compose logs
   ```

---

## 📂 Structure du Projet

```
Alltogether/
├── backend/                              # Application Spring Boot (Java)
│   ├── src/main/java/com/example/alltogether/
│   │   ├── controller/                  # Endpoints REST
│   │   ├── service/                     # Logique métier
│   │   ├── repository/                  # Accès base de données
│   │   ├── model/                       # Entités JPA
│   │   ├── dto/                         # Data Transfer Objects
│   │   ├── config/                      # Configuration
│   │   └── security/                    # JWT, authentification
│   ├── src/main/resources/
│   │   ├── application.properties       # Config principale
│   │   ├── application-prod.properties  # Config PostgreSQL
│   │   ├── data-cities-places.sql       # Données initiales
│   │   └── static/uploads/              # Photos uploadées
│   ├── Dockerfile                       # Image Docker backend
│   └── pom.xml                          # Dépendances Maven
│
├── frontend/                             # Application React + Vite
│   ├── src/
│   │   ├── components/                  # Composants réutilisables
│   │   ├── pages/                       # Pages (Home, Login, etc.)
│   │   ├── services/                    # Appels API
│   │   └── config/                      # Configuration
│   ├── Dockerfile                       # Image Docker frontend
│   └── package.json                     # Dépendances npm
│
├── docker-compose.yml                   # Orchestration des conteneurs
└── README.md                            # Documentation
```

---

## 🔐 Sécurité et Authentification

Le projet utilise **JWT (JSON Web Tokens)** pour l'authentification.

### Endpoints publics (pas besoin de token)
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/cities/**` - Liste des villes
- `GET /api/places/**` - Liste des lieux
- `GET /api/map/**` - Données de carte

### Endpoints protégés (token JWT requis)
- `GET /api/profile` - Profil utilisateur
- `POST /api/participations/**` - Participations aux activités
- Etc.

Pour accéder aux endpoints protégés depuis Postman ou curl :
```bash
Authorization: Bearer <votre_token_jwt>
```

---

## 📊 Ports Utilisés

| Service | Port Local | URL |
|---------|-----------|-----|
| Frontend (React) | 5173 | http://localhost:5173 |
| Backend (Spring Boot) | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | localhost:5432 |

---

## 🛠️ Commandes Utiles

### Docker
```bash
# Tout démarrer
docker-compose up --build

# Démarrer en arrière-plan
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter tout
docker-compose down

# Arrêter et supprimer les volumes (reset BDD)
docker-compose down -v

# Voir les conteneurs actifs
docker ps

# Redémarrer un service
docker-compose restart backend
```

### Maven (Backend)
```bash
cd backend

# Compiler le projet
mvn clean install

# Lancer les tests
mvn test

# Lancer l'application
mvn spring-boot:run
```

### npm (Frontend)
```bash
cd frontend

# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

---

## 🤝 Workflow Recommandé

### Pour le développement quotidien :
1. Lancer Docker Desktop
2. Démarrer PostgreSQL : `docker-compose up -d db`
3. Lancer le backend dans IntelliJ (▶️)
4. Lancer le frontend : `cd frontend && npm run dev`
5. Coder et tester !

### Pour tester la version de production :
```bash
docker-compose up --build
```

---

## 📞 Besoin d'Aide ?

1. **Vérifier les logs** :
   - Backend : Console IntelliJ
   - Frontend : Terminal npm
   - PostgreSQL : `docker-compose logs db`

2. **Problème persistant** ?
   - Supprimer tous les conteneurs : `docker-compose down -v`
   - Supprimer `backend/target/`, `frontend/node_modules/`
   - Recommencer l'installation

3. **Toujours bloqué ?**
   - Consulter ce guide section "Résolution des Problèmes"
   - Vérifier les issues GitHub du projet

---

## 📚 Technologies Utilisées

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Backend | Spring Boot | 3.5.6 |
| Security | Spring Security + JWT | - |
| ORM | Spring Data JPA | - |
| Database | PostgreSQL | 15 |
| Frontend | React | 19 |
| Build Tool (Frontend) | Vite | - |
| Routing | React Router DOM | - |
| Maps | Leaflet | - |
| Build Tool (Backend) | Maven | - |
| Java | JDK | 17+ |
| Containerization | Docker | - |

---

**🎉 Vous êtes prêt à développer ! Bon code !**
