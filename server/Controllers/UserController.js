import userModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

//get All users from db

export const getAllUsers = async(req , res)=>{
  try {
    let users = await userModel.find()
    users = users.map(user =>{
      const {password , ...otherDetails} = user._doc
      return otherDetails
    })
    res.status(200).json(users)
  } catch (error) {
   
    res.status(500).json(error);

  }
}


//get a user from db

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("this user does not exist.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a user

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { _id, currentUserAdminStatus, password } = req.body;
  if (_id === id) {
    try {
      if (password) {
        const saltRounds = 10;
        req.body.password = await bcrypt.hashSync(password, saltRounds);
      }

      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        {
          username: user.username,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({user, token});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(403).json("Access Denied. You can only update your own profile");
  }
};

// delete a user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await userModel.findByIdAndDelete(id);
      res.status(200).json("this user has been successfully deleted!");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//follow a user

export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await userModel.findById(id);
      console.log(followUser);
      const followingUser = await userModel.findById(_id);
      console.log(followingUser);
      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User Followed!");
      } else {
        res.status(403).json("User is Already followed.");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//Unfollow a user

export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if(_id === id)
  {
    res.status(403).json("Action Forbidden")
  }
  else{
    try {
      const unFollowUser = await userModel.findById(id)
      const unFollowingUser = await userModel.findById(_id)


      if (unFollowUser.followers.includes(_id))
      {
        await unFollowUser.updateOne({$pull : {followers: _id}})
        await unFollowingUser.updateOne({$pull : {following: id}})
        res.status(200).json("Unfollowed Successfully!")
      }
      else{
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};
