const EmploiDuTemps = require('../models/EmploiDuTemps');

// @desc    Get emploi du temps by filiere and annee
// @route   GET /api/emplois-du-temps/:filiere/:annee
// @access  Private
const getEmploiDuTemps = async (req, res) => {
  try {
    const { filiere, annee } = req.params;

    const emploiDuTemps = await EmploiDuTemps.findOne({ filiere, annee });

    if (!emploiDuTemps) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }

    res.json(emploiDuTemps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new emploi du temps
// @route   POST /api/emplois-du-temps
// @access  Private (Admin only)
const createEmploiDuTemps = async (req, res) => {
  try {
    const { filiere, annee, emplois } = req.body;

    // Vérifier si l'emploi du temps existe déjà
    const emploiDuTempsExists = await EmploiDuTemps.findOne({ filiere, annee });
    if (emploiDuTempsExists) {
      return res.status(400).json({ message: 'Emploi du temps déjà existant' });
    }

    const emploiDuTemps = await EmploiDuTemps.create({
      filiere,
      annee,
      emplois
    });

    res.status(201).json(emploiDuTemps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update emploi du temps
// @route   PUT /api/emplois-du-temps/:id
// @access  Private (Admin only)
const updateEmploiDuTemps = async (req, res) => {
  try {
    const { id } = req.params;
    const { emplois } = req.body;

    const emploiDuTemps = await EmploiDuTemps.findById(id);

    if (!emploiDuTemps) {
      return res.status(404).json({ message: 'Emploi du temps non trouvé' });
    }

    emploiDuTemps.emplois = emplois;
    await emploiDuTemps.save();

    res.json(emploiDuTemps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmploiDuTemps,
  createEmploiDuTemps,
  updateEmploiDuTemps
}; 