import { Router } from 'express';
import { login, logout, signup } from '../controllers/authController.js';


const router = Router();

router.post('/login', login);   // POST /api/auth/login     (Login user)
router.post('/logout', logout); // POST /api/auth/logout    (Logout user)
router.post('/signup', signup); // POST /api/auth/signup    (Signup user)

export { router };
