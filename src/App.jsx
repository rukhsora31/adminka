import React from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import AdminPanel from './pages/AdminPanel'

const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/admin' element={<AdminPanel/>} />
   </Routes>
   </>
  )
}

export default App
