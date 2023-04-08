import axios from "axios"


export const getChat =(conversationID)=>async(dispatch)=>{
    try{
        let res = await axios.get(`http://localhost:8080/message/${conversationID}`)
        dispatch({type:"GET_CHAT_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}