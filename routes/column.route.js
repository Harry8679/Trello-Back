const express = require('express');
const router = express.Router();
const { getBoards, createBoard } = require('../controllers/board.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth, getBoards);
router.post('/', auth, createBoard);

module.exports = router;