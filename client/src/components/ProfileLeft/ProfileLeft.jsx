import React from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSerach';
import InfoCard from "../InfoCard/InfoCard"
const ProfileLeft = () => {
    return ( 
        <div className="ProfileSide">
            <LogoSearch/>
            <InfoCard/>
            <FollowersCard/>
        </div>
     );
}
 
export default ProfileLeft;