import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import API from '../service/serviceAPI';
// import { getUser } from '../api/api';
export const AppContext  = React.createContext();

export const getUser = async(data={})=>{
    return await axios.post(API+"/user/byToken",data)
}



let auth = sessionStorage.getItem("token") || "";

const ContextProvider = ({children}) => {
    const [token , setToken] = useState("");
    const [userData , setUserData]= useState({})
    useEffect(()=>{
        if(token!= ""){
            getUser({token:token}).then((res)=>{
                setUserData(res.data)
            })
        }
        else{
            setToken(auth)
        }
    },[token])


    return (
        <div>
            <AppContext.Provider value={{token,setToken,userData}}>
                {children}
            </AppContext.Provider>
        </div>
  )
}

export default ContextProvider