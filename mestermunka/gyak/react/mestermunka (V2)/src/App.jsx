import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Home, Login } from './components/pages';
import NavBar from './components/Navbar';
import Recept from './components/pages/Recept';
import Profile from './components/pages/Profile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage the authentication status

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setIsLoggedIn(true);
      } catch (error) {
        // Log the error if parsing fails
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Remove user from localStorage and update the logged-in state
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass the logout function to NavBar */}
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
  );
}

export default App;
