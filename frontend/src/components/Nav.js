import React from 'react';
import { useState } from 'react';
import "../css/Nav.css"

const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
   
  return (
    <nav className="navbar">
                    <div className="navbar-logo">Teamly</div>
                    

                    <div className="hamburger" onClick={toggleNavbar}>
                      ☰
                    </div>

                    <ul className={`nav-links ${isOpen ? "open" : ""}`}>
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">Join</a></li>
                      <li><a href="/about">Host</a></li>
                    </ul>
    </nav>
  )
}

export default Nav;