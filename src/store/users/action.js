import axios from "axios"


export const LoginUser =(data={})=>async(dispatch)=>{
    try{
        let res = await axios.post(`http://localhost:8080/user/login`,data)
        dispatch({type:"GET_LOGIN_USER" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}