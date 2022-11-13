import postModel from "../Models/postModel.js";
import mongoose from "mongoose";
import userModel from "../Models/userModel.js";
//create new post

export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a post

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a post

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(postId);
    if (userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated.");
    } else {
      res.status(403).json("Action forbidden.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a post

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);

    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post has been successfully deleted.");
    } else {
      res.status(403).json("Action forbidden.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// like & dislike a post

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post has been liked successfully.");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post has been disliked successfully.");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get timeline post

export const getTimeLinePosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await postModel.find({ userId });
    const followingUserPosts = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          foreignField: "userId",
          localField: "following",
          as: "followingPosts",
        },
      },
      {
        $project: {
          _id: 0,
          followingPosts: 1,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingUserPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//we use lookup when we have to match the document in another model, by placing query in anohther model.
