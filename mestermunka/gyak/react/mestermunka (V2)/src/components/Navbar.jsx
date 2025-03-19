import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav id="navbar">
            <div id="nav-header">
                <div id="logo-title">
                    <img  src={"Média.png"} alt="Logo" id="nav-logo" />
                    <Link to='/' id="nav-title">Receptek</Link>
                </div>
                <div id="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <ul id="nav-links" className={menuOpen ? "open" : ""}>
                <li><NavLink to="/Login">Bejeletkezés</NavLink></li>
                <li><NavLink to="/Recept">Receptek</NavLink></li>
                <li><NavLink to="/Profile">Profil</NavLink></li>
            </ul>
        </nav>
    );
};

export default NavBar;