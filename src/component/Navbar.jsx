import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { Button } from './ui/Button'; // Assurez-vous que le chemin est correct

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link className="navbar-brand" to="/">
          <span className="brand-text">RealEstate</span>
        </Link>

        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
            Accueil
          </Link>
          <Link className="nav-link" to="/properties" onClick={() => setIsMenuOpen(false)}>
            Nos Propriétés
          </Link>
          <Link className="nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>
            À propos
          </Link>
          <Link className="nav-link" to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          <Link className="nav-button" to="/properties" onClick={() => setIsMenuOpen(false)}>
            Réserver
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
