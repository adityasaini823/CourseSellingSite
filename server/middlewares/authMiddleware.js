require('dotenv').config(); 
const express=require('express');
const jwt=require("jsonwebtoken");
const app=express();
const User=require("../models/User");
const secret= process.env.secret;

const verifyAuth=async (req,res,next)=>{
    const token=req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(403).send('Token is missing');
    }else{
        try{
            const decoded = jwt.verify(token, secret);
            const id = decoded.id;
            const user=await User.findById(id);
            if(!user){
              return  res.status(404).json({msg:"user is Not Authorized"});
            }
            req.id=id;
            next();
        }catch(err){
          return res.status(500).json({err:err});
        }
    }
}
module.exports={verifyAuth}