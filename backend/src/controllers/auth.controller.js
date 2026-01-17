import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const {fullName,email,password} = req.body;

  try{
    if(!fullName || !email || !password){
      return res.status(400).json({msg:"Please fill all the fields"});
    }

    if(password.length < 6){
      return res.status(400).json({msg:"Password must be at least 6 characters long"});
    }

    //check if emails valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({msg:"Please enter a valid email"});
    }

    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({msg:"Email already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    const newUser = new User({
      fullName,
      email,
      password:hashedPassword
    });
    
    if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();

        return res.status(201).json({
          _id:newUser._id,
          fullName:newUser.fullName,
          email:newUser.email,
          profilePics:newUser.profilePics
        });
    }else{
      return res.status(500).json({msg:"Invalid user data"});
    }
    
   
  }catch(error){
    console.log("Error in signup",error);
    return res.status(500).json({msg:"Internal server error"});
  }
};