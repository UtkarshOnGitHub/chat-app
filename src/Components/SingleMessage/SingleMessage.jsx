import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import style from "./singleMessage.module.css"
import {format} from "timeago.js"
const SingleMessage = ({text,createdAt,own,...rest}) => {
  return (
    <>
        <Box className={own ? style.messageBody:style.messageBody2}>
            {!own ? <Box w="32px" height={"32px"}  objectFit={"contain"}>
                <Image borderRadius={"50px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmqw3Cr7IQM-oR1ebavbVUJ7x5xkvYBPrBZEEs2IqGDpPuNlXQIQUHpRo3wn88ZEKiEs&usqp=CAU"></Image>
            </Box>:null}
            
                <Box display={"flex"} flexDirection={"column"}  alignItems={own ? "flex-end" :"flex-start"} >
                    <Box padding={"7px 15px"} borderRadius={"20px"} bgColor={own ? "#1877f2":"lightGrey"} w="fit-content" color={own ? "white":"black"}>
                        <Text fontSize={"14px"}>{text}</Text>
                    </Box>
                    <Text fontSize={"10px"} marginRight={"10px"} color={"grey"} marginTop={"3px"}>{format(createdAt)}</Text>
                </Box>
        </Box>
    </>
  )
}

export default SingleMessage
