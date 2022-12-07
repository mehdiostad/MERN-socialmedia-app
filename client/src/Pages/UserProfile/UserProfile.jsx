import React, { useEffect } from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import RightSide from '../../components/RightSide/RightSide';
import PostSide from "../../components/PostSide/PostSide";
import UserProfileCard from '../../components/UserProfileCard/UserProfileCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { getUser } from '../../api/UserRequest';
const UserProfile = () => {
    const {user} = useSelector(state => state.authReducer.authData)
    const params = useParams()
    const [isFollowing , setIsFollowing] = useState(null)
    const [person , setPerson] = useState({})
    useEffect(()=>{
        
        const following  = user.following.some(person => person === params.id)
    setIsFollowing(following)
    }, [user])
   useEffect(async()=>{
    const {data} = await getUser(params.id)
    setPerson(data)
   }, [params.id])
    return ( 
        <div className="Profile">
            <ProfileLeft/>
            <div className="Profile-Center">
                <UserProfileCard location ={"profilePage"}/>
                {isFollowing ? 
                
                <PostSide location={"profilePage"}/> :
                <span style={{alignSelf: "center"}}>You don't follow @{person.username}. Please Follow then refresh page to see posts.</span>
            }
                
            
            </div>
            <RightSide/>
        </div>
     );
}
 
export default UserProfile;