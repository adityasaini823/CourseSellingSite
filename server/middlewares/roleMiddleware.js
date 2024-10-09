const User=require('../models/User');

// Admin Verification
const isAdmin=(req,res,next)=>{
    if(req.user.role=="superadmin"){
        req.role="superadmin";
        next();
    }else{
        res.status(403).send({message:'Access Denied'});
    }
}

//Instructor Verification
const isInstructor=(req,res,next)=>{
    if(req.user.role=="instructor" ){
        req.role="instructor";
        next();
    }else{
        res.status(403).send({message:'Access Denied'});
    }
}

// User Verification
const isUser=(req,res,next)=>{
    if(req.user.role=="user"){
        next();
    }else{
        res.status(403).send({message:'Access Denied'});
    }
}

module.exports={isAdmin,isInstructor,isUser}