// routes/boards.js
const express = require('express');
const { createBoard, getBoards, inviteToBoard } = require('../controllers/board.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, createBoard);
router.get('/', authMiddleware, getBoards);
router.put('/:id/invite', authMiddleware, inviteToBoard);

module.exports = router;
