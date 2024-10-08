const express=require("express");

const router = express.Router();
const app=express();

const {getAllCourses,getCourse,createCourse,deleteCourse,updateCourse}=require('../controllers/courseController');
const {authMiddleware}=require('../middlewares/authMiddleware');

router.get("/courses",getAllCourses);
router.get("/course/:id",getCourse);
// router.delete("delete/:id",authMiddleware,deleteCourse);

module.exports=router;