import axios from "axios"
import API from "../../service/serviceAPI"


export const getConversations =(userId)=>async(dispatch)=>{
    try{
        let res = await axios.get(API+`/conversation/${userId}`)
        dispatch({type:"GET_CONVERSATION_SUCCESS" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}