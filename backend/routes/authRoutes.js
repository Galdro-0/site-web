const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router; 
>>>>>>> 62aa32c3cfb0efa3cdb9a2c4a6452896b276b6ac
