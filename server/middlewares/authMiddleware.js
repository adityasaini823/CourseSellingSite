require('dotenv').config(); 
const express=require('express');
const jwt=require("jsonwebtoken");
const app=express();
const User=require("../models/User");
const secret= process.env.secret;

const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).send('Token is missing');
        }
        try {
            const decoded = jwt.verify(token, secret);
            const id = decoded.id;
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ msg: "User not authorized" });
            }
            req.user = user;
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
    // If no token or invalid user, skip authentication, let non-logged-in users continue
    next();
};

module.exports = { verifyAuth };


module.exports=verifyAuth