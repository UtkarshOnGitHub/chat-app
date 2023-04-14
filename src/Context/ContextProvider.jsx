import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
// import { getUser } from '../api/api';
export const AppContext  = React.createContext();

export const getUser = async(data={})=>{
    return await axios.post("https://chatappbackend-production-2ce5.up.railway.app/user/byToken",data)
}



let auth = sessionStorage.getItem("token") || "";

const ContextProvider = ({children}) => {
    const [token , setToken] = useState("");
    useEffect(()=>{
        if(token!= ""){
            getUser({token:token}).then((res)=>{
                setToken(res.data)
            })
        }
        else{
            setToken(auth)
        }
    },[token])


    return (
        <div>
            <AppContext.Provider value={{token,setToken}}>
                {children}
            </AppContext.Provider>
        </div>
  )
}

export default ContextProvider