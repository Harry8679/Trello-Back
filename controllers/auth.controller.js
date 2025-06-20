const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ userId: user._id, token });
  } catch(err) {
    res.status(400).json({ error: err.message });
  };
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid Credentials' });
    }

    const token = generateToken(user._id);
    res.json({ userId: user._id, token });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
};