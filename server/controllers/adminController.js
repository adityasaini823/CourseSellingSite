const User=require('../models/User');

const getAllUsers=async (req,res)=>{
    const users=await User.find();
    if(!users){
        return res.status(404).json({message:'No users found'});
    }
    res.status(200).json(users);
}
const deleteUser=async(req,res)=>{
    const id=req.params.id;
    const user= await User.findById(id);
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    await user.remove();
    res.status(200).json({message:'User deleted successfully'});
}

module.exports={getAllUsers,deleteUser};