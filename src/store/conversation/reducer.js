const initialState = {
    data:[],
    loading:true,
    error:true
}


const conversationReducer = (state=initialState , {type,payload})=>{
    switch (type){
        case "GET_CONVERSATION_SUCCESS":
            if(payload.length==0){
                return{
                        data:[],
                        loading:true,
                        error:false
                }
            }
            return {
                    data:payload,
                    loading:false,
                    error:false
                }
        default:
            return{
                ...state              
            }
    }
}

export default conversationReducer