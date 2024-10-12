const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const saltRounds = 10;
const secret = process.env.secret;

// Get User by ID
const getUser = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        console.log(user);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, secret, {expiresIn:"1hr"});
            res.status(200).json({user,token});
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Update User
const updateUser = async (req, res) => {
    const id = req.params.id; 
    const errors = validationResult(req);
    const { name, email, username } = req.body;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!name || name.length < 3) {
        return res.status(400).json({ msg: "Name is required and should be at least 3 characters long" });
    }
    if (!username || username.length < 5) {
        return res.status(400).json({ msg: "Username is required and should be at least 5 characters long" });
    }
    const existingUser = await User.findOne({ username, _id: { $ne: id } });
    if (existingUser) {
        return res.status(400).json({ msg: "Username must be unique" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            id, 
            { name, email, username },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: "Server error" });
    }
};

// Create User and Sign JWT Token
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, username, password } = req.body;
    if (!name || name.length < 3) {
        return res.status(400).json({ msg: "Name is required and should be at least 3 characters long" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple regex for email format validation
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ msg: "A valid email is required" });
    }
    if (!username || username.length < 5) {
        return res.status(400).json({ msg: "Username is required and should be at least 5 characters long" });
    }
    if (!password || password.length < 8) {
        return res.status(400).json({ msg: "Password is required and should be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: "Username already exists" });
        }
        const user = await User.create({ name, email, username, password: hashedPassword });
        const token = jwt.sign(
            { id: user._id, username: user.username },
            secret,
            { expiresIn: '1h' }
        );
        res.status(201).json({ user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

module.exports = { getUser, updateUser, createUser };
