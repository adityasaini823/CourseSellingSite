const express=require("express");
const app=express();
const Course=require("../models/Course");
const { body, validationResult } = require('express-validator');
const getAllCourses=async (req,res)=>{
    try {
        const user=req.user;
        if(!user){
            const courses= await Course.find().select('title description category level thumbnail');
            return res.status(200).json(courses);
        }
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
        const user=req.user;
        if(!user){
            const course= await Course.findById(req.params.id).select('title description category level thumbnail');
            return res.status(200).json(course);
        }
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
const createCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, price, category, level } = req.body;
        // Perform manual validation
        if (!title || title.length < 5) {
            return res.status(400).json({ msg: "Title is required and should be at least 5 characters long" });
        }
        if (!description || description.length < 20) {
            return res.status(400).json({ msg: "Description is required and should be at least 20 characters long" });
        }
        if (!price || price <= 0) {
            return res.status(400).json({ msg: "Price is required and should be a positive number" });
        }
        if (!category) {
            return res.status(400).json({ msg: "Category is required" });
        }
        if (!["Beginner", "Intermediate", "Advanced"].includes(level)) {
            return res.status(400).json({ msg: "Level must be one of: Beginner, Intermediate, Advanced" });
        }
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(400).json({ msg: "Course title must be unique" });
        }
        // Create a new course with the validated data
        const course = new Course(req.body);
        if (req.user.role === "instructor") {
            course.instructor = req.user._id; 
            req.user.courses.push(course._id);
            await req.user.save(); 
        }
        await course.save();
        return res.status(201).json({ message: "Course created successfully", course });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const updateCourse = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, price, category, level } = req.body;

        // Perform manual validation only on fields that are being updated
        if (title && title.length < 5) {
            return res.status(400).json({ msg: "Title should be at least 5 characters long" });
        }
        if (description && description.length < 20) {
            return res.status(400).json({ msg: "Description should be at least 20 characters long" });
        }
        if (price && price <= 0) {
            return res.status(400).json({ msg: "Price should be a positive number" });
        }
        if (category && !category.trim()) {
            return res.status(400).json({ msg: "Category is required" });
        }
        if (level && !["Beginner", "Intermediate", "Advanced"].includes(level)) {
            return res.status(400).json({ msg: "Level must be one of: Beginner, Intermediate, Advanced" });
        }
        // Ensure course title is unique but ignore the current course being updated
        const courseId = req.params.id;
        if (title) {
            const existingCourse = await Course.findOne({ title, _id: { $ne: courseId } });
            if (existingCourse) {
                return res.status(400).json({ msg: "Course title must be unique" });
            }
        }

        // Update the course in the database
        const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, { new: true });

        if (updatedCourse) {
            return res.status(200).json({ message: "Course successfully updated", updatedCourse });
        } else {
            return res.status(404).json({ message: "Course not found" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

const deleteCourse=async (req,res)=>{
    try{
        const courseId=req.params.id;
        if(req.user.role=="superAdmin"){
            const deletedCourse=await Course.findByIdAndDelete(courseId);
            if(deletedCourse){
                return res.status(200).json({msg:"course deleted successfully"});
            }else{
                return res.status(404).json({message:"Course not found"});
            }
        }
        else if(req.user.role=="instructor"){
            courses=req.user.courses;
            const course = req.user.courses.find(course => course._id.toString() === courseId);
            if(course){
                const deletedCourse=await Course.findByIdAndDelete(courseId);
                if(deletedCourse){
                    //delete the course from the Instructor database too
                    req.user.courses = req.user.courses.filter(c => c._id.toString() !== courseId);
                    await req.user.save(); // Save the updated user after removing the course
                    res.status(200).json({msg:"course deleted successfully"});
                }
            }else{
                return res.status(404).json({message:"Course not found"});
            }
            
        }else{
            return res.status(401).json({message:"Unauthorized"});
        }
    }catch{
        console.error("Error deleting course:", error);
        return res.status(500).json({message:"server error"});
    }
}
module.exports={getAllCourses,getCourse,createCourse,deleteCourse,updateCourse};