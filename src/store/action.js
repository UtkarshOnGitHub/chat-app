import axios from "axios"


export const getChat =(conversationID)=>async(dispatch)=>{
    try{
        let res = await axios.get(`https://chatappbackend-production-2ce5.up.railway.app/message/${conversationID}`)
        dispatch({type:"GET_CHAT_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}