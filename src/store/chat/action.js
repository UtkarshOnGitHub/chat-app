import axios from "axios"
import API from "../../service/serviceAPI"


export const getChat =(conversationID)=>async(dispatch)=>{
    dispatch({type:"GET_CHAT_LOADING"})
    try{
        let res = await axios.get(API+`/message/${conversationID}`)
        dispatch({type:"GET_CHAT_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}