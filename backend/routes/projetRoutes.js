const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getProjets,
  createProjet,
  updateProjet,
  deleteProjet
} = require('../controllers/projetController');

// Routes protégées par authentification
router.get('/:filiere/:annee', protect, getProjets);
router.post('/', protect, createProjet);
router.put('/:filiere/:annee', protect, updateProjet);
router.delete('/:filiere/:annee', protect, deleteProjet);

module.exports = router; 