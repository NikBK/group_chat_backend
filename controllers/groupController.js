const Group = require('../models/Group');

async function createGroup(req, res) {
  const { name, createdBy } = req.body;
  try {
    const group = new Group({ name, createdBy });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getGroups(req, res) {
  try {
    const groups = await Group.find().populate('members', 'username');
    res.json(groups);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Other controller functions like addMember, deleteGroup can be implemented similarly

module.exports = { createGroup, getGroups };
