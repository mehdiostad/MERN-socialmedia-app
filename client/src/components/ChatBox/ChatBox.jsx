import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getMessages } from "../../api/MessageRequest";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import {io} from "socket.io-client"
import { useRef } from "react";
import {useSelector} from "react-redux"
const ChatBox = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers , setOnlineUsers] = useState([])
  const {user} = useSelector(state => state.authReducer.authData)
  const socket = useRef()
  // fetch data for heaer
  useEffect(() => {
    const userId = chat?.members?.find((member) => member !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  useEffect(() => {
    const fetchMessageData = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessageData();
  }, [chat]);

  useEffect(()=>{
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user._id)
    socket.current.on("get-users" , users => {
      setOnlineUsers(users)
    })
  } , [user])

  const handleChange = () => {
    setNewMessage(newMessage);
  };

  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div className="follower">
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          userData.profilePicture
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          "defaultProfile.png"
                    }
                    alt=""
                    className="followerImage"
                    style={{ width: "50px", height: "50px" }}
                  />
                  <div className="name" style={{ fontSize: "0.8rem" }}>
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                </div>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>
            {/* chat massages */}
            <div className="chat-body">
              {messages.map((message) => (
                <>
                  <div
                    className={
                      message.senderId === currentUserId
                        ? "message own"
                        : "message"
                    }
                  >
                    <span>{message.text}</span>
                    <span>{format(message.createdAt)}</span>
                  </div>
                </>
              ))}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="button send-button">Send</div>
            </div>
          </>
        ) : (
          <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
        )}
      </div>
    </>
  );
};

export default ChatBox;
