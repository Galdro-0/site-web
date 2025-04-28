const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const {
  getEmploiDuTemps,
  createEmploiDuTemps,
  updateEmploiDuTemps,
  getSemainesDisponibles
=======
const { 
  getEmploiDuTemps, 
  createEmploiDuTemps, 
  updateEmploiDuTemps 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
} = require('../controllers/emploiDuTempsController');
const { protect } = require('../middleware/authMiddleware');

// Routes protégées
router.get('/:filiere/:annee', protect, getEmploiDuTemps);
<<<<<<< HEAD
router.get('/:filiere/:annee/semaines', protect, getSemainesDisponibles);
router.post('/', protect, createEmploiDuTemps);
router.put('/:id', protect, updateEmploiDuTemps);

module.exports = router;
=======
router.post('/', protect, createEmploiDuTemps);
router.put('/:id', protect, updateEmploiDuTemps);

module.exports = router; 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
