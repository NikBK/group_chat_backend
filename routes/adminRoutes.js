import { Router } from 'express';
import { createUser, editUser } from '../controllers/adminController.js';


const router = Router();

router.post('/createUser', createUser); // POST /api/admin/createUser (Create new user)
router.put('/user/:id', editUser); // PUT /api/admin/user/:id (Edit user)

export { router };