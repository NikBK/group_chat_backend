const router = require('express').Router();
const { createGroup, searchGroups, deleteGroup, addMembers } = require('../controllers/groupController');

router.post('/', createGroup); // Route to create a new group
router.get('/search', searchGroups); // Route to search groups
router.delete('/:id', deleteGroup); // Route to delete a group
router.post('/:id/members', addMembers); // Route to add members to a group

module.exports = router;
