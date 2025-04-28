const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;
<<<<<<< HEAD
  console.log('Vérification de l\'authentification pour:', req.originalUrl);
=======
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
<<<<<<< HEAD
      console.log('Token trouvé:', token.substring(0, 10) + '...');

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token décodé:', decoded);
=======

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac

      // Check if token contains role
      if (decoded.role === 'admin') {
        // Get admin from token
        req.admin = await Admin.findById(decoded.id).select('-password');
        req.isAdmin = true;
<<<<<<< HEAD
        console.log('Utilisateur authentifié comme admin:', req.admin ? req.admin._id : 'Non trouvé');
        req.user = { id: req.admin._id, role: 'admin' };
      } else {
        // Get student from token
        req.student = await Student.findById(decoded.id).select('-password');

        if (!req.student) {
          console.error('Étudiant non trouvé dans la base de données');
          return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        req.isAdmin = false;
        console.log('Utilisateur authentifié comme étudiant:', req.student._id);
        req.user = {
          id: req.student._id,
          role: 'student',
          filiere: req.student.filiere,
          annee: req.student.annee
        };
=======
      } else {
        // Get student from token
        req.student = await Student.findById(decoded.id).select('-password');
        req.isAdmin = false;
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
      }

      next();
    } catch (error) {
<<<<<<< HEAD
      console.error('Erreur d\'authentification:', error);
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  } else if (!token) {
    console.log('Pas de token trouvé dans les en-têtes');
=======
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, token invalide' });
    }
  } else if (!token) {
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
    res.status(401).json({ message: 'Non autorisé, pas de token' });
  }
};

// Middleware pour vérifier si l'utilisateur est un admin
const admin = (req, res, next) => {
<<<<<<< HEAD
  console.log('Vérification des droits d\'administrateur pour:', req.originalUrl);
  console.log('isAdmin:', req.isAdmin);
  console.log('admin:', req.admin ? 'Oui' : 'Non');

  if (req.isAdmin && req.admin) {
    console.log('Accès administrateur autorisé');
    next();
  } else {
    console.log('Accès administrateur refusé');
=======
  if (req.isAdmin && req.admin) {
    next();
  } else {
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
    res.status(403).json({ message: 'Non autorisé, accès réservé aux administrateurs' });
  }
};

module.exports = { protect, admin };