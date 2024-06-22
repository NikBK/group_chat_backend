const mongoose = require('mongoose');
const config = require('../config');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            dbName: config.MONGO_DB_NAME,
        });
        console.log(`Connected to MongoDB '${conn.connections[0].name}' database`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;