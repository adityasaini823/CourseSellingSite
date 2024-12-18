const express=require('express');
const router=express.Router();
const { isAdmin } = require('../middlewares/roleMiddleware');
const {getAllUsers,deleteUser}=require('../controllers/adminController');
const verifyAuth = require('../middlewares/authMiddleware');

router.get('/users',verifyAuth,isAdmin,getAllUsers);
router.delete('/delete/:id',verifyAuth,isAdmin,deleteUser);

module.exports=router;
