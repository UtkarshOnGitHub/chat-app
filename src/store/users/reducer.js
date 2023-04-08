const initalState = {
    data:[],
}


const userReducer = (state=initalState , {type,payload})=>{
    if(type == "GET_USER_SUCCESS"){
        return {
            data:payload
        }
    }
    else if(type=== "GET_LOGIN_USER"){
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

export {userReducer}