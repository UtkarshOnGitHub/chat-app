import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgetPassword from '../Components/ForgetPassword'
import Login from '../Components/Login'
import Signup from '../Components/Signup'
import Chat from '../Components/Chat'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
    </Routes>
  )
}

export default AllRoutes
