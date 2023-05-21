import React, { useEffect, useState } from 'react'
import { getAllUser, getFreindsOfUser } from '../api/api'
import ShowSingleUser from '../Components/ShowSingleUser/ShowSingleUser'
import { Box } from '@chakra-ui/react'



const AllUsers = ({currUser}) => {
    const [allUser , setAllUser] = useState([])
    useEffect(()=>{
        getFreindsOfUser(currUser).then((res)=>{
            setAllUser(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    console.log(allUser)
  return (
    <>
        <Box height={"530px"} bg="#FAFAFA" padding={"20px"} overflow={"scroll"} overflowX={"hidden"} overflowY={"auto"}>
            {allUser?.map((e,idx)=>{
                return <ShowSingleUser key={e._id} user={e} currUser={currUser} idx={idx}/>
                }
            )}

        </Box>
    </>
  )
}

export default AllUsers
