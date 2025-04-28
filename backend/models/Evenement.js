const mongoose = require('mongoose');

const evenementSchema = new mongoose.Schema({
<<<<<<< HEAD
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  lieu: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Conférence', 'Atelier', 'Séminaire', 'Compétition', 'Autre']
  },
  organisateur: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  filiere: {
    type: String,
    required: true,
    enum: ['iacs', 'aa', 'g2er', 'tdi', 'tous']
=======
  filiere: {
    type: String,
    required: true,
    enum: ['iacs', 'aa', 'g2er', 'tdi']
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
  },
  annee: {
    type: String,
    required: true,
<<<<<<< HEAD
    enum: ['1', '2', '3', 'tous']
  },
  pourTouteFiliere: {
    type: Boolean,
    default: true
  },
  etudiants: {
    type: [String],
    default: []
  }
=======
    enum: ['1', '2', '3']
  },
  evenements: [{
    titre: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    heureDebut: {
      type: String,
      required: true
    },
    heureFin: {
      type: String,
      required: true
    },
    lieu: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ['conference', 'seminaire', 'workshop', 'autre']
    },
    description: String,
    organisateur: String,
    participants: String
  }]
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
}, {
  timestamps: true
});

<<<<<<< HEAD
module.exports = mongoose.model('Evenement', evenementSchema);
=======
module.exports = mongoose.model('Evenement', evenementSchema); 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
