import mongoose from 'mongoose';
import { config } from '../config.js';


const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {
            dbName: config.MONGO_DB_NAME,
        });
        console.log(`Connected to MongoDB '${conn.connections[0].name}' database`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export { connectToDB };