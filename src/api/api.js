import axios from "axios"

export const getUser = async(data={})=>{
    return await axios.post("https://chatappbackend-production-835b.up.railway.app/user/byToken",data)
}


export const singleUserDetails = async(friendId)=>{
    try {
        axios.get("https://chatappbackend-production-835b.up.railway.app/user/"+friendId).then((res)=>{
            console.log(res)
            return res
        }) 
    } catch (error) {
        console.log(error)
    }
}