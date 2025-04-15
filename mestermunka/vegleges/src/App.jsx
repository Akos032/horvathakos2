import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Admin, Home, Login } from './components/pages';
import NavBar from './components/Navbar';
import Recept from './components/pages/Recept';
import Profile from './components/pages/Profile';
import LandingPage from './components/pages/LandingPage'; // 🎬 Nyitó oldal

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [kereses, setKereses] = useState(""); // 🔍 Keresés állapot
  const location = useLocation(); // aktuális route lekérése

  useEffect(() => {
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
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {/* Ne jelenjen meg a nav a landing oldalon */}
      {location.pathname !== "/" && (
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} setKereses={setKereses} />
      )}

      <Routes>
        {/* 🌟 Nyitó animációs oldal */}
        <Route path="/" element={<LandingPage />} />

        {/* 🏡 Főoldal csak /home alatt */}
        <Route path="/home" element={<Home kereses={kereses} />} />

        {/* 🔐 Bejelentkezés */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* 👤 Profil */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* 🍽 Recept oldal */}
        <Route path="/recept" element={isLoggedIn ? <Recept /> : <Login setIsLoggedIn={setIsLoggedIn} />} />

        {/* 🛠 Admin */}
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
