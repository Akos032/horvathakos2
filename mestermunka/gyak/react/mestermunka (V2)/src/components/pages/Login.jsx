import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { motion } from "framer-motion";

export const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (event, isRegister) => {
    event.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const userData = {
      Felhasznalonev: username.trim(),
      Email: email.trim(),
      password: password.trim(),
    };

    // Check if fields are empty
    if (!userData.Email || !userData.password || (isRegister && !userData.Felhasznalonev)) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    // Make API request to register or login
    axios.post(`http://localhost:3001/${endpoint}`, userData, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      // Success
      alert(isRegister ? "Sikeres regisztráció!" : "Sikeres bejelentkezés!");

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Automatically log the user in after registration
      setIsLoggedIn(true);  // Update the logged-in state

      // Navigate to the home page or protected route
      navigate("/"); 
    })
    .catch(error => {
      // Handle error
      alert(error.response?.data?.error || "Hiba történt!");
    });
  };

  return (
    <motion.div 
      id="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        id="auth-box"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        key={isRegistering ? "register" : "login"}
      >
        <h1>{isRegistering ? "Regisztráció" : "Bejelentkezés"}</h1>
        <form onSubmit={(e) => handleAuth(e, isRegistering)}>
          {/* Show username input only when registering */}
          {isRegistering && (
            <div className="input-group">
              <input
                type="text"
                placeholder="Felhasználónév"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Jelszó"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button 
            type="submit" 
            id="auth-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRegistering ? "Regisztráció" : "Bejelentkezés"}
          </motion.button>
        </form>
        <motion.button 
          id="toggle-auth" 
          onClick={() => setIsRegistering(!isRegistering)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRegistering ? "Már van fiókod? Bejelentkezés" : "Nincs fiókod? Regisztráció"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
