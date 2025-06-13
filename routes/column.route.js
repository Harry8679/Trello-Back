const express = require('express');
const router = express.Router();
const { getBoards, createBoard } = require('../controllers/boardController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getBoards);
router.post('/', auth, createBoard);

module.exports = router;