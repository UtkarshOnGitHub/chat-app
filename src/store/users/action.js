import axios from "axios"


export const LoginUser =(data={})=>async(dispatch)=>{
    try{
        let res = await axios.post(`https://chatappbackend-production-2ce5.up.railway.app/user/login`,data)
        dispatch({type:"GET_LOGIN_USER" ,payload:res.data})
    }catch(e){
        console.log(e)
    }
}
// export const getUser =(data={})=>async(dispatch)=>{
//     try{
//         let res = await axios.post(`https://chatappbackend-production-2ce5.up.railway.app/user/byToken`,data)
//         dispatch({type:"GET_USER_SUCCESS" ,payload:res.data})
//     }catch(e){
//         console.log(e)
//     }
// }