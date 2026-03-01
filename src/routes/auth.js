const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

// Registro
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// ✅ NOVA ROTA - Carregar perfil do usuário
router.get('/profile', authenticateToken, authController.getProfile);

// Deletar conta (protegido)
router.delete('/delete-account', authenticateToken, authController.deleteAccount);

module.exports = router;