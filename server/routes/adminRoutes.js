const express=require('express');
const router=express.Router();
const { isAdmin } = require('../middlewares/roleMiddleware');
const {getAllUsers,deleteUser,getAllCourses}=require('../controllers/adminController');
const verifyAuth = require('../middlewares/authMiddleware');
const { deleteCourse } = require('../controllers/courseController');

// user routes
router.get('/users',verifyAuth,isAdmin,getAllUsers);
router.delete('user/:id',verifyAuth,isAdmin,deleteUser);




// Course Routes

router.get('/courses',verifyAuth,isAdmin,getAllCourses);
router.get('course/:id',verifyAuth,isAdmin,deleteCourse);





module.exports=router;
