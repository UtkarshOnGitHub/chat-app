import React, { useEffect, useState } from 'react'
import { getUser, singleUserDetails } from '../../api/api'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'




const Navbar = ({id}) => {
    const [data , setData] = useState({})
    useEffect(()=>{
        try {
            axios.get("https://chatappbackend-production-2ce5.up.railway.app/user/"+id).then((res)=>{
                setData(res.data)
            }) 
        } catch (error) {
            console.log(error)
        }
    },[])

  return (
    <>
        <Flex h="7.7rem" alignItems={"center"} p="20px" gap={"20px"}>
            <Box>
                <Image h="3rem" w="3rem" borderRadius={"50%"} src="https://wallpapers.com/images/hd/cool-profile-picture-ld8f4n1qemczkrig.jpg"/>
            </Box>
            <Box>
                <Text fontSize={"24px"} fontWeight={500}>{data?.username}</Text>
            </Box>
        </Flex>
    </>
  )
}

export default Navbar
