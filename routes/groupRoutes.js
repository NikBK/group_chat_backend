import { Router } from 'express';
import { createGroup, searchGroups, deleteGroup, addMembers } from '../controllers/groupController.js';


const router = Router();

router.post('/', createGroup); // Route to create a new group
router.get('/search', searchGroups); // Route to search groups
router.delete('/:id', deleteGroup); // Route to delete a group
router.post('/:id/members', addMembers); // Route to add members to a group

export { router };