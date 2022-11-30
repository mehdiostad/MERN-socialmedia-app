import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSerach";
import { Link } from "react-router-dom";
import "./Chat.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "../../components/ChatBox/ChatBox";
import {io} from "socket.io-client"

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [currentChat , setCurrentChat] = useState(null)
  const [onlineUsers , setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recievedMessage, setRecievedMessage] = useState(null)
  const socket = useRef()
  useEffect(() => {
    const getChats = async () => {
      const { data } = await userChats(user._id);
      setChats(data);
    };
    getChats();
  }, [user]);

  useEffect(()=>{
    socket.current = io('http://51.89.107.233/socket.io')
    socket.current.emit('new-user-add', user._id)
    socket.current.on("get-users" , users => {
      setOnlineUsers(users)
    })
  } , [user])
  
  // send message to socket server
  useEffect(()=>{
    if(sendMessage !== null){
      console.log(sendMessage);
      socket.current.emit('send-message' , sendMessage)
    }
  }, [sendMessage])

  //recieve message from socket server
  useEffect(()=>{
    socket.current.on("recieve-message"  , data=>{
      console.log(data);
      setRecievedMessage(data)
    })
  },[])

  const checkOnlineUser = (chat) =>{
    const chatMember = chat.members.find(member => member !== user._id)
    const online = onlineUsers.some(user=> user.userId === chatMember)
    return online
  }

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                
                <Conversation data={chat} currentUserId={user._id} online ={checkOnlineUser(chat)}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <div className="navIcons">
            <Link to={"../home"}>
              <img src={Home} alt="" />
            </Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to={"/chat"}>
              <img src={Comment} alt="" />
            </Link>
          </div>
        </div>
          <ChatBox chat={currentChat} currentUserId={user._id}  setSendMessage ={setSendMessage} recievedMessage={recievedMessage}/>
      </div>
    </div>
  );
};

export default Chat;
