const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  order: Number,
  columnId: { type: mongoose.Schema.Types.ObjectId, ref: 'Column' }
});
module.exports = mongoose.model('Card', cardSchema);
