import React, { useEffect, useState } from 'react'
import { getUser, singleUserDetails } from '../../api/api'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import API from '../../service/serviceAPI'




const Navbar = ({id}) => {
    const [data , setData] = useState({})
    useEffect(()=>{
        try {
            axios.get(API+"/user/"+id).then((res)=>{
                setData(res.data)
            }) 
        } catch (error) {
            console.log(error)
        }
    },[])

  return (
    <>
        <Flex alignItems={"center"} p="20px 20px" gap={"20px"}>
            <Box>
                <Image h="3rem" w="3rem" borderRadius={"50%"} src={`https://randomuser.me/api/portraits/men/${2}.jpg`}/>
            </Box>
            <Box>
                <Text fontSize={"24px"} fontWeight={500}>{data?.username}</Text>
            </Box>
        </Flex>
    </>
  )
}

export default Navbar
