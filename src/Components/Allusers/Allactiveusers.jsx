import React from 'react'
import Allchats from '../AllChats/Allchats'
import { Box } from '@chakra-ui/react'

const Allactiveusers = ({conversation,currUser,currentChat}) => {
  return (
    <>
    <Box height={"677px"} bg="#FAFAFA" paddingTop={"5px"}>
    {
        conversation?.map((link)=>{
            return(
                <Allchats key={link._id} data={link} currUser={currUser} currentChat={currentChat}/>
            )
        })
    }
    </Box>
        
    </>
  )
}

export default Allactiveusers
