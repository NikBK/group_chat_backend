const config = require('../config');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
  const { username, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, config.SALT_ROUND); // 10 is the saltRounds parameter

    // Create a new user with hashed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Other controller functions like editUser, deleteUser can be implemented similarly

module.exports = { createUser, getUsers };
