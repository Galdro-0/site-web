const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getFormations,
  getFormationById,
  getLatestFormations,
  createFormation,
  updateFormation,
  deleteFormation,
  getStudentFormations,
  getStudentInscriptions,
  getFormationStudents,
  inscriptionFormation,
  desinscriptionFormation
=======
const { protect } = require('../middleware/authMiddleware');
const {
  getFormations,
  getLatestFormations,
  createFormation,
  updateFormation,
  deleteFormation
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
} = require('../controllers/formationController');

// Routes publiques
router.get('/', getFormations);
router.get('/latest', getLatestFormations);

<<<<<<< HEAD
// Routes pour récupérer les formations d'un étudiant (protégées)
router.get('/etudiant', protect, getStudentFormations);
router.get('/etudiant/inscriptions', protect, getStudentInscriptions);

// Route pour récupérer une formation par ID
router.get('/:id', getFormationById);

// Routes pour l'inscription/désinscription (protégées)
router.post('/:id/inscription', protect, inscriptionFormation);
router.delete('/:id/inscription', protect, desinscriptionFormation);
router.delete('/:id/inscription/:studentId', protect, admin, desinscriptionFormation);

// Route pour récupérer les étudiants inscrits à une formation (admin seulement)
router.get('/:id/etudiants', protect, admin, getFormationStudents);

// Routes protégées par authentification admin
router.post('/', protect, admin, createFormation);
router.put('/:id', protect, admin, updateFormation);
router.delete('/:id', protect, admin, deleteFormation);
=======
// Routes protégées par authentification
router.post('/', protect, createFormation);
router.put('/:id', protect, updateFormation);
router.delete('/:id', protect, deleteFormation);
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac

module.exports = router;
