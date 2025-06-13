const Board = require('../models/board.model');

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.userId });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const board = await Board.create({ title, userId: req.userId });
    res.status(201).json(board);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};