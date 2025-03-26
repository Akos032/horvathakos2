import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Retrieve user data and admin status from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const adminStatus = JSON.parse(localStorage.getItem("admin"));

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

      {/* Update the display of the menu based on menuOpen */}
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
