import dotenv from 'dotenv';
dotenv.config();

export const config = {
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
  SALT_ROUND: process.env.SALT_ROUND,
};
