import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/UserRequest";
const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);

    const fetchUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <>
      <div className="follower conversation">
        <div>
          <div className="online-dot"></div>
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt=""
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            <span>Online</span>
          </div>
        </div>
      </div>
      <hr  style={{width:"85%", border:"0.1px solid #ececec"}}/>
    </>
  );
};

export default Conversation;
