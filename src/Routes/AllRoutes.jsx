import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Signup from '../Components/Signup'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<h1>Home Page</h1>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  )
}

export default AllRoutes
