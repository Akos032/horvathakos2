import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div id="logo-title" className="d-flex align-items-center gap-2">
          <img src={"Média.png"} alt="Logo" id="nav-logo" />
          <Link to="/" id="nav-title" className="navbar-brand">Finomságok</Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={menuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Always show Login link if not logged in */}
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink to="/login" className="btn-login">Bejelentkezés</NavLink>
              </li>
            )}

            {/* Only show Recept and Profile after login */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/recept" className="btn">Receptek</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/profile" className="btn">Profil</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/finomsagok" className="btn">Finomságok</NavLink>
                </li>
                <li className="nav-item">
                  <button className='btn-logout' onClick={onLogout}>Kilépés</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
