require('dotenv').config(); 
const secret= process.env.secret;
const express=require('express');
const jwt=require("jsonwebtoken");
const app=express();
const User=require("../models/User");

const verifyAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).send('Token is missing');
        }
        try {
            const decoded = jwt.verify(token, process.env.secret);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ msg: "User not authorized" });
            }
            req.user = user; 
        } catch (err) {
            return res.status(500).json({ msg: "Invalid token", err });
        }
    }
    next();
};
module.exports =  verifyAuth ;
