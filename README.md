Construisez une API sécurisée pour une application d'avis gastronomiques
6ème projet de la formation de développeur web de OpenClassrooms

Scénario
Développement d'une application web nommée "Piiquante" dans laquelle les utilisateurs pourront ajouter leurs sauces préférées et liker ou disliker les sauces proposées par les autres utilisateurs.
Le but est de créer le backend de l'application, le frontend étant déjà codé et fourni.

Objectifs du projet et compétences évaluées
Développement Backend en Javascript

Serveur Node.js
Framework Express
Base de données MongoDB
Hébergement sur MongoDB Atlas
Opérations relatives à la BDD réalisées avec mongoose
API REST
Sécurité OWASP et RGPD
Mesures de sécurité mises en place
Hashage du mot de passe utilisateur avec bcrypt
Cryptage des emails utilisateurs dans la base de données avec crypto-js
Manupulation sécurisée de la base de donnée avec mongoose
Vérification que l'email utilisateur soit unique dans la base de données avec mongoose-unique-validator
Utilisation de variables d'environnement pour les données sensibles avec dotenv
Authentification de l'utilisateur par token avec jsonwebtoken
Protection des headers avec helmet


Cloner ce repository actuel
Ajouter un fichier de configuration nommé ".env" à la racine du backend. A l'intérieur, 3 variables d'environnement "secrètes" seront définies:
SECRET_TOKEN="token: jwt.sign('RANDOM_TOKEN_SECRET')"
SECRET_CRYPTOJS_TOKEN="req.body.email"
SECRET_DB="mongodb+srv://stevanparisian:Nick-cave-1982!@cluster0.ruejc.mongodb.net/test?retryWrites=true&w=majority"

Lancer le backend et frontend:

Dans le terminal,
Installer les dépendances: npm install
Lancer node server ou npm run serve
Pour des tests spécifiques (avec postman par exemple), le backend répond à l'adresse: http://localhost:3000 (attention: authentification requise pour toutes les routes /api/sauces/)