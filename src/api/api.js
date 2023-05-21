import axios from "axios"
import API from "../service/serviceAPI"

export const getUser = async(data={})=>{
    return await axios.post(API+"/user/byToken",data)
}

export const getAllUser = async()=>{
    return await axios.get(API+"/user")
}

export const getFreindsOfUser = async(id)=>{
    return await axios.post(API+"/conversation/getFriends",{id:id})
}


export const singleUserDetails = async(friendId)=>{
    try {
        axios.get(API+"/user/"+friendId).then((res)=>{
            console.log(res)
            return res
        }) 
    } catch (error) {
        console.log(error)
    }
}