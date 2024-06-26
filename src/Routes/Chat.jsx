import React, { useContext, useEffect, useRef, useState } from "react";
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  TabIndicator,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import Message from "../Components/Messages/Message";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import SidebarContent from "../Components/SideBar/SidebarContent";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../Context/ContextProvider";
import { getConversations } from "../store/conversation/action";
import { io } from "socket.io-client";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { FaUser, FaUserFriends, FaUsersCog, FaWrench } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

import Allactiveusers from "../Components/Allusers/Allactiveusers";

import LoadingScreen from "react-loading-screen";
import Navbar from "../Components/Navbar/Navbar";
import AllUsers from "./AllUsers";
import SocialProfileWithImage from "../Components/Profile/SocialProfileWithImage";

export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userData } = useContext(AppContext);
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat);
  const convo = useSelector((store) => store.conversation);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [message, setMessages] = useState([]);
  const [currentChater, setCurrentChater] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeUsers , setActiveUsers] = useState([])
  const tabsRef = useRef(null);
  const [reRenderBool  , setReRenderBool] = useState(false)

  useEffect(() => {
    setMessages(chat?.data);
  }, [chat]);


  useEffect(() => {
    socket.current = io("https://chat-app-backend-1269.onrender.com");
    // socket.current = io("http://localhost:8080");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        conversationId: data.conversationId,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userData._id);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users)
    });
  }, [userData]);

  useEffect(()=>{

  },[reRenderBool])

  useEffect(() => {
    arrivalMessage &&
      currentChater?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChater]);

  useEffect(() => {
    dispatch(getConversations(userData?._id));
  }, [userData._id]);

  const receiverId = currentChater?.members.find(
    (member) => member !== userData._id
  );

  const handleSocketSend = (value) => {
    socket.current.emit("sendMessage", {
      conversationId: value.conversationId,
      senderId: userData._id,
      receiverId,
      text: value.text,
    });
    setArrivalMessage({
      conversationId: value.conversationId,
      senderId: userData._id,
      text: value.text,
      createdAt: Date.now(),
    });
  };

  const currentChat = (value) => {
    setCurrentChater(value);
    setActiveTab(1);
  };

  const handleTabClick = (index) => {
    if(index==1){
      setReRenderBool(!reRenderBool)
    }
    setActiveTab(index);

  };
  useEffect(() => {}, [currentChat,activeTab]);

 console.log(convo)

  if (convo?.loading){
    return (
      <>
      <Box h="100vh" display={"flex"} justifyContent={"center"} alignContent={"center"}>
        <LoadingScreen
          loading={true}
          bgColor="rgba(255,255,255,0.8)"
          spinnerColor="#9ee5f8"
          textColor="#676767"
          logoSrc=""
          text=""
        >
          {" "}
        </LoadingScreen>
        </Box>
      </>
    );
  }
  

  return (
    <Box bg="#EFEBE9">
      {/* <Navbar  id={userData._id}/> */}
      <Tabs
        position="relative"
        variant="unstyled"
        p="0"
        index={activeTab}
        ref={tabsRef}
      >
        <TabList display={"flex"} height={"10vh"} justifyContent={"space-between"} position= {'sticky'} top={'0'} bg="#EFEBE9" zIndex="11111111" padding ={"12px 0"}>
          <Tab w="100%" fontSize={"30px"} onClick={() => handleTabClick(0)}>
            <Box>
              <FaUserFriends />
            </Box>
          </Tab>
          <Tab w="100%" isDisabled={chat?.data?.length==0?true:false} fontSize={"28px"} onClick={() => handleTabClick(1)}>
            <Box>
              <BsFillChatLeftTextFill />
            </Box>
          </Tab>
          <Tab w="100%" fontSize={"30px"} onClick={() => handleTabClick(2)}>
            <Box>
            <FaUsersCog />
            </Box>
          </Tab>
          <Tab w="100%" fontSize={"26px"} onClick={() => handleTabClick(3)}>
            <Box>
              {/* <FaUser/> */}
              
              <FaWrench />
            </Box>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
          w="35%"
        />
        {/* ------------------------------ */}
        <TabPanels>
          <TabPanel p="0">
            <Box ml={{ base: 0, md: 60 }} p="0">
              <Allactiveusers
                activeUsers={activeUsers}
                conversation={convo?.data}
                currUser={userData._id}
                currentChat={currentChat}
              />
            </Box>
          </TabPanel>
          {/* ------------------------- */}
          <TabPanel p="0">
            <Box>
              <Message
                chat={message}
                handleSocketSend={handleSocketSend}
                conversation={convo?.data}
                currUser={userData._id}
                loading ={chat?.loading}
              />
            </Box>
          </TabPanel>
          {/* ------------------------ */}
          <TabPanel p="0">
            <Box ml={{ base: 0, md: 60 }} p="0">
              <AllUsers currUser={userData._id}/>
            </Box>
          </TabPanel>
          <TabPanel p="0">
            <Box ml={{ base: 0, md: 60 }} p="0" h="90vh" bg={"white"}>
              {/*  */}
              <SocialProfileWithImage id={userData._id}/>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
