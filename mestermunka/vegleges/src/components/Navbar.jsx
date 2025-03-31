import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // user adatai meghivása a localStorage-ból
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const adminStatus = localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : 0;

  return (
    <nav id="navbar">
      <div id="nav-header">
        <div id="logo-title">
          <img src={"Média.png"} alt="Logo" id="nav-logo" />
          <Link to="/" id="nav-title">Receptek</Link>
        </div>
        <div 
          id="menu-icon" 
          onClick={() => setMenuOpen(!menuOpen)} 
          className={menuOpen ? 'open' : ''}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul id="nav-links" className={menuOpen ? "open" : ""}>
        {!isLoggedIn && <li><NavLink to="/login">Bejelentkezés</NavLink></li>}

        {isLoggedIn && (
          <>
            {adminStatus === 1 && <li><NavLink to="/admin">Admin</NavLink></li>}
            <li><NavLink to="/recept">Receptek</NavLink></li>
            <li><NavLink to="/profile">Profil</NavLink></li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
