import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ForgetPassword from './ForgetPassword'
import Login from './Login'
import Signup from './Signup'
import Chat from './Chat'
import TabsSection from '../Components/Tabs/Tabs'
import Message from '../Components/Messages/Message'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/forgetPassword" element={<ForgetPassword/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
    </Routes>
  )
}

export default AllRoutes
