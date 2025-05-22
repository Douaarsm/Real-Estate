import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await signup(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="blur-circle top-left"></div>
        <div className="blur-circle bottom-right"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="signup-form"
        >
          <div className="form-header">
            <img className="logo" src={logo} alt="Logo" />
            <h2>Créer un compte</h2>
            <p>
              Déjà inscrit ?{' '}
              <Link to="/signin" className="signin-link">Se connecter</Link>
            </p>
          </div>
          <form className="form-body" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="error-message"
              >
                <i className="fas fa-exclamation-circle"></i>
                <span>{error}</span>
              </motion.div>
            )}
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="firstName">Prénom</label>
                <div className="input-wrapper">
                  <span><i className="fas fa-user"></i></span>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Nom</label>
                <div className="input-wrapper">
                  <span><i className="fas fa-user"></i></span>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                  />
                </div>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <span><i className="fas fa-envelope"></i></span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="password">Mot de passe</label>
                <div className="input-wrapper">
                  <span><i className="fas fa-lock"></i></span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Mot de passe"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirmer</label>
                <div className="input-wrapper">
                  <span><i className="fas fa-lock"></i></span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirmez le mot de passe"
                  />
                </div>
              </div>
            </div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="submit-button"
            >
              {isLoading ? 'Création du compte...' : 'Créer le compte'}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* CSS inside the same file */}
      <style jsx="true">{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: linear-gradient(to bottom right, #cfe2f3, #4fa0e3, #3b82f6);
          overflow: hidden;
        }

        .blur-circle {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          z-index: 0;
        }

        .top-left {
          top: -8rem;
          left: -8rem;
          width: 24rem;
          height: 24rem;
          background: #60a5fa;
          opacity: 0.3;
        }

        .bottom-right {
          bottom: 0;
          right: 0;
          width: 20rem;
          height: 20rem;
          background: #1d4ed8;
          opacity: 0.2;
        }

        .signup-form {
          z-index: 10;
          width: 100%;
          max-width: 32rem;
          padding: 2rem;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 1.5rem;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .form-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .form-header .logo {
          height: 3.5rem;
          width: 3.5rem;
          margin-bottom: 0.5rem;
        }

        .form-header h2 {
          font-size: 1.875rem;
          color: #1e3a8a;
          font-weight: bold;
          margin-bottom: 0.25rem;
        }

        .signin-link {
          color: #2563eb;
          font-weight: 600;
        }

        .form-body {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-row {
          display: grid;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .form-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
        }

        .input-group label {
          font-size: 0.875rem;
          color: #1e3a8a;
          margin-bottom: 0.25rem;
        }

        .input-wrapper {
          position: relative;
        }

        .input-wrapper span {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
          color: #60a5fa;
        }

        .input-wrapper input {
          padding: 0.5rem 1rem 0.5rem 2.5rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #bfdbfe;
          background: rgba(255, 255, 255, 0.8);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          transition: border-color 0.2s, box-shadow 0.2s;
           width: 110%;
          max-width: 400px;
          box-sizing: border-box;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: #60a5fa;
          box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
        }

        .error-message {
          background: #fee2e2;
          border-left: 4px solid #ef4444;
          padding: 0.75rem;
          border-radius: 0.375rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #b91c1c;
          font-size: 0.875rem;
        }

        .submit-button {
          padding: 0.5rem;
          border-radius: 0.5rem;
          background: linear-gradient(to right, #3b82f6, #1d4ed8);
          color: white;
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
          transition: background 0.2s, transform 0.2s;
          width: 100%;
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default SignUp;
