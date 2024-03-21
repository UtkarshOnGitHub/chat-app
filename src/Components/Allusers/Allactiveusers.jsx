import React from 'react'
import Allchats from '../AllChats/Allchats'
import { Box } from '@chakra-ui/react'

const Allactiveusers = ({conversation,currUser,currentChat,activeUsers}) => {
  return (
    <>
    <Box height={"80vh"} bg="#FAFAFA" paddingTop={"5px"} overflow={"scroll"} overflowX={"hidden"} overflowY={"auto"}>
    {
        conversation?.map((link,idx)=>{
            return(
                <Allchats key={link._id} idx={idx} data={link} currUser={currUser} activeUsers={activeUsers} currentChat={currentChat}/>
            )
        })
    }
    </Box>
        
    </>
  )
}

export default Allactiveusers
