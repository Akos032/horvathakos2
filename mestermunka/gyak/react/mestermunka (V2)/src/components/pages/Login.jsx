import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { motion, AnimatePresence } from "framer-motion";

export const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [transitioning, setTransitioning] = useState(false); // to control animation state
  const navigate = useNavigate();

  const handleAuth = (event, isRegister) => {
    event.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    const userData = {
      Felhasznalonev: username.trim(),
      Email: email.trim(),
      password: password.trim(),
    };

    if (!userData.Email || !userData.password || (isRegister && !userData.Felhasznalonev)) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    axios.post(`http://localhost:3001/${endpoint}`, userData, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      if (isRegister) {
        alert("Sikeres regisztráció!");

        // Animate the transition back to login
        setTransitioning(true);
        setTimeout(() => {
          setIsRegistering(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setTransitioning(false);
        }, 1000); // delay to allow fade animation
      } else {
        alert("Sikeres bejelentkezés!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        setIsLoggedIn(true);
        navigate("/");
      }
    })
    .catch(error => {
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
      <AnimatePresence mode="wait">
        {!transitioning && (
          <motion.div
            id="auth-box"
            key={isRegistering ? "register" : "login"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1>{isRegistering ? "Regisztráció" : "Bejelentkezés"}</h1>
            <form onSubmit={(e) => handleAuth(e, isRegistering)}>
              {isRegistering && (
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Felhasználónév"
                    id="username"
                    value={username}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  placeholder="Jelszó"
                  id="password"
                  value={password}
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
        )}
      </AnimatePresence>
    </motion.div>
  );
};
