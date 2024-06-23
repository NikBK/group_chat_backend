const bcrypt = require('bcrypt');
const config = require("../config");

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_ROUND));
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

module.exports = { hashPassword, comparePassword };