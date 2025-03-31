import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Admin, Home, Login } from './components/pages';
import NavBar from './components/Navbar';
import Recept from './components/pages/Recept';
import Profile from './components/pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Bejelentkezés kezelése

  useEffect(() => {
    // user adatai meghivása a localStorage-ból
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Bejelentkezet adatai kiszedése a localStorgae-ból
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/recept" element={isLoggedIn ? <Recept /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
