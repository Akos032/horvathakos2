import React, { useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import Hamburger from 'hamburger-react';
import { AnimatePresence, motion } from 'framer-motion';

const NavBar = ({ isLoggedIn, onLogout, setKereses }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const ref = useRef(null);
  const location = useLocation();

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const adminStatus = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : 0;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setKereses(value);
  };

  return (
    <nav id="navbar-container">
      <div id="navbar-header">
        <div id="logo-title-container">
          <img src={'Mediapng2.png'} alt="Logo" id="navbar-logo" />
          <Link to="/" id="navbar-title">Receptek</Link>
        </div>
        {location.pathname === '/home' && (
          <div id="navbar-search-container">
            <input
              type="text"
              id="desktop-search-input"
              placeholder="Keresés..."
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        )}
        <div ref={ref} id='hamburger'>
          <Hamburger toggled={menuOpen} size={20} toggle={setMenuOpen} />
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
          </motion.div>
        )}
      </AnimatePresence>
      <ul id="navbar-links" className={menuOpen ? 'open' : ''}>
        {location.pathname === '/home' && (
          <div id="mobile-search-container">
            <input
              type="text"
              id="mobile-search-input"
              placeholder="Keresés..."
              value={searchValue}
              onChange={handleSearch}
            />
          </div>
        )}

        {!isLoggedIn && <li><NavLink to="/login">Bejelentkezés</NavLink></li>}
        {isLoggedIn && (
          <>
            {adminStatus === 1 && <li><NavLink to="/admin">Admin</NavLink></li>}
            <li><NavLink to="/recept">Receptek</NavLink></li>
            <li><NavLink to="/profile">Profil</NavLink></li>
            <li>
              <button id="logout-button" onClick={onLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;