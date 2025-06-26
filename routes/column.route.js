const express = require('express');
const router = express.Router();
const { getBoards, createBoard } = require('../controllers/board.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware, getBoards);
router.post('/', authMiddleware, createBoard);

module.exports = router;