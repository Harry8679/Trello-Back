const express = require('express');
const router = express.Router();
const { register, login, me, updateEmail } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const User = require('../models/user.model');

router.post('/register', register);
router.post('/login', login);

router.get('/me', authMiddleware, me);
router.put('/update-email', authMiddleware, updateEmail);

module.exports = router;