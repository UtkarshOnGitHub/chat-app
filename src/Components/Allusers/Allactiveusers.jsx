import React from 'react'
import Allchats from '../AllChats/Allchats'
import { Box } from '@chakra-ui/react'

const Allactiveusers = ({conversation,currUser,currentChat,activeUsers}) => {
  return (
    <>
    <Box height={"610px"} bg="#FAFAFA" paddingTop={"5px"}>
    {
        conversation?.map((link)=>{
            return(
                <Allchats key={link._id} data={link} currUser={currUser} activeUsers={activeUsers} currentChat={currentChat}/>
            )
        })
    }
    </Box>
        
    </>
  )
}

export default Allactiveusers
