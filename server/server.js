const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const courseRoutes=require('./routes/courseRoutes');
const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes');
// const instructorRoutes=require('./routes/instructorRoutes');
const cors=require('cors');
const app = express();
const connectDB = require("./config/db");
dotenv.config();
connectDB();

app.use(cors());

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
