import axios from "axios"
import API from "../service/serviceAPI"

export const getUser = async(data={})=>{
    return await axios.post(API+"/user/byToken",data)
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