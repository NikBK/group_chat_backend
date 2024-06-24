import { Router } from 'express';
import { createGroup, searchGroups, deleteGroup, addMembers } from '../controllers/groupController.js';


const router = Router();

router.post('/', createGroup);          // POST     /api/groups                 (Create a new group)
router.get('/search', searchGroups);    // GET      /api/groups/search?q=test   (Search groups)
router.delete('/:id', deleteGroup);     // DELETE   /api/groups/:id             (Delete a group)
router.put('/:id/members', addMembers); // PUT      /api/groups/:id/members     (Add members to a group)

export { router };