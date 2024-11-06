const express=require("express");

const router = express.Router();

const {getAllCourses,getCourse,createCourse,deleteCourse,updateCourse}=require('../controllers/courseController');
const verifyAuth=require('../middlewares/authMiddleware');
const { isAdmin,isInstructor} = require("../middlewares/roleMiddleware");

router.get("/courses",verifyAuth,getAllCourses);

router.get("/course/:id",verifyAuth,getCourse);

router.delete("course/:id",verifyAuth,deleteCourse);

router.post("course",verifyAuth,isAdmin,isInstructor,createCourse);
router.put("/course/:id",verifyAuth,isAdmin,isInstructor,updateCourse);

module.exports=router;