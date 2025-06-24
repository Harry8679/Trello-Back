const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },  // Prénom
  lastName: { type: String, required: true },   // Nom
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // 🆕 Avatar
  avatarUrl: { type: String, default: '' }, // lien vers image si uploadée
  avatarColor: { type: String, default: '#2563eb' } // bleu par défaut (bg-blue-600)
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('User', userSchema);
