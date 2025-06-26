const Card = require('../models/card.model');

exports.createCard = async (req, res) => {
  const { columnId } = req.params;
  const { title, description, assignee } = req.body;
  const card = await Card.create({
    columnId,
    title,
    description,
    assignee,
    order: Date.now()
  });
  res.status(201).json(card);
};

exports.updateCard = async (req, res) => {
  const { id } = req.params;
  const updates = (({ title, description, assignee }) => ({ title, description, assignee }))(req.body);
  const card = await Card.findByIdAndUpdate(id, updates, { new: true });
  if (!card) return res.status(404).json({ message: 'Carte introuvable' });
  res.json(card);
};

exports.reorderCard = async (req, res) => {
  const { id } = req.params;
  const { newOrder, newColumnId } = req.body;
  const card = await Card.findById(id);
  if (!card) return res.status(404).json({ message: 'Carte introuvable' });
  card.order = newOrder;
  if (newColumnId) card.columnId = newColumnId;
  await card.save();
  res.json(card);
};

exports.deleteCard = async (req, res) => {
  const { id } = req.params;
  await Card.findByIdAndDelete(id);
  res.sendStatus(204);
};
