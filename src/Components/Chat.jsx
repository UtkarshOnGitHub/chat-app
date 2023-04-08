import React, { useContext, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/users/action';
import { AppContext } from '../Context/ContextProvider';



export default function Chat() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = useContext(AppContext)
  let user = token._id;
  const chat = useSelector((store)=>store.chat);
  
  return (
    <Box minH="100vh" bg='gray.100'>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }} user ={user} />
      <Drawer autoFocus={false}isOpen={isOpen}placement="left" 
      onClose={onClose}
      returnFocusOnClose={false} 
      onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user}/>
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

{/* ------------------------------------------------------------------------ */}

      {/* Content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Message chat={chat.data}  currUser ={user}/>
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



