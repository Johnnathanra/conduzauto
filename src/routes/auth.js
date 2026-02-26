const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Deletar conta (protegido)
router.delete('/delete-account', authenticateToken, authController.deleteAccount);

module.exports = router;