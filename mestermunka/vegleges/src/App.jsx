import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Admin, Home, Login } from './components/pages';
import NavBar from './components/Navbar';
import Recept from './components/pages/Recept';
import Profile from './components/pages/Profile';
import LandingPage from './components/pages/LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [kereses, setKereses] = useState("");
  const location = useLocation();

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
  if (location.pathname === "/" && sessionStorage.getItem("visited")) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="App">
      {location.pathname !== "/" && (
        <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} setKereses={setKereses} />
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home kereses={kereses} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/recept" element={isLoggedIn ? <Recept /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
