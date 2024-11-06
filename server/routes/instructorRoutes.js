const express = require('express');
const router = express.Router();
const { getAllCourses, getCourse, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const verifyAuth = require('../middlewares/authMiddleware');
const isInstructor= require('../middlewares/roleMiddleware');
// Routes for instructors
router.get('/courses', verifyAuth, isInstructor, getAllCourses); // Fetch all instructor courses
router.get('/courses/:id', verifyAuth, isInstructor, getCourse); // Fetch a specific course
router.post('/courses', verifyAuth, isInstructor, createCourse); // Create a new course
router.put('/courses/:id', verifyAuth, isInstructor, updateCourse); // Update a course
router.delete('/courses/:id', verifyAuth, isInstructor, deleteCourse); // Delete a course

module.exports = router;
