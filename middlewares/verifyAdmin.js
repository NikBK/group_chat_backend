const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

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
        req.user = user; // Attach user object to request for further processing if needed
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { verifyAdmin };
