let initialState = {
    data:[]
}


export const chatReducer =(state=initialState , {type,payload})=>{
        if(type == "GET_CHAT_SUCCESS"){
            return {
                data:payload
            }
        }
        else{
            return{
                state
            }
        }
}