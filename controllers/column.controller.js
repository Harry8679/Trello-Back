const Column = require('../models/column.model');

exports.getColumns = async (req, res) => {
  try {
    const columns = await Column.find({ boardId: req.params.boardId });
    res.json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createColumn = async (req, res) => {
  try {
    const { title } = req.body;
    const column = await Column.create({ title, boardId: req.params.boardId });
    res.status(201).json(column);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};