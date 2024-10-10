const express=require('express');
const { isAdmin } = require('../middlewares/roleMiddleware');
const verifyAuth = require('../middlewares/authMiddleware');
const { createUser, getUser,updateUser } = require('../controllers/userController');
const router=express.Router();


router.get('/login',verifyAuth,getUser);
router.post('/signup',createUser);

router.put('/update/:id',verifyAuth,updateUser);