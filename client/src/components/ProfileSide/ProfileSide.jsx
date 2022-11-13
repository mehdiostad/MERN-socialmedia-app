import React from 'react';
import "./ProfileSide.css"
import LogoSearch from '../LogoSearch/LogoSerach';
import ProfileCard from '../ProfileCard/ProfileCard';
import FollowersCard from '../FollowersCard/FollowersCard';

const ProfileSide = () => {
    return (  
            <div className='ProfileSide'>
                <LogoSearch/>
                <ProfileCard location={"homePage"}/>
                <FollowersCard/>
            </div>

    );
}
 
export default ProfileSide;