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
import { FaUserFriends } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa";

import Allactiveusers from "../Components/Allusers/Allactiveusers";

import LoadingScreen from "react-loading-screen";
import Navbar from "../Components/Navbar/Navbar";

export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(AppContext);
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat);
  const convo = useSelector((store) => store.conversation);
  const socket = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [message, setMessages] = useState([]);
  const [currentChater, setCurrentChater] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef(null);

  useEffect(() => {
    setMessages(chat?.data);
  }, [chat]);

  useEffect(() => {
    socket.current = io("https://chatappbackend-production-2ce5.up.railway.app/");
    // socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data, "data");
      setArrivalMessage({
        conversationId: data.conversationId,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", token._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [token]);

  useEffect(() => {
    arrivalMessage &&
      currentChater?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChater]);

  useEffect(() => {
    dispatch(getConversations(token?._id));
  }, [token._id]);

  const receiverId = currentChater?.members.find(
    (member) => member !== token._id
  );

  const handleSocketSend = (value) => {
    socket.current.emit("sendMessage", {
      conversationId: value.conversationId,
      senderId: token._id,
      receiverId,
      text: value.text,
    });
    setArrivalMessage({
      conversationId: value.conversationId,
      senderId: token._id,
      text: value.text,
      createdAt: Date.now(),
    });
  };

  const currentChat = (value) => {
    setCurrentChater(value);
    setActiveTab(1);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  useEffect(() => {}, [currentChat]);


  // if(chat?.loading){
  //   return(
  //     <>
  //            <Box h="100vh" display={"flex"} justifyContent={"center"} alignContent={"center"}>
  //       <LoadingScreen
  //         loading={true}
  //         bgColor="rgba(255,255,255,0.8)"
  //         spinnerColor="#9ee5f8"
  //         textColor="#676767"
  //         logoSrc=""
  //         text=""
  //       >
  //         {" "}
  //       </LoadingScreen>
  //       </Box> 
  //     </>
  //   )
  // }


  if (convo?.loading) {
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
    <Box minH="100vh" bg="#EFEBE9">
      <Navbar  id={token._id}/>
      <Tabs
        position="relative"
        variant="unstyled"
        p="0"
        index={activeTab}
        ref={tabsRef}
      >
        <TabList display={"flex"} justifyContent={"space-between"}>
          <Tab w="100%" fontSize={"30px"} onClick={() => handleTabClick(0)}>
            <Box>
              <FaUserFriends />
            </Box>
          </Tab>
          <Tab w="100%" isDisabled={chat?.data?.length==0?true:false} fontSize={"30px"} onClick={() => handleTabClick(1)}>
            <Box>
              <BsFillChatLeftTextFill />
            </Box>
          </Tab>
          <Tab w="100%" fontSize={"30px"} onClick={() => handleTabClick(2)}>
            <Box>
              <FaUserCheck />
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
                conversation={convo?.data}
                currUser={token._id}
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
                currUser={token._id}
                loading ={chat?.loading}
              />
            </Box>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

// Mobile Nav
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      {/* <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      /> */}

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        ChatBap
      </Text>
    </Flex>
  );
};
