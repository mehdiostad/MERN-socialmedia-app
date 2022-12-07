import React from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as userApi from "../../api/UserRequest";
import { logOut } from "../../Actions/AuthAction";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const dispatch = useDispatch()
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const {data} = await userApi.getUser(profileUserId);
        setProfileUser(data);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);

  const handleLogOut = () => {
    dispatch(logOut())
  };

  return (
    <div className={params.id == user._id ? "InfoCard" : "userInfoCard"}>
      <div className="InfoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div>
        <div className="info">
          <span>
            <b>Status </b>
          </span>
          <span>{profileUser.relationship}</span>
        </div>

        <div className="info">
          <span>
            <b>Lives in </b>
          </span>
          <span>{profileUser.livesIn}</span>
        </div>

        <div className="info">
          <span>
            <b>Works at </b>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>
      </div>
      {params.id == user._id && 
      
      <button className="button logout-button" onClick={handleLogOut}>
        Logout
      </button>
      }
    </div>
  );
};

export default InfoCard;
