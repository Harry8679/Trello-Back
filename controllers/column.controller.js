const Column = require('../models/column.model');

exports.getColumns = async (req, res) => {
  try {
    const columns = await Column.find({ boardId: req.params.boardId });
    res.json(columns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};