import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import style from "./singleMessage.module.css"

const SingleMessage = ({text,own}) => {
  return (
    <>
        <Box className={own ? style.messageBody:style.messageBody2}>
            {!own ? <Box w="42px" height={"42px"}  objectFit={"contain"}>
                <Image borderRadius={"50px"} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVmqw3Cr7IQM-oR1ebavbVUJ7x5xkvYBPrBZEEs2IqGDpPuNlXQIQUHpRo3wn88ZEKiEs&usqp=CAU"></Image>
            </Box>:null}
            
                <Box marginLeft={"20px"} display={"flex"} flexDirection={"column"} alignItems={"flex-end"}>
                    <Box padding={"7px 15px"} borderRadius={"20px"} bgColor={own ? "#1877f2":"lightGrey"} color={own ? "white":"black"}>
                        <Text fontSize={"17px"}>{text}</Text>
                    </Box>
                    <Text fontSize={"10px"} marginRight={"10px"} color={"grey"} marginTop={"3px"}>56 Mins ago</Text>
                </Box>
        </Box>
    </>
  )
}

export default SingleMessage
