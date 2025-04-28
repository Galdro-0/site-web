const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getProjets,
  getAllProjets,
=======
const { protect } = require('../middleware/authMiddleware');
const {
  getProjets,
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
  createProjet,
  updateProjet,
  deleteProjet
} = require('../controllers/projetController');

<<<<<<< HEAD
// Route pour récupérer tous les projets (pour l'admin)
router.get('/all', protect, admin, getAllProjets);

// Routes protégées par authentification
router.get('/:filiere/:annee', protect, getProjets);
router.post('/', protect, admin, createProjet);
router.put('/:filiere/:annee', protect, admin, updateProjet);
router.delete('/:filiere/:annee', protect, admin, deleteProjet);

module.exports = router;
=======
// Routes protégées par authentification
router.get('/:filiere/:annee', protect, getProjets);
router.post('/', protect, createProjet);
router.put('/:filiere/:annee', protect, updateProjet);
router.delete('/:filiere/:annee', protect, deleteProjet);

module.exports = router; 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
