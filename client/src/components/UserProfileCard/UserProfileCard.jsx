import React from "react";
// import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequest";
import { useState } from "react";
const UserProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [person, setPerson] = useState({})
  const personId = useParams()
    
    useEffect(()=>{
    const fetchPerson = async ()=>{
        const {data} = await getUser(personId.id)
        setPerson(data)

    }
        fetchPerson()
    }, [personId])
    if (!person.followers || !person.following ) return "fetching data...";
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            person.coverPicture
              ? serverPublic + person.coverPicture
              : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {person.firstname} {person.lastname}
        </span>
        <span>{person.worksAt ? person.worksAt : "Write about yourself!"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{person.following.length}</span>
            <span>followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{person.followers.length}</span>
            <span>followers</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
    </div>
  );
};

export default UserProfileCard;
