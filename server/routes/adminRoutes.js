const express=require('express');
const router=express.Router();
const { isAdmin } = require('../middlewares/roleMiddleware');

router.get('/users',isAdmin,getAllUsers);
router.delete('/delete/:id',isAdmin,deleteUser);
