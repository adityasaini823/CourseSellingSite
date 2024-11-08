const User=require('../models/User');
const Course=require('../models/Course');
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

const getAllCourses = async (req, res) => {
    try {
        console.log(req.user);
        const  user  = req.user;  // This will be available if verifyAuth runs and attaches user to req
        let courses;
        if (user) {
            courses = await Course.find();
        }else{
            res.status(401).json({msg:'restricted route'})
        }
        if (!courses.length) {
            return res.status(404).json({ message: "No courses found" });
        }

        return res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
}
module.exports={getAllUsers,deleteUser,getAllCourses};