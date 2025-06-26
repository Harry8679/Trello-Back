// routes/cards.js
const express = require('express');
const { createCard, updateCard, reorderCard, deleteCard } = require('../controllers/card.controller');
const auth = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/columns/:columnId/cards', auth, createCard);
router.put('/cards/:id', auth, updateCard);
router.put('/cards/:id/order', auth, reorderCard);
router.delete('/cards/:id', auth, deleteCard);

module.exports = router;
