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
Développé avec ❤️ par Galdro-0 (zaim mohamed) — Étudiant en IA & Cybersécurité à l’ENSA.
Développé avec ❤️ par Galdro-0 (zinelabidine chaouali) — Étudiant en IA & Cybersécurité à l’ENSA.
