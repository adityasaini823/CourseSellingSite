const connectDB=require('../config/db');
connectDB();
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },username:{
        type:String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['superadmin', 'instructor', 'user'],
        default: 'user',  // Set default role to user
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
    ],
    reviews: [
        {
            course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },  
            rating: { type: Number, required: true },                        
            comment: { type: String },                                       
            date: { type: Date, default: Date.now },                         
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

