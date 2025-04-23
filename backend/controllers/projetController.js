const Projet = require('../models/Projet');

// Récupérer les projets
exports.getProjets = async (req, res) => {
  try {
    const { filiere, annee } = req.params;
    const projets = await Projet.findOne({ filiere, annee });
    
    if (!projets) {
      return res.status(404).json({ message: 'Aucun projet trouvé' });
    }
    
    res.json(projets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouveau projet
exports.createProjet = async (req, res) => {
  try {
    const projet = new Projet(req.body);
    const savedProjet = await projet.save();
    res.status(201).json(savedProjet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un projet
exports.updateProjet = async (req, res) => {
  try {
    const { filiere, annee } = req.params;
    const projet = await Projet.findOneAndUpdate(
      { filiere, annee },
      req.body,
      { new: true }
    );
    
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json(projet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un projet
exports.deleteProjet = async (req, res) => {
  try {
    const { filiere, annee } = req.params;
    const projet = await Projet.findOneAndDelete({ filiere, annee });
    
    if (!projet) {
      return res.status(404).json({ message: 'Projet non trouvé' });
    }
    
    res.json({ message: 'Projet supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 