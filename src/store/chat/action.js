import axios from "axios"


export const getChat =(conversationID)=>async(dispatch)=>{
    dispatch({type:"GET_CHAT_LOADING"})
    try{
        let res = await axios.get(`https://chatappbackend-production-835b.up.railway.app/message/${conversationID}`)
        dispatch({type:"GET_CHAT_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}