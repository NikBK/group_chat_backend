require('dotenv').config(); // Load environment variables from .env file

const config = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUND: process.env.SALT_ROUND,
  // Add other configuration variables as needed
};

module.exports = config;
