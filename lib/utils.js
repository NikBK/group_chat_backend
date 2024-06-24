import bcrypt from 'bcrypt';
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

export { hashPassword, comparePassword };