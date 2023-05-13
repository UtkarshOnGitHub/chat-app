import { Avatar, AvatarBadge, Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getChat } from '../../store/chat/action';


const Allchats = ({data,currUser,currentChat,activeUsers}) => {

    const [isOnline , setIsOnline] = useState(false)
    const dispatch = useDispatch();
    const [friends , setFriends] = useState({});
    const onlineRef = useRef(null)


    useEffect(()=>{
        let friendId = data?.members?.find((e)=>{
            return e != currUser
        })
        try {
            axios.get("https://chatappbackend-production-2ce5.up.railway.app/user/"+friendId).then((res)=>{
                setFriends(res.data)
            }) 
        } catch (error) {
            console.log(error)
        }

    },[])


    useEffect(() => {
        const isActiveUser = activeUsers.some(user => user.userId === friends?._id);
        setIsOnline(isActiveUser);
      }, [activeUsers,friends?._id]);


    const handleFriends = (id,data)=>{
        dispatch(getChat(id))
        currentChat(data)
    }

  return (
    <>
        <Flex h="5rem" w="full" alignItems={"center"} p="0 20px" gap={"30px"} marginTop={"20px"} onClick={()=>handleFriends(data?._id,data)}>
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmqw3Cr7IQM-oR1ebavbVUJ7x5xkvYBPrBZEEs2IqGDpPuNlXQIQUHpRo3wn88ZEKiEs&usqp=CAU">
                {isOnline ? <AvatarBadge boxSize='1.25em' bg='green.500' /> : <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />}
            </Avatar>
            <Box>
                <Text fontSize={"21px"} fontWeight={600}  color={"black"}>{friends.username}</Text>
                <Text color={"#9f9a9a"}>This is a last TEXT</Text>
            </Box>
        </Flex>
    </>
  )
}

export default Allchats
