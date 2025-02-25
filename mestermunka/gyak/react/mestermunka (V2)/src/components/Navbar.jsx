import React from "react";
import {useState} from "react";
import {Link, NavLink} from "react-router-dom"
import "./Navbar.css"

const NavBar = (() => {
    const [menuOpen,setMenuOpen] = useState(false)
    return(
        <div>
            <nav>
                <Link to = '/'>Receptek</Link>
                <div className="menu" onClick={() =>
            setMenuOpen(!menuOpen)
            }>
            <span></span>
            <span></span>
            <span></span>
            </div>
            </nav>
        </div>

    )
})

export default NavBar