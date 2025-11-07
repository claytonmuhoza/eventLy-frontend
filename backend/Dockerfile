# Utilisation d'une image Java 21 légère
FROM eclipse-temurin:21-jre

# Répertoire de travail
WORKDIR /app

# Copie du JAR dans le conteneur
COPY app.jar /app/app.jar

# Création du répertoire de données pour H2
RUN mkdir -p /data && \
    adduser --system --home /home/app --group app && \
    chown -R app:app /app /data /home/app

# Utilisateur non-root pour plus de sécurité
USER app

# Fuseau horaire (modifiable via variable d’environnement)
ENV TZ=Europe/Paris

# Volume persistant pour la base de données
VOLUME ["/data"]

# Port exposé (adaptez si besoin)
EXPOSE 8080

# Commande de démarrage du serveur
CMD ["java", "-Duser.timezone=Europe/Paris", "-jar", "/app/app.jar"]
