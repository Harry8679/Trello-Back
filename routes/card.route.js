const express = require('express');
const { createCard, updateCard, reorderCard, deleteCard } = require('../controllers/card.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/columns/:columnId/cards', authMiddleware, createCard);
router.put('/cards/:id', authMiddleware, updateCard);
router.put('/cards/:id/order', authMiddleware, reorderCard);
router.delete('/cards/:id', authMiddleware, deleteCard);

module.exports = router;
