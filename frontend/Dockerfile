# --- frontend/Dockerfile ---
FROM node:18

# Crée un dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers nécessaires et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du code
COPY . .

# Expose le port Vite
EXPOSE 5173

# Lance le serveur de dev
CMD ["npm", "run", "dev"]
