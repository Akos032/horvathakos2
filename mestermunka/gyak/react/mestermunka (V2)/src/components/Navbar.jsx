import React from "react";
import {useState} from "react";
import {Link, NavLink} from "react-router-dom"
import "./Navbar.css"

const NavBar = (() => {
    const [menuOpen,setMenuOpen] = useState(false)
    return(
        <nav>
            <div>
           
                <Link to = '/' className="title">Receptek</Link>
                <div className="menu" onClick={() =>
                setMenuOpen(!menuOpen)
                }>
                <span></span>
                <span></span>
                <span></span>
                </div>
            
            </div>
            <ul className={menuOpen ? "open" : ""}>
            <li>
                <NavLink to = "/Login">Bejeletkezés</NavLink>
                <NavLink to = "/Recept">Receptek</NavLink>
                <NavLink to = "/Profile">Profil</NavLink>
            </li>

            </ul>
        </nav>

    )
})

export default NavBar