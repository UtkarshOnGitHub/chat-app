import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
export const AppContext  = React.createContext();


let auth = sessionStorage.getItem("token") || "";

const getUser = async(data={})=>{
    return await axios.post("https://chatappbackend-production-2ce5.up.railway.app/user/byToken",data)
}

const ContextProvider = ({children}) => {
    const [token , setToken] = useState(auth);
    const data = {
        token:auth
    }

    useEffect(()=>{
        getUser(data).then((res)=>{
            setToken(res.data)
        })
    },[])
    return (
        <div>
            <AppContext.Provider value={{token}}>
                {children}
            </AppContext.Provider>
        </div>
  )
}

export default ContextProvider