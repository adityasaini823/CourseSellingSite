const express=require("express");
const app=express();
const Course=require("../models/Course");

const getAllCourses=async (req,res)=>{
    try {
    const courses=await Course.find();
    if(!courses){
        return res.status(404).json({message:"No courses found"});
    }
    res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({message:"server error"});
     }
}
const getCourse=async (req,res)=>{
    try {
        const course=await Course.findById(req.params.id);
        if(course){
            res.status(200).json(course);
        }else{
            res.status(404).json({message:"Course not found"});
        }
    }catch(err){
        res.status(500).json({message:"server error"});
    }
}
const createCourse=async (req,res)=>{
    try{
        const course=new Course(req.body);
        await course.save();
        res.status(201).json({ message: "Course created successfully", course });
    }catch(error){
        res.status(500).json({message:"server error"});
    }
}
const updateCourse=async (req,res)=>{
    try{
        const courseId=req.params.id;
        const newCourse=req.body;
        const updatedCourse=await Course.findByIdAndUpdate(courseId,newCourse, { new: true });
        if(updateCourse){
            res.status(200).json({message:"successfully updated",updatedCourse});
        }else{
            res.status(404).json({message:"Course not found"});
        }
    }catch(error){
        res.status(500).json({msg:"server error"});
    }
}
const deleteCourse=async (req,res)=>{
    try{
        const courseId=req.params.id;
        const deletedCourse=await Course.findByIdAndDelete(courseId);
        if(deletedCourse){
            res.status('200').json({msg:"course deleted successfully"});
        }else{
            res.status(404).json({message:"Course not found"});
        }
    }catch{
        res.status(500).json({message:"server error"});
    }
}

module.exports={getAllCourses,getCourse,createCourse,deleteCourse,updateCourse};