const express=require("express");
const app=express();
const Course=require("../models/Course");

const getAllCourses=async (req,res)=>{
    try {
    const courses=await Course.find();
    if(!courses){
        return res.status(404).json({message:"No courses found"});
    }
    return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({message:"server error"});
     }
}
const getCourse=async (req,res)=>{
    try {
        const course=await Course.findById(req.params.id);
        if(course){
            return res.status(200).json(course);
        }else{
            return  res.status(404).json({message:"Course not found"});
        }
    }catch(err){
        return res.status(500).json({message:"server error"});
    }
}
const createCourse=async (req,res)=>{
    try{
        const course=new Course(req.body);
        await course.save();
        return res.status(201).json({ message: "Course created successfully", course });
    }catch(error){
        return res.status(500).json({message:"server error"});
    }
}
const updateCourse=async (req,res)=>{
    try{
        const courseId=req.params.id;
        const newCourse=req.body;
        const updatedCourse=await Course.findByIdAndUpdate(courseId,newCourse, { new: true });
        if(updateCourse){
            return  res.status(200).json({message:"successfully updated",updatedCourse});
        }else{
            return res.status(404).json({message:"Course not found"});
        }
    }catch(error){
        return res.status(500).json({msg:"server error"});
    }
}
const deleteCourse=async (req,res)=>{
    try{
        const courseId=req.params.id;
        const deletedCourse=await Course.findByIdAndDelete(courseId);
        if(deletedCourse){
            return res.status('200').json({msg:"course deleted successfully"});
        }else{
            return res.status(404).json({message:"Course not found"});
        }
    }catch{
        return res.status(500).json({message:"server error"});
    }
}

module.exports={getAllCourses,getCourse,createCourse,deleteCourse,updateCourse};