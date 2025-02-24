import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () => 
{
    const [menuOpen,setMenuOpen] = useState(false)
    return(
        <>
            <header>
                <img src="top.jpg" id='img'/>
            </header>
            <nav>
            <Link className="title">Címoldal</Link>
            <div className="menu" onClick={() =>
                setMenuOpen(!menuOpen)
            }>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <ul className={menuOpen ? "open" : ""}>
                <li>
                    <NavLink to = "/">Fő oldal</NavLink>
                </li>
                <li>
                    <NavLink to = "/Szobak">Szobak</NavLink>
                </li>

            </ul>

            </nav>
        </>
    )

}