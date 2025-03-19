import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Routes, Route } from 'react-router-dom'
import {Home,Login} from './components/pages'
import NavBar from './components/Navbar'
import Recept from './components/pages/Recept'
import Profile from './components/pages/Profile'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Az autentikáció státuszának kezelése

  return (
    <>
      <div className="App">
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        {/* Home page is always accessible */}
        <Route path="/" element={<Home />} /> 
        {/* Login page is always accessible */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {/* Conditional routing for Profile and Recept based on isLoggedIn state */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/recept" element={isLoggedIn ? <Recept /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
    </>
  )
}

export default App
