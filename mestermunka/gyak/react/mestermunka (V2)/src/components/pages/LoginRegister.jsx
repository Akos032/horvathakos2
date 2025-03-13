import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginRegister.css'; // CSS fájl importálása

export const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Alapértelmezetten bejelentkezés
  const navigate = useNavigate();

  const values ={
    username,
    email,
    password
  }

  const register = (event) => {
    event.preventDefault();

    const userData = {
        Felhasznalonev: username.trim(), // 🔹 Eltávolítja az esetleges felesleges szóközöket
        Email: email.trim(),
        password: password.trim()
    };

    if (!userData.Felhasznalonev || !userData.Email || !userData.password) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    axios.post("http://localhost:3001/register", userData, {
        headers: { "Content-Type": "application/json" }
    })
    .then(response => {
        console.log("Regisztráció sikeres:", response.data);
        alert("Sikeres regisztráció!");
    })
    .catch(error => {
        console.error("Hiba történt a regisztráció során:", error.response ? error.response.data : error.message);
        alert(error.response?.data?.error || "Hiba történt a regisztráció során!");
    });
};



const login = (event) => {
  event.preventDefault();

  axios.post("http://localhost:3001/login", {
      Email: email,
      password: password
  }, {
      headers: { "Content-Type": "application/json" }
  })
  .then(response => {
      console.log("✅ Sikeres bejelentkezés:", response.data);
      alert("Sikeres bejelentkezés!");
  })
  .catch(error => {
      console.error("❌ Hiba történt a bejelentkezés során:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.error || "Hiba történt a bejelentkezés során!");
  });
};

  return (
    <div className="login-register-container">
      <div className="form-container">
        {/* Regisztrációs blokk */}
        <div className={`form-box ${isRegistering ? 'active' : ''}`}>
          <h1>Regisztráció</h1>
          <form onSubmit={register}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Felhasználónév"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Jelszó"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Regisztráció</button>
          </form>
        </div>

        {/* Bejelentkezési blokk */}
        <div className={`form-box ${!isRegistering ? 'active' : ''}`}>
          <h1>Bejelentkezés</h1>
          <form onSubmit={login}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Felhasználónév"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Jelszó"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Bejelentkezés</button>
          </form>
        </div>
      </div>

      {/* Regisztráció / Bejelentkezés közötti váltás */}
      <div className="toggle-box">
        <button
          className="btn btn-link"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? "Már van fiókod? Bejelentkezés" : "Nincs fiókod? Regisztráció"}
        </button>
      </div>
    </div>
  );
};
