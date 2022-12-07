import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
const PostSide = ({ location }) => {
  {
    if (location === "profilePage"){
        return  (
            <>
              <div className="PostSide">
               
                <Posts />
              </div>
            </>
          );
    } else{
        return  (
            <>
              <div className="PostSide">
                <PostShare />
                <Posts />
              </div>
            </>
          );
    }
  }
  
};

export default PostSide;
