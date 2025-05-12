import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RealEstate</h3>
          <p>Votre partenaire de confiance dans l'immobilier depuis 2010. Nous vous accompagnons dans tous vos projets immobiliers.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Liens Rapides</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/properties">Nos Propriétés</Link></li>
            <li><Link to="/about">À Propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Avenue Mohammed V, Casablanca</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+212 522-123456</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>contact@realestate.ma</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Horaires d'Ouverture</h4>
          <ul className="opening-hours">
            <li>Lundi - Vendredi: 9h - 18h</li>
            <li>Samedi: 9h - 13h</li>
            <li>Dimanche: Fermé</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RealEstate. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer; 