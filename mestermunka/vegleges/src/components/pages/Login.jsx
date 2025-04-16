import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { motion, AnimatePresence } from "framer-motion";

const RulesModal = ({ onAccept, onDecline }) => (
  <motion.div
    className="rules-modal"
    initial={{ opacity: 0, y: "-100%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "100%" }}
    transition={{ duration: 0.4 }}
  >
    <div className="rules-content">
      <h2>Használati szabályzat</h2>
      <p>
        Ez a főzős oldal egy közösségi recept- és élménymegosztó platform, ahol:
        <ul>
          <li>Megoszthatod kedvenc receptjeidet</li>
          <li>Tetszés szerint kipróbálhatod mások ételeit</li>
          <li>Feltölthetsz recepteket és kategorizálhatod őket</li>
        </ul>
        <strong>Tilos:</strong>
        <ul>
          <li>Nem odaillő recept, olyan hozzávalókkal, amik nem alkalmazhatóak együtt, egy recept spamelése</li>
          <li>Mások receptjeinek plagizálása</li>
          <li>Spam, ártó szándékú viselkedés</li>
        </ul>
        A regisztráció sroán a továbbiakban tudomásul vetted és elfogadod ezeket a szabályokat.
      </p>
      <div className="rules-buttons">
        <button className="accept-btn" onClick={onAccept}>Elfogadom</button>
        <button className="decline-btn" onClick={onDecline}>Kilépek</button>
      </div>
    </div>
  </motion.div>
);

export const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(false);

  const navigate = useNavigate();

  const handleAuth = (event, isRegister) => {
    event.preventDefault();

    const endpoint = isRegister ? "register" : "login";
    const userData = {
      felhasznalonev: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    if (!userData.email || !userData.password || (isRegister && !userData.felhasznalonev)) {
      alert("Minden mezőt ki kell tölteni!");
      return;
    }

    axios.post(`http://localhost:3001/${endpoint}`, userData, {
      headers: { "Content-Type": "application/json" }
    })
    .then(response => {
      if (isRegister) {
        alert("Sikeres regisztráció!");
        setTransitioning(true);
        setTimeout(() => {
          setIsRegistering(false);
          setUsername("");
          setEmail("");
          setPassword("");
          setTransitioning(false);
        }, 1000);
      } else {
        const user = response.data.user;

        if (user.szabalyzat === 0) {
          localStorage.setItem("pendingUserId", user.felhasznalo_id);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("admin", JSON.stringify(response.data.admin));
          setShowRulesModal(true);
          return;
        }             

        alert("Sikeres bejelentkezés!");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        localStorage.removeItem("pendingUserId");
        setIsLoggedIn(true);
        navigate("/");
      }
    })
    .catch(error => {
      alert(error.response?.data?.error || "Hiba történt!");
    });
  };

  const acceptRules = () => {
    const userId = localStorage.getItem("pendingUserId");
    if (!userId) {
      alert("Nem található felhasználói azonosító.");
      return;
    }
  
    axios.post("http://localhost:3001/api/accept-rules", { userId })
      .then(() => {
        alert("Szabályzat elfogadva!");
        setShowRulesModal(false);
  
        const storedUser = JSON.parse(localStorage.getItem("user"));
        storedUser.szabalyzat = 1;
        localStorage.setItem("user", JSON.stringify(storedUser));
  
        localStorage.removeItem("pendingUserId");
  
        setIsLoggedIn(true);
        navigate("/home");
      })
      .catch(() => {
        alert("Hiba történt a szabályzat elfogadásakor.");
      });
  };
  

  const declineRules = () => {
    alert("A szabályzat elfogadása szükséges a folytatáshoz.");
    setShowRulesModal(false);
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

      <AnimatePresence>
        {showRulesModal && (
          <RulesModal
            onAccept={acceptRules}
            onDecline={declineRules}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
