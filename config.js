require('dotenv').config(); // Load environment variables from .env file

const config = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUND: process.env.SALT_ROUND,
  // Add other configuration variables as needed
};

module.exports = config;
