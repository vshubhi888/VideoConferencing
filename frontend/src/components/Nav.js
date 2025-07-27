import React, { useState, useEffect } from 'react';
import "../css/Nav.css"

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false)

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        setUsername(userObj.name);
        setLoggedIn(true)
      } catch (e) {
        setUsername(false);
      }
    }
  }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUsername(null);
        setLoggedIn(false);
        window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Teamly</div>
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
         {username && (
          <div className="navbar-username">
            {username}
          </div>
          )}
        <li><a href="/">Home</a></li>
        <li><a href="/join">Join</a></li>
        <li><a href="/host">Host</a></li>
        {isLoggedIn && (
          <li>
            <button className="btn btn-link nav-logout-btn" onClick={handleLogout} style={{ color: 'white', textDecoration: 'none' }}>
              Logout
            </button>
          </li>
        )}
      </ul>
      <div className="hamburger" onClick={toggleNavbar}>
        ☰
      </div>
    </nav>
  )
}

export default Nav;