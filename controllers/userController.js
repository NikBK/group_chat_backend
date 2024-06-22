const User = require('../models/User');

async function createUser(req, res) {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function editUser(req, res) {
  const userId = req.params.id;
  const { username, email, password, isAdmin } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { username, email, password, isAdmin }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({ user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Server error. Failed to update user.' });
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

module.exports = { createUser, editUser, getUsers };
