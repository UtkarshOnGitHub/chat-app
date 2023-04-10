import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiMenu,
} from 'react-icons/fi';

import Message from "./Message"

import SidebarContent from './SidebarContent';
import {useDispatch, useSelector } from 'react-redux';
import { AppContext } from '../Context/ContextProvider';
import { getConversations } from '../store/conversation/action';
import {io} from "socket.io-client"


export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(AppContext);
  const dispatch = useDispatch();
  const chat = useSelector((store)=>store.chat);
  const convo = useSelector((store)=>store.conversation);
  const socket = useRef();
  const [arrivalMessage,setArrivalMessage] =useState(null)
  const [message , setMessages] = useState([])
  const [currentChater , setCurrentChater] = useState(null)

  useEffect(()=>{
    setMessages(chat?.data)
  },[chat])

  useEffect(() => {
    socket.current = io("ws://chatappbackend-production-2ce5.up.railway.app:8900");
    socket.current.on("getMessage", (data) => {
      console.log(data,"data")
      setArrivalMessage({
        conversationId:data.conversationId,
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", token._id);
    socket.current.on("getUsers", (users) => {
      console.log(users)
    })
  }, [token]);


  useEffect(() => {
    arrivalMessage &&
    currentChater?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChater]);



  useEffect(()=>{
      dispatch(getConversations(token?._id));
  },[token._id])



  const receiverId = currentChater?.members.find(
    (member) => member !== token._id
  );

  const handleSocketSend = (value)=>{
    socket.current.emit("sendMessage", {
      conversationId:value.conversationId,
      senderId: token._id,
      receiverId,
      text: value.text,
    });
    setArrivalMessage({
      conversationId:value.conversationId,
      senderId: token._id,
      text: value.text,
      createdAt: Date.now(),
    });
  }

  const currentChat =(value)=>{
    setCurrentChater(value)
  }

  if(convo?.loading){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <Box minH="100vh" bg='gray.100'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }} conversation={convo?.data} currentChat={currentChat} user ={token._id} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" 
      onClose={onClose}
      returnFocusOnClose={false} 
      onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose}  conversation={convo?.data} currentChat={currentChat} user={token._id}/>
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        <Message chat={message} handleSocketSend={handleSocketSend}  currUser ={token._id}/>
      </Box>
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
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        ChatBap
      </Text>
    </Flex>
  );
};



