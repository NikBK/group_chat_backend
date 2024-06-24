import { Router } from 'express';
import { login, logout, signup } from '../controllers/authController.js';


const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);

export { router };
