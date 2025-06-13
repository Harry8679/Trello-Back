const express = require('express');
const router = express.Router();
const {
  getCards,
  createCard,
  updateCard,
  deleteCard
} = require('../controllers/cardController');
const auth = require('../middleware/authMiddleware');

router.get('/:columnId', auth, getCards);
router.post('/:columnId', auth, createCard);
router.put('/:id', auth, updateCard);
router.delete('/:id', auth, deleteCard);

module.exports = router;