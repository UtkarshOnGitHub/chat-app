import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import {MdPersonAddAlt1} from "react-icons/md"
import { setFreindRequest } from '../../api/api'
import API from '../../service/serviceAPI'
import axios from 'axios'

const sendFriendRequest = async(data)=>{
    return await axios.post(API+"/conversation",data)
}
const sendFirstMessage = async(data)=>{
    return await axios.post(API+"/message",data)
}

const ShowSingleUser = ({user,idx,currUser,reRender}) => {
    const [addFreind , setAddFriend] = useState({recieverId:"",senderId:""})
   

    const handleUserRequest =()=>{
        let obj = {
            recieverId:user._id,
            senderId:currUser
        }
        sendFriendRequest(obj).then((res)=>{
            console.log(res)
            let data = {
                conversationId:res.data._id,
                senderId:currUser,
                text:"Hi,New Connection!"
            }
            sendFirstMessage(data).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

  return (
    <>
        <Flex justifyContent={"space-between"} marginTop={"20px"}>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={"1rem"}>
                <Image w="50px" h="50px" borderRadius={"50%"} src={`https://randomuser.me/api/portraits/men/${idx}.jpg`}/>
                <Text fontWeight={600} fontSize={"22x"}>{user.username}</Text>

            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <MdPersonAddAlt1 fontSize={"36px"} onClick={handleUserRequest}/>
            </Box>
        </Flex>
    </>
  )
}

export default ShowSingleUser
