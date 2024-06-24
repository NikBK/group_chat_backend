import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { config } from '../config.js';


const verifyAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Not authorized to access this resource' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { verifyAdmin };