import { Group } from '../models/Group.js';
import { User } from '../models/User.js';


async function createGroup(req, res) {
  const { name, members } = req.body;
  const { userId: createdBy } = req.user;

  try {
    const usersToAdd = await User.find({ _id: { $in: members } }).select('_id');
    const group = new Group({ name, createdBy, members: usersToAdd.map(user => user._id) });
    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Failed to create group.' });
  }
}

async function searchGroups(req, res) {
  const query = req.query.q;

  try {
    const groups = await Group.find({ name: { $regex: query, $options: 'i' } });
    res.json({ groups });
  } catch (error) {
    console.error('Error searching groups:', error);
    res.status(500).json({ error: 'Failed to search groups.' });
  }
}

async function addMembers(req, res) {
  const groupId = req.params.id;
  const { userIds } = req.body;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found.' });
    }

    // Convert current members to a Set for uniqueness check
    const currentMembersSet = new Set(group.members.map(member => member.toString()));

    // Assuming userIds is an array of user IDs to add
    const usersToAdd = await User.find({ _id: { $in: userIds } }).select('_id');

    // Filter out existing members from users to add
    const uniqueUsersToAdd = usersToAdd.filter(user => !currentMembersSet.has(user._id.toString()));

    group.members.push(...uniqueUsersToAdd.map(user => user._id));
    await group.save();

    res.json({ group });
  } catch (error) {
    console.error('Error adding members to group:', error);
    res.status(500).json({ error: 'Failed to add members to group.' });
  }
}

async function deleteGroup(req, res) {
  const groupId = req.params.id;

  try {
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found.' });
    }
    await group.deleteOne();
    res.json({ message: 'Group deleted successfully.' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ error: 'Failed to delete group.' });
  }
}

export { createGroup, searchGroups, addMembers, deleteGroup };