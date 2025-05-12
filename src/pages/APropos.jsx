import React from 'react';
import { Link } from 'react-router-dom';
import './APropos.css';
import heroImage from '../assets/hero-about.jpg'; 
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';

const APropos = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${heroImage})` }}>
        <div className="hero-content">
          <h1>À Propos de Nous</h1>
          <p>Votre partenaire de confiance dans l'immobilier depuis 2010</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Notre Mission</h2>
            <p>Nous nous engageons à offrir un service exceptionnel et à créer des expériences immobilières inoubliables pour nos clients. Notre objectif est de transformer vos rêves immobiliers en réalité.</p>
          </div>
          <div className="mission-stats">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Propriétés Vendues</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Clients Satisfaits</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">13</span>
              <span className="stat-label">Années d'Expérience</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Nos Valeurs</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Intégrité</h3>
              <p>Nous agissons avec honnêteté et transparence dans toutes nos transactions.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>Nous adoptons les dernières technologies pour améliorer votre expérience.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Excellence</h3>
              <p>Nous visons l'excellence dans chaque aspect de notre service.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Engagement</h3>
              <p>Nous nous engageons pleinement à satisfaire nos clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Notre Équipe</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src={person1} alt="CEO" />
              </div>
              <h3>Mohammed Alami</h3>
              <p className="member-role">Fondateur & CEO</p>
              <p className="member-bio">Plus de 20 ans d'expérience dans l'immobilier de luxe.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src={person3} alt="Manager" />
              </div>
              <h3>Fatima Zahra</h3>
              <p className="member-role">Directrice des Ventes</p>
              <p className="member-bio">Experte en négociation et relations clients.</p>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img src={person2} alt="Agent" />
              </div>
              <h3>Karim Benali</h3>
              <p className="member-role">Agent Immobilier Senior</p>
              <p className="member-bio">Spécialiste des propriétés de prestige.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Prêt à Commencer Votre Projet Immobilier ?</h2>
          <p>Contactez-nous dès aujourd'hui pour une consultation gratuite</p>
          <Link to="/contact" className="cta-button">Contactez-nous</Link>
        </div>
      </section>
    </div>
  );
};

export default APropos;