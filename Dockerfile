# Étape 1: Construire l'application
FROM node:14 as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json /app/

# Installer les dépendances du projet
RUN npm install

# Copier les fichiers du projet dans le répertoire de travail du conteneur
COPY . /app

# Construire l'application pour la production
RUN npm run build -- --configuration production

# Étape 2: Servir l'application avec un serveur HTTP simple
FROM nginx:alpine

# Copier le résultat de la construction depuis l'étape précédente vers le répertoire de travail de nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Exécuter nginx en premier plan (comportement par défaut de l'image nginx)
