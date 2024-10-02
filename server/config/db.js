require('dotenv').config();  // Make sure this is at the top of the file
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

console.log('MONGO_URI:', MONGO_URI);  // Log the MONGO_URI to verify if it's being loaded

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
