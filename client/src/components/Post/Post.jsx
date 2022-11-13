import React from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import Share from "../../img/share.png";
import NotLike from "../../img/notlike.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../../api/PostsRequest";
import { useEffect , useRef } from "react";
import * as userApi  from "../../api/UserRequest"

const Post = ({ data }) => {
  const [userName , setUserName] = useState("")
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
useEffect(async()=>{
  const userData = await userApi.getUser(data.userId)
  setUserName(userData.data.username)
})
  

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span>{likes} Likes</span>
      <div className="detail">
        <span>
          <b >{userName}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
