const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { name, email, contact, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please add all required fields' });
  }

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      displayName: name,
      email,
      contact,
      passwordHash,
      xp: 0
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.displayName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      res.json({
        id: user.id,
        name: user.displayName,
        email: user.email,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
