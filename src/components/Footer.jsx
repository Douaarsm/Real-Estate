import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="logo">RealEstate</h3>
                <p className="description">
                  Votre partenaire de confiance dans l'immobilier depuis 2010.
                  Nous vous accompagnons dans tous vos projets immobiliers avec expertise et passion.
                </p>
              </motion.div>

              <div className="socials">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <motion.a
                    key={social}
                    href={`https://${social}.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <i className={`fab fa-${social}`}></i>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="newsletter"
            >
              <h4 className="newsletter-title">Restez Informé</h4>
              <p className="newsletter-desc">
                Inscrivez-vous à notre newsletter pour recevoir nos dernières offres et actualités.
              </p>
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre adresse email"
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  S'inscrire
                </motion.button>
              </form>
            </motion.div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="column-title">Liens Rapides</h4>
              <ul>
                {['Accueil', 'Nos Propriétés', 'À Propos', 'Contact'].map((link) => (
                  <motion.li key={link} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Link to={`/${link === 'Accueil' ? '' : link.toLowerCase().replace(' ', '-')}`} className="footer-link">
                      <span className="dot" /> {link}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">Nos Services</h4>
              <ul>
                {['Vente', 'Location', 'Estimation', 'Conseil'].map((service) => (
                  <motion.li key={service} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Link to={`/services/${service.toLowerCase()}`} className="footer-link">
                      <span className="dot" /> {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="column-title">Contact</h4>
              <ul>
                {[
                  { icon: 'map-marker-alt', text: '123 Avenue Mohammed V, Casablanca' },
                  { icon: 'envelope', text: 'contact@realestate.ma' },
                  { icon: 'phone', text: '+212 522-123456' },
                ].map((item, index) => (
                  <motion.li key={index} className="contact-item" whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <span className="contact-icon">
                      <i className={`fas fa-${item.icon}`}></i>
                    </span>
                    {item.text}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RealEstate. Tous droits réservés.</p>
          <div className="bottom-links">
            <Link to="/privacy">Politique de confidentialité</Link>
            <Link to="/terms">Conditions d'utilisation</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .footer {
          background: linear-gradient(135deg, #1a1a1a, #1e3a8a, #1a1a1a);
          color: white;
          padding: 60px 20px 20px;
        }
        .footer-container {
          max-width: 1200px;
          margin: auto;
        }
        .footer-top {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 60px;
        }
        .footer-brand {
          flex: 1;
          min-width: 280px;
        }
        .logo {
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(to right, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .description {
          color: #ccc;
          line-height: 1.6;
          margin-top: 16px;
        }
        .socials {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }
        .social-icon {
          width: 40px;
          height: 40px;
          background-color: rgba(30, 64, 175, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          color: white;
          font-size: 18px;
          text-decoration: none;
          transition: background 0.3s;
        }
        .social-icon:hover {
          background-color: #2563eb;
        }
        .newsletter {
          flex: 1;
          min-width: 280px;
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(6px);
          border-radius: 16px;
          padding: 20px;
        }
        .newsletter-title {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        .newsletter-desc {
          color: #ccc;
          margin-bottom: 20px;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
       .newsletter-input {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;

 
  width: 100%;
  max-width: 400px; /* tqdr tbdlha */
  box-sizing: border-box;
}

        .newsletter-button {
          padding: 12px;
          border: none;
          background: linear-gradient(to right, #3b82f6, #2563eb);
          color: white;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .newsletter-button:hover {
          background: linear-gradient(to right, #2563eb, #1d4ed8);
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }
        .column-title {
          font-size: 1.2rem;
          color: #60a5fa;
          margin-bottom: 20px;
        }
        .footer-link {
          color: #ccc;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.2s;
        }
        .footer-link:hover {
          color: #60a5fa;
        }
        .dot {
          width: 6px;
          height: 6px;
          background-color: #3b82f6;
          border-radius: 50%;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ccc;
        }
        .contact-icon {
          width: 40px;
          height: 40px;
          background-color: rgba(30, 64, 175, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          margin-top: 40px;
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #aaa;
        }
        .bottom-links {
          display: flex;
          gap: 20px;
        }
        .bottom-links a {
          color: #aaa;
          text-decoration: none;
          transition: color 0.2s;
        }
        .bottom-links a:hover {
          color: #60a5fa;
        }

        @media (max-width: 768px) {
          .footer-top {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default Footer;
