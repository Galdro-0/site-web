const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
<<<<<<< HEAD
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
=======
const connectDB = require('./config/db');
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Servir les fichiers statiques depuis le dossier uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin/professors', require('./routes/professorRoutes'));
app.use('/api/admin/modules', require('./routes/moduleRoutes'));
=======
// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
app.use('/api/emplois-du-temps', require('./routes/emploiDuTempsRoutes'));
app.use('/api/emplois-personnalises', require('./routes/emploiPersonnaliseRoutes'));
app.use('/api/planning-exams', require('./routes/planningExamsRoutes'));
app.use('/api/projets', require('./routes/projetRoutes'));
app.use('/api/evenements', require('./routes/evenementRoutes'));
<<<<<<< HEAD
app.use('/api/examens', require('./routes/examenRoutes'));
app.use('/api/formations', require('./routes/formationRoutes'));
app.use('/api/statistics', require('./routes/statisticsRoutes'));
app.use('/api/competences', require('./routes/competenceRoutes'));
app.use('/api/filieres', require('./routes/filiereRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Middleware pour gérer les erreurs
app.use(notFound);
app.use(errorHandler);
=======
app.use('/api/formations', require('./routes/formationRoutes'));
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});