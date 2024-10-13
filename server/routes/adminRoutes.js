const express=require('express');
const router=express.Router();
const { isAdmin } = require('../middlewares/roleMiddleware');
const {getAllUsers,deleteUser}=require('../controllers/adminController');
// const { getAllCourses } = require('../controllers/courseController');



// router.get('/courses',isAdmin,getAllCourses);

router.get('/users',isAdmin,getAllUsers);
router.delete('/delete/:id',isAdmin,deleteUser);


module.exports=router;
