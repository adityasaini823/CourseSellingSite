const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const courseRoutes=require('./routes/courseRoutes');
const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes');
const cors=require('cors');
const app = express();
const connectDB = require("./config/db");
// Load environment variables
dotenv.config();
// Connect to the database
connectDB();

app.use(cors());
// Import models
const Course = require("./models/Course");
const User = require("./models/User");

// Middleware to parse JSON bodies
app.use(express.json());

// Routes here
app.use("/course",courseRoutes);
app.use("/users",userRoutes);
app.use("/admins",adminRoutes);

const PORT = process.env.PORT || 3000;
console.log(`Server running on port ${PORT}`);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
