let initialState = {
    data:[],
    loading:false,
    error:false
}


export const chatReducer =(state=initialState , {type,payload})=>{
        if(type == "GET_CHAT_SUCCESS"){
            return {
                data:payload,
                loading:false,
                error:false
            }
        }else if(type=="GET_CHAT_LOADING"){
            return{            
                data:payload,
            loading:true,
            error:false
            }
        }
        else{
            return{
                ...state
            }
        }
}