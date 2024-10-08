const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const courseRoutes=require('./routes/courseRoutes');
const cors=require('cors');
// Load environment variables
dotenv.config();
// Connect to the database
const connectDB = require("./config/db");
connectDB();

// Initialize the Express app
const app = express();
app.use(cors());
// Import models
const Course = require("./models/Course");
const User = require("./models/User");

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/",courseRoutes);

// Default route to check if the server is running
// app.get("/", (req, res) => {
//     res.send("Server is running");
// });

// Set the port from environment variables or use 3000 as a default
const PORT = process.env.PORT || 3000;
console.log(`Server running on port ${PORT}`);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
