const express=require("express");

const router = express.Router();
const app=express();

const {getAllCourses,getCourse,createCourse,deleteCourse,updateCourse}=require('../controllers/courseController');
const verifyAuth=require('../middlewares/authMiddleware');
const { isAdmin,isInstructor,isUser } = require("../middlewares/roleMiddleware");

router.get("/courses",verifyAuth,getAllCourses);

router.get("/course/:id",verifyAuth,getCourse);

router.delete("course/:id",verifyAuth,isAdmin,deleteCourse);
router.post("course",verifyAuth,createCourse);

module.exports=router;