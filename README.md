

 Projet SyncSport
Ce projet est une application web construite avec Node.js pour le backend et React.js pour le frontend. Il permet de gérer des actualités, avec des fonctionnalités d'affichage, de création, de modification et de suppression d'articles.

Installation
Clonez ce dépôt sur votre machine locale.
Accédez au dossier backend et exécutez npm install pour installer les dépendances du backend.
Accédez au dossier frontend et exécutez npm install pour installer les dépendances du frontend.
Configuration
Backend
Frontend
Assurez-vous que le backend est en cours d'exécution et que la configuration d'URL dans le fichier frontend/src/config.js est correcte pour pointer vers votre serveur backend.
Utilisation
Backend
Accédez au dossier backend.
Exécutez npm start pour démarrer le serveur backend.
Le serveur devrait démarrer sur le port spécifié dans votre fichier .env.
Frontend
Accédez au dossier frontend.
Exécutez npm start pour démarrer le serveur de développement du frontend.
L'application devrait automatiquement s'ouvrir dans votre navigateur par défaut.
Routes
Frontend
/: Page d'accueil affichant les dernières actualités.
/allnews: Page affichant toutes les actualités disponibles.
/news/:id: Page affichant les détails d'une actualité spécifique.
/adminlogin: Page de connexion pour les administrateurs. Utilisez les identifiants admin et password !
/gestion-actus: Page de tableau de bord pour la gestion des actualités.
/modif-actus/:id: Page de formulaire pour modifier une actualité spécifique.
*: Page d'erreur 404 pour les routes non définies.
Technologies Utilisées
Backend: Node.js, Express.js, MongoDB
Frontend: React.js, React Router
