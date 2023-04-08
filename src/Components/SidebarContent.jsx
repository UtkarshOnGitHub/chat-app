import React, { useEffect, useState } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,

  Text,
  Image,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi';
import axios from 'axios';

const getConvo = async(userId)=>{
    return await axios.get("http://localhost:8080/conversation/"+userId)
  }
  

const SidebarContent = ({ onClose ,...rest}) => {
    const user = "63fa0361b03732f0f970fc94";
    const [conversation , setConversation] = useState(null)
  
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
            Logo
          </Text>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        {conversation?.map((link) => (
          <NavItem key={link._id} data={link} currUser = {user}/>
        ))}
      </Box>
    );
  };


  const NavItem = ({ data,currUser, ...rest }) => {
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

    return (
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Flex align="center"p="4" mx="4"   borderRadius="lg"role="group" gap="10px" cursor="pointer" _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}{...rest}>
            <Image w="32px" h="32px" borderRadius={"50%"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmqw3Cr7IQM-oR1ebavbVUJ7x5xkvYBPrBZEEs2IqGDpPuNlXQIQUHpRo3wn88ZEKiEs&usqp=CAU"></Image>
            <Text>{friends?.username}</Text>
        </Flex>
      </Link>
    );
  };
  


  export default SidebarContent