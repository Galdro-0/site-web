const EmploiDuTemps = require('../models/EmploiDuTemps');
const Student = require('../models/Student');

// @desc    Créer un emploi du temps personnalisé
// @route   POST /api/emplois-personnalises
// @access  Private (Admin only)
const createEmploiPersonnalise = async (req, res) => {
  try {
    const { titre, description, filiere, annee, etudiants, emplois, pourTouteFiliere } = req.body;

    console.log('Création d\'un emploi personnalisé avec les données suivantes:', {
      titre,
      filiere,
      annee,
      pourTouteFiliere,
      nombreEtudiants: etudiants ? etudiants.length : 0
    });

    // Si l'emploi n'est pas pour toute la filière et que des étudiants spécifiques sont sélectionnés
    if (!pourTouteFiliere && etudiants && etudiants.length > 0) {
      const existingStudents = await Student.find({ _id: { $in: etudiants } });
      if (existingStudents.length !== etudiants.length) {
        return res.status(400).json({ message: 'Certains étudiants n\'existent pas' });
      }
    }

    // Déterminer si l'emploi est pour toute la filière
    // Assurez-vous que pourTouteFiliere est un booléen
    const isPourTouteFiliere = pourTouteFiliere === true || pourTouteFiliere === 'true';

    console.log('Valeur de pourTouteFiliere:', pourTouteFiliere);
    console.log('Valeur convertie isPourTouteFiliere:', isPourTouteFiliere);

    // Créer l'emploi du temps personnalisé
    const emploiData = {
      titre,
      description,
      filiere,
      annee,
      estPersonnalise: true,
      creePar: req.admin._id,
      etudiants: isPourTouteFiliere ? [] : (etudiants || []),
      emplois,
      pourTouteFiliere: isPourTouteFiliere
    };

    console.log('Données de l\'emploi à créer:', JSON.stringify(emploiData, null, 2));

    const emploiPersonnalise = await EmploiDuTemps.create(emploiData);

    console.log('Emploi personnalisé créé avec succès:', {
      id: emploiPersonnalise._id,
      titre: emploiPersonnalise.titre,
      pourTouteFiliere: emploiPersonnalise.pourTouteFiliere
    });

    res.status(201).json(emploiPersonnalise);
  } catch (error) {
    console.error('Erreur lors de la création de l\'emploi personnalisé:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer tous les emplois du temps personnalisés
// @route   GET /api/emplois-personnalises
// @access  Private (Admin only)
const getEmploisPersonnalises = async (req, res) => {
  try {
    const emploisPersonnalises = await EmploiDuTemps.find({ estPersonnalise: true })
      .populate('creePar', 'nom prenom')
      .populate('etudiants', 'nom prenom');

    res.json(emploisPersonnalises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer un emploi du temps personnalisé par ID
// @route   GET /api/emplois-personnalises/:id
// @access  Private
const getEmploiPersonnaliseById = async (req, res) => {
  try {
    const emploiPersonnalise = await EmploiDuTemps.findById(req.params.id)
      .populate('creePar', 'nom prenom')
      .populate('etudiants', 'nom prenom');

    if (!emploiPersonnalise) {
      return res.status(404).json({ message: 'Emploi du temps personnalisé non trouvé' });
    }

    // Vérifier si l'utilisateur est autorisé à voir cet emploi du temps
    if (!req.isAdmin) {
      const studentId = req.student._id;
      const isAuthorized = emploiPersonnalise.etudiants.some(etudiant =>
        etudiant._id.toString() === studentId.toString()
      );

      if (!isAuthorized) {
        return res.status(403).json({ message: 'Non autorisé à accéder à cet emploi du temps' });
      }
    }

    res.json(emploiPersonnalise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mettre à jour un emploi du temps personnalisé
// @route   PUT /api/emplois-personnalises/:id
// @access  Private (Admin only)
const updateEmploiPersonnalise = async (req, res) => {
  try {
    const { titre, description, filiere, annee, etudiants, emplois } = req.body;

    const emploiPersonnalise = await EmploiDuTemps.findById(req.params.id);

    if (!emploiPersonnalise) {
      return res.status(404).json({ message: 'Emploi du temps personnalisé non trouvé' });
    }

    // Vérifier si les étudiants existent
    if (etudiants && etudiants.length > 0) {
      const existingStudents = await Student.find({ _id: { $in: etudiants } });
      if (existingStudents.length !== etudiants.length) {
        return res.status(400).json({ message: 'Certains étudiants n\'existent pas' });
      }
    }

    // Mettre à jour l'emploi du temps
    emploiPersonnalise.titre = titre || emploiPersonnalise.titre;
    emploiPersonnalise.description = description || emploiPersonnalise.description;
    emploiPersonnalise.filiere = filiere || emploiPersonnalise.filiere;
    emploiPersonnalise.annee = annee || emploiPersonnalise.annee;
    emploiPersonnalise.etudiants = etudiants || emploiPersonnalise.etudiants;
    emploiPersonnalise.emplois = emplois || emploiPersonnalise.emplois;

    const updatedEmploiPersonnalise = await emploiPersonnalise.save();

    res.json(updatedEmploiPersonnalise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Supprimer un emploi du temps personnalisé
// @route   DELETE /api/emplois-personnalises/:id
// @access  Private (Admin only)
const deleteEmploiPersonnalise = async (req, res) => {
  try {
    const emploiPersonnalise = await EmploiDuTemps.findById(req.params.id);

    if (!emploiPersonnalise) {
      return res.status(404).json({ message: 'Emploi du temps personnalisé non trouvé' });
    }

    await emploiPersonnalise.remove();

    res.json({ message: 'Emploi du temps personnalisé supprimé' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Récupérer les emplois du temps personnalisés d'un étudiant
// @route   GET /api/emplois-personnalises/etudiant/:id
// @access  Private
const getEmploisPersonnalisesEtudiant = async (req, res) => {
  try {
    const studentId = req.params.id || req.student._id;
    console.log('Récupération des emplois pour l\'\u00e9tudiant ID:', studentId);

    // Récupérer les informations de l'étudiant pour connaître sa filière et son année
    const student = await Student.findById(studentId);

    if (!student) {
      console.log('Étudiant non trouvé avec ID:', studentId);
      return res.status(404).json({ message: 'Étudiant non trouvé' });
    }

    console.log('Informations étudiant:', {
      id: student._id,
      nom: student.nom,
      prenom: student.prenom,
      filiere: student.filiere,
      annee: student.annee
    });

    // Construire la requête pour trouver les emplois du temps qui correspondent à cet étudiant
    const query = {
      estPersonnalise: true,
      $or: [
        // Emplois spécifiquement assignés à cet étudiant
        { etudiants: studentId },

        // Emplois pour toute la filière de l'étudiant
        {
          pourTouteFiliere: true,
          filiere: { $in: [student.filiere, 'tous'] },
          annee: { $in: [student.annee, 'tous'] }
        }
      ]
    };

    console.log('Requête de recherche:', JSON.stringify(query, null, 2));

    // Vérifier tous les emplois du temps personnalisés pour déboguer
    const allEmplois = await EmploiDuTemps.find({ estPersonnalise: true });
    console.log('Nombre total d\'emplois personnalisés:', allEmplois.length);

    // Afficher les détails de chaque emploi pour déboguer
    allEmplois.forEach((emploi, index) => {
      console.log(`Emploi #${index + 1}:`, {
        id: emploi._id,
        titre: emploi.titre,
        filiere: emploi.filiere,
        annee: emploi.annee,
        pourTouteFiliere: emploi.pourTouteFiliere,
        etudiants: emploi.etudiants
      });
    });

    const emploisPersonnalises = await EmploiDuTemps.find(query)
      .populate('creePar', 'nom prenom')
      .sort({ createdAt: -1 }); // Tri par date de création décroissante

    console.log('Nombre d\'emplois trouvés pour cet étudiant:', emploisPersonnalises.length);

    res.json(emploisPersonnalises);
  } catch (error) {
    console.error('Erreur lors de la récupération des emplois:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createEmploiPersonnalise,
  getEmploisPersonnalises,
  getEmploiPersonnaliseById,
  updateEmploiPersonnalise,
  deleteEmploiPersonnalise,
  getEmploisPersonnalisesEtudiant
};
