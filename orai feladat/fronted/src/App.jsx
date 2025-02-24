import { useState } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import {Home,Szobak} from './components/pages'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'

function App() {

  return (
    <>
      <div className='App'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Szobak' element={<Szobak/>}/>
        </Routes>
      </div>

    </>
  )
}

export default App
