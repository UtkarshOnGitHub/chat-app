import axios from "axios"


export const getConversations =(userId)=>async(dispatch)=>{
    try{
        let res = await axios.get(`https://chatappbackend-production-2ce5.up.railway.app/conversation/${userId}`)
        dispatch({type:"GET_CONVERSATION_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}