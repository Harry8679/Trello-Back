const Column = require('../models/column.model');

exports.createColumn = async (req, res) => {
  const { boardId } = req.params;
  const { title } = req.body;
  const col = await Column.create({ boardId, title, order: Date.now() });
  res.status(201).json(col);
};

exports.reorderColumn = async (req, res) => {
  const { boardId, colId } = req.params;
  const { newOrder } = req.body;  // nouveau order pour cette colonne
  const col = await Column.findOne({ _id: colId, boardId });
  if (!col) return res.status(404).json({ message: 'Colonne introuvable' });
  col.order = newOrder;
  await col.save();
  res.json(col);
};
