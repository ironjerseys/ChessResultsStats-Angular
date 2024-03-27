# Étape 1: Construire l'application
FROM node:lts as build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json /app/

# Installer les dépendances du projet tout en ignorant les scripts
RUN npm install --ignore-scripts

# Copier les fichiers du projet dans le répertoire de travail du conteneur
COPY package*.json ./
COPY src ./src
COPY angular.json .
COPY tsconfig.app.json .
COPY tsconfig.json .
COPY ngsw-config.json .

# Construire l'application pour la production
RUN npm run build -- --configuration production

# Étape 2: Servir l'application avec un serveur HTTP simple
FROM nginx:alpine

# Copier le résultat de la construction depuis l'étape précédente vers le répertoire de travail de nginx
COPY --from=build /app/dist/* /usr/share/nginx/html/

# Ajouter un utilisateur non privilégié et changer l'utilisateur par défaut
RUN addgroup -S nonrootgroup && adduser -S nonrootuser -G nonrootgroup

# Ajuster les permissions des répertoires nécessaires
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx && \
    chown -R nonrootuser:nonrootgroup /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    touch /var/run/nginx.pid && \
    chown -R nonrootuser:nonrootgroup /var/run/nginx.pid

# Changer l'utilisateur par défaut
USER nonrootuser

# Exposer le port 80 pour accéder à l'application
EXPOSE 80

# Configurer nginx pour utiliser un fichier PID accessible par l'utilisateur non privilégié
CMD ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf", "-p", "/usr/share/nginx/"]