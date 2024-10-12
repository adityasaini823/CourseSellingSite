const express=require('express');

const verifyAuth = require('../middlewares/authMiddleware');
const { createUser, getUser,updateUser } = require('../controllers/userController');
const router=express.Router();


router.get('/login',getUser);
router.post('/signup',createUser);

router.put('/update/:id',verifyAuth,updateUser);    
module.exports = router;