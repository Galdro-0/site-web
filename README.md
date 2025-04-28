<<<<<<< HEAD
# ENSA Beni Mellal - Portail Étudiant

Ce projet est un portail étudiant pour l'École Nationale des Sciences Appliquées de Beni Mellal (ENSA-BM). Il permet aux étudiants de consulter leurs emplois du temps, projets, examens et autres informations importantes.

## Fonctionnalités

- **Authentification** : Connexion sécurisée pour les étudiants et les administrateurs
- **Tableau de bord étudiant** : Vue d'ensemble des informations importantes
- **Emplois du temps** : Consultation des emplois du temps par filière et année
- **Projets et deadlines** : Suivi des projets et des échéances
- **Examens** : Calendrier des examens
- **Espace administrateur** : Gestion des étudiants, professeurs, modules et emplois du temps

## Technologies utilisées

- **Frontend** : React, CSS, JavaScript, Vite
- **Backend** : Node.js, Express
- **Base de données** : MongoDB
- **Authentification** : JWT (JSON Web Tokens)

## Installation

### Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- MongoDB

### Installation du frontend

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/ensabm-student-portal.git
cd ensabm-student-portal

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

### Installation du backend

```bash
# Naviguer vers le dossier backend
cd backend

# Installer les dépendances
npm install

# Créer un fichier .env avec les variables d'environnement nécessaires
# Exemple:
# MONGO_URI=mongodb://localhost:27017/ensabm
# JWT_SECRET=votre_secret_jwt
# PORT=5000

# Lancer le serveur
npm start
```

## Captures d'écran

[Ajoutez des captures d'écran de votre application ici]

## Contributeurs

- [Hamza-El-Mourabit](https://github.com/Hamza-El-Mourabit)
- [Galdro-0](https://github.com/Galdro-0)

## Licence

Ce projet est sous licence MIT.
=======
💻 ENSA Web Platform
Bienvenue sur le dépôt officiel de la plateforme web développée pour l'ENSA Beni Mellal. Ce projet complet comprend un backend Node.js/Express et un frontend React, et propose une interface moderne de gestion pour les étudiants, enseignants et administrateurs.

📁 Structure du projet
csharp
Copier
Modifier
.
├── backend/        # Serveur Node.js avec Express, MongoDB, API REST
├── src/            # Frontend React : pages, composants, styles
├── public/         # Fichiers publics utilisés dans l'app
├── index.html      # Point d’entrée HTML
├── package.json    # Dépendances frontend
└── README.md       # Documentation du projet
🚀 Fonctionnalités principales
👨‍🎓 Frontend (React)
Authentification admin et étudiant

Dashboard administrateur

Gestion des emplois du temps, projets, événements, examens

Interface responsive et conviviale

🔧 Backend (Node.js & Express)
API REST sécurisée avec JWT

Contrôleurs et routes bien organisés (auth, admin, projets, emplois du temps…)

Connexion à une base MongoDB

Middleware d’authentification

⚙️ Technologies utilisées
Frontend
React

Vite

CSS Modules / fichiers .css

React Router

Backend
Node.js

Express.js

MongoDB avec Mongoose

JSON Web Tokens (JWT)

Dotenv

📦 Installation
bash
Copier
Modifier
# Clone du projet
git clone https://github.com/Galdro-0/site-web.git
cd site-web

# Installation du backend
cd backend
npm install
cp .env.example .env # Ajoutez vos variables d'environnement
node server.js       # ou nodemon server.js

# Installation du frontend
cd ..
npm install
npm run dev

✨ Auteurs
Développé avec ❤️ par Galdro-0 (Othmane Karim) — Étudiant en IA & Cybersécurité à l’ENSA.
Développé avec ❤️ par  (hamza elmorabit) — Étudiant en IA & Cybersécurité à l’ENSA.
Développé avec ❤️ par  (zaim mohamed) — Étudiant en IA & Cybersécurité à l’ENSA.
Développé avec ❤️ par  (zinelabidine chaouali) — Étudiant en IA & Cybersécurité à l’ENSA.
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
