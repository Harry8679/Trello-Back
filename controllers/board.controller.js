const Board = require('../models/board.model');

exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.userId });
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};