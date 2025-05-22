import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

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
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link className="nav-link" to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link className="nav-link" to="/properties" onClick={() => setIsMenuOpen(false)}>
            Properties
          </Link>
          <Link className="nav-link" to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link className="nav-link" to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
          {user ? (
            <>
              <Link className="nav-link" to="/my-reservations" onClick={() => setIsMenuOpen(false)}>
                My Reservations
              </Link>
              <button 
                className="nav-button logout" 
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/signin" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
              <Link className="nav-button" to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
