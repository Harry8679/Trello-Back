const Card = require('../models/card.model');

exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find({ columnId: req.params.columnId }).sort('order');
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};