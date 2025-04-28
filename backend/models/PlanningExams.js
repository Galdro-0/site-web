const mongoose = require('mongoose');

const planningExamsSchema = new mongoose.Schema({
  filiere: {
    type: String,
    required: true,
    enum: ['iacs', 'aa', 'g2er', 'tdi']
  },
  annee: {
    type: String,
    required: true,
    enum: ['1', '2', '3']
  },
  examens: [{
<<<<<<< HEAD
    examId: {
      type: String,
      required: false // Pas requis pour la compatibilité avec les anciens examens
    },
    titre: {
      type: String,
      required: false // Pas requis pour la compatibilité avec les anciens examens
    },
=======
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
    module: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    debut: {
      type: String,
      required: true
    },
    fin: {
      type: String,
      required: true
    },
    salle: {
      type: String,
      required: true
    },
    professeur: {
      type: String,
      required: true
<<<<<<< HEAD
    },
    pourEtudiantsSpecifiques: {
      type: Boolean,
      default: false
    },
    etudiants: {
      type: [String],
      default: []
=======
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
    }
  }]
}, {
  timestamps: true
});

<<<<<<< HEAD
module.exports = mongoose.model('PlanningExams', planningExamsSchema);
=======
module.exports = mongoose.model('PlanningExams', planningExamsSchema); 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
