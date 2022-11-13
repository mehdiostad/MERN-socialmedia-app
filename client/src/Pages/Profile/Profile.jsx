import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import RightSide from '../../components/RightSide/RightSide';
import PostSide from "../../components/PostSide/PostSide";
import "./Profile.css"
const Profile = () => {
    return ( 
        <div className="Profile">
            <ProfileLeft/>
            <div className="Profile-Center">
                <ProfileCard location={"profilePage"}/>
                <PostSide/>
            </div>
            <RightSide/>
        </div>
     );
}
 
export default Profile;