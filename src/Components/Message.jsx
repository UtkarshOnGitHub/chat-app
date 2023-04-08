import { Box, Button, Text, Textarea, useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import SingleMessage from './SingleMessage'
import axios from 'axios'
import style from "./Message.module.css"

const Message = ({chat=[] , currUser}) => {

  const [message , setMessage] = useState("");
  const [state , setState] = useState(false)

  const scrollref = useRef()
  const initalState ={
    conversationId:chat[0]?.conversationId,
    senderId:currUser,
    text:message
  }
  const handleSendMessage = async()=>{
    try {
      let res = await axios.post("http://localhost:8080/message",initalState)
      console.log(res)
      setState(!state)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    scrollref.current?.scrollIntoView({behaviour:"smooth"})
  },[chat])

  return (
    <>
    <Box marginTop={"50px"} height={"86vh"} position={'relative'} >
        {chat.length!=0 ? <Box h={"86%"} 
        w="100%" overflow={"scroll"} padding={"5px 10px"} 
        borderRadius={"20px"}
        className={style.messageScroll}
         backgroundImage={"https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png"}  >
            <Box textAlign={"center"}>
              <Text color={"grey"} fontSize={"17px"}>This Chat Is End To End Encrypted</Text>
            </Box>
            {chat?.map((e)=>{
              return(
                <Box ref={scrollref}>
                <SingleMessage key={e._id} text={e.text} createdAt={e.createdAt} own={e.senderId === currUser ? true :false}/> 
                </Box> 
              ) 
            })}
        </Box> : 
        <Box w="100%" textAlign={"center"}><Text color={"grey"} as={"em"} fontSize={"6xl"}>Click On Friends To Open A Conversation</Text></Box>
        }
        <Box position={"absolute"} bottom={0} w="100%" display={"flex"} justifyContent={"center"} alignContent={"center"}>
            <Textarea bg={"white"} w="100%" placeholder='Type Your Message' onChange={(e)=>{setMessage(e.target.value)}}></Textarea>
            <Button variant={"outline"} bg="green.600" color={"white"} _hover={{bg:"green.900"}} w="100px" h="80px" onClick={handleSendMessage}>Send</Button>
        </Box>
    </Box>
    </>
  )
}

export default Message
