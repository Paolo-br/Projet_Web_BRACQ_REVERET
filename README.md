# Alltogether - Guide d'installation

Projet Web de gestion de villes et d'activités Erasmus avec Spring Boot (Backend) et React (Frontend).

## 📋 Prérequis

### Logiciels nécessaires

1. **IntelliJ IDEA Ultimate** (pour le support Spring Boot complet)
2. **Java Development Kit (JDK) 17** ou supérieur
   - Vérifier avec : `java -version`
   - Télécharger depuis : https://adoptium.net/ ou https://www.oracle.com/java/technologies/downloads/
3. **Node.js 18+** et **npm**
   - Vérifier avec : `node -v` et `npm -v`
   - Télécharger depuis : https://nodejs.org/
4. **Docker Desktop** (pour PostgreSQL)
   - Télécharger depuis : https://www.docker.com/products/docker-desktop/
5. **Git** (pour cloner le projet)

## 🚀 Installation et Configuration

### 1. Récupérer le projet

1. Sur GitHub, cliquer sur le bouton **Code** (vert)
2. Sélectionner **Download ZIP**
3. Extraire le fichier ZIP dans un dossier de votre choix
4. Renommer le dossier extrait en `Alltogether` si nécessaire


### 2. Configuration de la base de données PostgreSQL

Le projet utilise PostgreSQL en mode production. 

1. Démarrer Docker Desktop
2. Lancer PostgreSQL avec docker-compose :

```bash
docker-compose up -d db
```

Cela va créer une base de données PostgreSQL avec :
- **Port** : 5432
- **Database** : Alltogether
- **Username** : postgres
- **Password** : BaseD@ta2025

Pour vérifier que la base est bien lancée :
```bash
docker ps
```

### 3. Configuration du Backend (Spring Boot)

#### Avec IntelliJ IDEA Ultimate :

1. **Ouvrir le projet** :
   - File → Open → Sélectionner le dossier `Alltogether`
   - IntelliJ détectera automatiquement le projet Maven

2. **Configurer le JDK** :
   - File → Project Structure → Project → SDK
   - Sélectionner JDK 17 ou supérieur
   - Si absent, cliquer sur "Add SDK" → "Download JDK"

3. **Importer les dépendances Maven** :
   - Ouvrir le fichier `backend/pom.xml`
   - Clic droit → Maven → Reload Project
   - Ou cliquer sur l'icône Maven (🔄) dans IntelliJ

4. **Lancer l'application Spring Boot** :
   - Ouvrir `backend/src/main/java/com/example/alltogether/AlltogetherApplication.java`
   - Clic droit → Run 'AlltogetherApplication'
   - Ou utiliser le bouton ▶️ vert à côté de la classe

   Le backend démarrera sur **http://localhost:8080**

#### Vérifier que le backend fonctionne :

Une fois démarré, vous devriez voir dans la console :
```
Started AlltogetherApplication in X.XXX seconds
```

Tester dans un navigateur : http://localhost:8080/api/cities

### 4. Configuration du Frontend (React + Vite)

1. **Ouvrir un terminal** dans IntelliJ :
   - View → Tool Windows → Terminal
   - Ou Alt+F12

2. **Naviguer vers le dossier frontend** :
   ```bash
   cd frontend
   ```

3. **Lancer le serveur de développement** :
   ```bash
   npm run dev
   ```

   Le frontend démarrera sur **http://localhost:5173**

4. **Ouvrir l'application** :
   - Ouvrir votre navigateur à http://localhost:5173

## 📁 Structure du Projet

```
Alltogether/
├── backend/                    # Application Spring Boot
│   ├── src/main/java/         # Code source Java
│   │   └── com/example/alltogether/
│   │       ├── controller/    # Controllers REST
│   │       ├── service/       # Logique métier
│   │       ├── repository/    # Accès données (JPA)
│   │       ├── model/         # Entités JPA
│   │       ├── dto/           # Data Transfer Objects
│   │       ├── config/        # Configuration (Security, etc.)
│   │       └── security/      # JWT, Auth
│   └── src/main/resources/    # Configuration et données
│       ├── application.properties
│       ├── application-local.properties  # H2 (dev)
│       ├── application-prod.properties   # PostgreSQL
│       ├── data-cities-places.sql        # Données initiales
│       └── static/uploads/               # Fichiers uploadés
│
├── frontend/                   # Application React
│   ├── src/
│   │   ├── components/        # Composants réutilisables
│   │   ├── pages/             # Pages de l'application
│   │   ├── services/          # Appels API
│   │   └── config/            # Configuration API
│   └── public/                # Assets statiques
│
└── docker-compose.yml         # Configuration Docker
```

## 🔧 Configuration des Ports

- **Backend (Spring Boot)** : http://localhost:8080
- **Frontend (Vite/React)** : http://localhost:5173
- **PostgreSQL** : localhost:5432


## 🔐 Configuration de Sécurité

Le projet utilise **JWT** (JSON Web Tokens) pour l'authentification.

- Les endpoints publics : `/api/auth/**`, `/api/cities/**`, `/api/places/**`, `/api/map/**`
- Les endpoints protégés nécessitent un token JWT dans le header `Authorization: Bearer <token>`

### Comptes par défaut

Si des données de test sont chargées, vérifier le fichier `data-cities-places.sql` pour les utilisateurs existants.

## 📊 Base de Données

### Mode Production (PostgreSQL)
- Host : localhost:5432
- Database : Alltogether
- Username : postgres
- Password : BaseD@ta2025

Les données initiales sont chargées automatiquement depuis :
- `data-cities-places.sql` (villes et lieux)
- `data-photos.sql` (photos)

## ⚠️ Problèmes Courants

### 1. "Port 8080 already in use"
- Un autre processus utilise le port 8080
- Solution : Arrêter l'autre processus ou changer le port dans `application.properties` :
  ```properties
  server.port=8081
  ```

### 2. "Cannot connect to database"
- Vérifier que Docker Desktop est lancé
- Vérifier que PostgreSQL tourne : `docker ps`
- Relancer : `docker-compose restart db`

### 3. Erreurs "Cannot find symbol" ou problèmes de compilation
- Vérifier que le JDK 17+ est bien configuré
- File → Invalidate Caches → Invalidate and Restart
- Supprimer le dossier `target/` et relancer Maven Reload

### 4. Erreurs npm install
- Supprimer `node_modules` et `package-lock.json`
- Relancer `npm install`

### 5. CORS errors dans le navigateur
- Vérifier que le backend tourne sur port 8080
- Vérifier la configuration CORS dans `SecurityConfig.java`

## 🤝 Workflow de Développement

1. **S'assurer que Docker tourne** (si mode prod avec PostgreSQL)
2. **Lancer le backend** dans IntelliJ
3. **Lancer le frontend** avec `npm run dev` dans un terminal
4. **Coder et tester**

## 📚 Technologies Utilisées

### Backend
- Spring Boot 3.5.6
- Spring Security + JWT
- Spring Data JPA
- PostgreSQL / H2
- Maven

### Frontend
- React 19
- Vite
- React Router DOM
- Leaflet (cartes interactives)
- CSS vanilla

## 📞 Support

En cas de problème :
1. Vérifier les logs dans la console IntelliJ (backend)
2. Vérifier les logs dans le terminal (frontend)
3. Vérifier les logs Docker : `docker-compose logs -f`
4. Consulter la documentation officielle des technologies utilisées

---

**Bon développement ! 🚀**
