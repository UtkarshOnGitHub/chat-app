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
      await axios.post("https://chatappbackend-production-2ce5.up.railway.app/message",initalState)
      setState(!state)
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    scrollref.current?.scrollIntoView({behaviour:"smooth"})
  },[chat])

  return (
    <>
    {chat.length!=0 ?
    <Box marginTop={["0","50px"]} height={"86vh"} position={'relative'} >
        <Box h={"86%"} 
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
        </Box> 
        
        <Box position={"absolute"} w="100%" display={"flex"} justifyContent={"center"} alignContent={"center"}>
            <Textarea bg={"white"} w="100%" borderRadius={"10px 0px 0px 10px"} placeholder='Type Your Message' value={message} onChange={(e)=>{setMessage(e.target.value)}}></Textarea>
            <Button variant={"outline"} borderRadius={"0px 10px 10px 0px"} bg="green.600" color={"white"} _hover={{bg:"green.900"}} w="100px" h="81px" onClick={handleSendMessage}>Send</Button>
        </Box>
        </Box>:
        <Box w="100%" textAlign={"center"}><Text color={"grey"} as={"em"} fontSize={"6xl"}>Click On Friends To Open A Conversation</Text></Box>
   }
    </>
  )
}

export default Message
