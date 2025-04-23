const mongoose = require('mongoose');

const projetSchema = new mongoose.Schema({
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
  projets: [{
    nom: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    },
    statut: {
      type: String,
      required: true,
      enum: ['À faire', 'En cours', 'Terminé', 'Prévu']
    },
    module: {
      type: String,
      required: true
    },
    professeur: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Projet', projetSchema); 