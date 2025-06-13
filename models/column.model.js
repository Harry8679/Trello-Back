const mongoose = require('mongoose');
const columnSchema = new mongoose.Schema({
  title: String,
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board' }
});
module.exports = mongoose.model('Column', columnSchema);