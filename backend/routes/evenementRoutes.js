const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getAllEvenements,
  getEvenementsByFiliereAnnee,
  getEvenementById,
  createEvenement,
  updateEvenement,
  deleteEvenement
} = require('../controllers/evenementController');

// Route pour récupérer tous les événements (pour l'admin)
router.get('/all', protect, admin, getAllEvenements);

// Routes pour les étudiants et les admins
router.get('/:filiere/:annee', protect, getEvenementsByFiliereAnnee);
router.get('/:id', protect, getEvenementById);

// Routes protégées pour les admins uniquement
router.post('/', protect, admin, createEvenement);
router.put('/:id', protect, admin, updateEvenement);
router.delete('/:id', protect, admin, deleteEvenement);

module.exports = router;
=======
const { protect } = require('../middleware/authMiddleware');
const {
  getEvenements,
  updateEvenements,
  deleteEvenements
} = require('../controllers/evenementController');

// Routes protégées par authentification
router.get('/:filiere/:annee', protect, getEvenements);
router.put('/:filiere/:annee', protect, updateEvenements);
router.delete('/:filiere/:annee', protect, deleteEvenements);

module.exports = router; 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
