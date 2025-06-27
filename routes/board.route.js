const express = require('express');
const { createBoard, getBoards, inviteToBoard, getBoardById, getBoardColumns, addBoardColumns } = require('../controllers/board.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/', authMiddleware, createBoard);
router.get('/', authMiddleware, getBoards);
router.put('/:id/invite', authMiddleware, inviteToBoard);

router.get('/:id', authMiddleware, getBoardById); // 👈 Pour charger le projet
router.get('/:id/columns', authMiddleware, getBoardColumns);
router.post('/:id/columns', authMiddleware, addBoardColumns);

module.exports = router;
