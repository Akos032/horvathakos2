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

  // Regisztráció kezelése
  const register = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", { username, email, password })
      .then((res) => {
        console.log(res);
        navigate("/Home");
      })
      .catch((err) => console.log(err));
  };

  // Bejelentkezés kezelése
  const login = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", values)
      .then((res) => {
        if (res.data.Status === "Sikeres") {
          navigate("/Home");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => console.log(err));
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
