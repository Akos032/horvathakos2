import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import {Home} from './components/pages'
import NavBar from './components/Navbar'


function App() {

  return (
    <>
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
