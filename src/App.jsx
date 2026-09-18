import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Home from './pages/Dashboard/Home'
import Blog from './pages/Dashboard/Blog'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Home />} />
      <Route path='/blog' element={<ProtectedRoute><Blog /></ProtectedRoute>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
