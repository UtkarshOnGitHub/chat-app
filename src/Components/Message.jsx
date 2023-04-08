import { Box, Textarea, useStatStyles } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SingleMessage from './SingleMessage'
import axios from 'axios'

const Message = () => {

    const [conversation , setConversation] = useState([])

    useEffect(()=>{
        
    },[])

  return (
    <>
    <Box marginTop={"50px"} height={"86vh"} position={'relative'} >
        <Box h={"86%"} w="100%" overflow={"scroll"}>
            <SingleMessage text="Hello John lorem "/>
            <SingleMessage own={true} text="A growing collection of hand-crafted & responsive Chakra UI templates ready to drop into your React project."/>
            <SingleMessage text="Hello Kiran"/>
            <SingleMessage text="Hello John lorem "/>
            <SingleMessage own={true} text="A growing collection of hand-crafted & responsive Chakra UI templates ready to drop into your React project."/>
        </Box>
        <Box position={"absolute"} bottom={0} w="100%">
            <Textarea bg={"white"} w="100%" placeholder='Type Your Message'></Textarea>
        </Box>
    </Box>
    </>
  )
}

export default Message
