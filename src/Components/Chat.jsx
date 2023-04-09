import React, { useContext, useEffect, useState } from 'react';
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


export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(AppContext);
  const dispatch = useDispatch();
  const chat = useSelector((store)=>store.chat);
  const convo = useSelector((store)=>store.conversation);
  
  console.log(convo)
  useEffect(()=>{
      dispatch(getConversations(token?._id));
  },[token._id])


  if(convo?.loading){
    return(
      <h1>Loading...</h1>
    )
  }

  return (
    <Box minH="100vh" bg='gray.100'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }} conversation={convo?.data} user ={token._id} />
      <Drawer autoFocus={false}isOpen={isOpen}placement="left" 
      onClose={onClose}
      returnFocusOnClose={false} 
      onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose}  conversation={convo?.data} user={token._id}/>
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        <Message chat={chat.data}  currUser ={token._id}/>
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



