import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';


async function hashPassword(password) {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

function generateJWTtoken(user) {
    const token = jwt.sign({ userId: user._id }, config.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export { hashPassword, comparePassword, generateJWTtoken };