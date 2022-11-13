import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Registernig a new User

export const registerUser = async (req, res) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hash;
  const newUser = new userModel(req.body);
  const { username } = req.body;
 
  try {
    const oldUser = await userModel.findOne({username});
    console.log(oldUser);
    if (oldUser) {
      return res.status(400).json({message:"username is already registered!"});
    }
   const user= await newUser.save();
    const token = jwt.sign({username: user.username, id: user._id},process.env.JWT_KEY, {expiresIn:"1h"}) 
    res.status(200).json({user, token});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login User

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userModel.findOne({ username });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if(!validity){
        res.status(400).json("Wrong password");
      }else{
        const token = jwt.sign({username: user.username, id: user._id},process.env.JWT_KEY, {expiresIn:"1h"}) 
        res.status(200).json({user, token});
      }
    } else {
      res.status(404).json("user does not exist");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
