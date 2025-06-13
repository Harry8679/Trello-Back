const Card = require('../models/card.model');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ columnId: req.params.columnId }).sort('order');
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createCard = async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const card = await Card.create({ title, description, order, columnId: req.params.columnId });
    res.status(201).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const { title, description, order, columnId } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { title, description, order, columnId },
      { new: true }
    );
    res.json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};