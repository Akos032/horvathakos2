import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import {Home,LoginRegister} from './components/pages'
import NavBar from './components/Navbar'
import Recept from './components/pages/Recept'


function App() {

  return (
    <>
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/LoginRegister' element ={<LoginRegister/>}/>
          <Route path='/Recept' element = {<Recept/>}/>     
        </Routes>
      </div>
    </>
  )
}

export default App
