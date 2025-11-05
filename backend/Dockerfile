# Dockerfile pour le Backend Spring Boot

# Étape 1: Build avec Maven
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copier le pom.xml et télécharger les dépendances (mise en cache)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copier le code source et compiler
COPY src ./src
RUN mvn clean package -DskipTests

# Étape 2: Image finale légère pour exécution
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copier le JAR compilé depuis l'étape de build
COPY --from=build /app/target/*.jar app.jar

# Créer le dossier uploads
RUN mkdir -p uploads

# Exposer le port 8080
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
