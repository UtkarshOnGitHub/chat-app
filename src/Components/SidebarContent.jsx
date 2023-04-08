import React, { useEffect, useState } from 'react';
import {
  Box,
  CloseButton,
  Flex,

  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getChat } from '../store/action';

const getConvo = async(userId)=>{
    return await axios.get("http://localhost:8080/conversation/"+userId)
}
  

const SidebarContent = ({ onClose ,...rest}) => {
    const user = "63fa029ab03732f0f970fc8e";
    const [conversation , setConversation] = useState(null);


    
  
    useEffect(()=>{
      try {
        getConvo(user).then((res)=>{
          setConversation(res.data)
        })
      } catch (error) {
        console.log(error)
      }
    },[])

    return (
      <Box bg={useColorModeValue('white', 'gray.900')}borderRight="1px"borderRightColor={useColorModeValue('gray.200', 'gray.700')}w={{ base: 'full', md: 60 }}pos="fixed"h="full"{...rest}>
        <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
          <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
            ChatBap
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {conversation?.map((link) => (
          <NavItem key={link._id} data={link} currUser = {user}/>
        ))}
      </Box>
    );
  };


  const NavItem = ({ data , currUser , ...rest }) => {
    const dispatch = useDispatch();
    const [friends , setFriends] = useState({})

    useEffect(()=>{
        let friendId = data?.members?.find((e)=>{
            return e != currUser
        })
        try {
            axios.get("http://localhost:8080/user/"+friendId).then((res)=>{
                setFriends(res.data)
            }) 
        } catch (error) {
            console.log(error)
        }

    },[])

    const handleFriends = (id)=>{
        dispatch(getChat(id))
    }

    return (
      <Box onClick={()=>handleFriends(data?._id)}>
        <Flex align="center"p="4" mx="4"   borderRadius="lg"role="group" gap="10px" cursor="pointer" _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}{...rest}>
            <Image w="32px" h="32px" borderRadius={"50%"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmqw3Cr7IQM-oR1ebavbVUJ7x5xkvYBPrBZEEs2IqGDpPuNlXQIQUHpRo3wn88ZEKiEs&usqp=CAU"></Image>
            <Text>{friends?.username}</Text>
        </Flex>
      </Box>
    );
  };
  


  export default SidebarContent