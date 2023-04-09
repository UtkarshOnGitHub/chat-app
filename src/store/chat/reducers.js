let initialState = {
    data:[],
    loading:true,
    error:false
}


export const chatReducer =(state=initialState , {type,payload})=>{
        if(type == "GET_CHAT_SUCCESS"){
            return {
                data:payload,
                loading:false,
                error:false
            }
        }
        else{
            return{
                ...state
            }
        }
}