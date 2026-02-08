import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">🏠 Koodaram</Link>
        <nav id="main-nav" className={isMenuOpen ? 'active' : ''}>
          <Link to="/">Home</Link>
          <Link to="/browse">Browse Hostels</Link>
          <Link to="/list-hostel">List Hostel</Link>
          <Link to="/about">About</Link>
        </nav>
        <div className="nav-right">
          <a 
            href="https://github.com/Koodaram-Inc/koodaram-data" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-cta-button"
          >
            ⭐ Open Source
          </a>
          <button className="hamburger" id="hamburger-button" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
