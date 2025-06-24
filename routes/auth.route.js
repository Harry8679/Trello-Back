const express = require('express');
const router = express.Router();
const { register, login, me, updateEmail, updatePassword, updateAvatarColor, updateAvatarUrl } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, me);
router.put('/update-email', authMiddleware, updateEmail);
router.put('/update-password', authMiddleware, updatePassword);

router.put('/update-avatar-color', authMiddleware, updateAvatarColor);
router.put('/update-avatar-url', auth, updateAvatarUrl);

module.exports = router;