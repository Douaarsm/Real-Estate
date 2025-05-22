import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="blur-circle circle1"></div>
      <div className="blur-circle circle2"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="signin-card"
      >
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo" />
          <h2>Connexion</h2>
          <p>
            Pas de compte ? <Link to="/signup">Créer un compte</Link>
          </p>
        </div>
        <form className="signin-form" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="error-box"
            >
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </motion.div>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <span><i className="fas fa-envelope"></i></span>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Votre email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <span><i className="fas fa-lock"></i></span>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Votre mot de passe"
              />
            </div>
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Se souvenir de moi
            </label>
            <a href="#">Mot de passe oublié ?</a>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="submit-button"
          >
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </motion.button>
        </form>
      </motion.div>

      <style>
        {`
          .signin-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(to bottom right, #dbeafe, #93c5fd, #3b82f6);
            position: relative;
            overflow: hidden;
          }

          .blur-circle {
            position: absolute;
            border-radius: 50%;
            filter: blur(100px);
            z-index: 0;
          }

          .circle1 {
            top: -150px;
            left: -150px;
            width: 400px;
            height: 400px;
            background-color: rgba(96, 165, 250, 0.3);
          }

          .circle2 {
            bottom: 0;
            right: 0;
            width: 300px;
            height: 300px;
            background-color: rgba(29, 78, 216, 0.2);
          }

          .signin-card {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 400px;
            padding: 2rem;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(16px);
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.4);
          }

          .logo-container {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .logo {
            height: 56px;
            width: 56px;
            margin-bottom: 0.5rem;
          }

          .logo-container h2 {
            font-size: 1.75rem;
            font-weight: bold;
            color: #1e3a8a;
          }

          .logo-container p {
            font-size: 0.875rem;
            color: #4b5563;
          }

          .logo-container a {
            color: #2563eb;
            font-weight: 600;
            text-decoration: none;
          }

          .logo-container a:hover {
            text-decoration: underline;
          }

          .signin-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .error-box {
            background-color: #fee2e2;
            border-left: 4px solid #ef4444;
            padding: 0.75rem;
            border-radius: 0.5rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
            color: #b91c1c;
            font-size: 0.875rem;
          }

          label {
            display: block;
            font-size: 0.875rem;
            color: #1e3a8a;
            margin-bottom: 0.25rem;
            font-weight: 500;
          }

          .input-wrapper {
            position: relative;
          }

          .input-wrapper span {
            position: absolute;
            top: 50%;
            left: 0.75rem;
            transform: translateY(-50%);
            color: #60a5fa;
          }

          input[type="email"],
          input[type="password"] {
            width: 100%;
            padding: 0.5rem 0.75rem 0.5rem 2.25rem;
            border-radius: 0.5rem;
            border: 1px solid #bfdbfe;
            background: rgba(255, 255, 255, 0.8);
            outline: none;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            color: #1e3a8a;
            width: 100%;
            max-width: 400px;
            box-sizing: border-box;
          }

          input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4);
          }

          .options {
            display: flex;
            justify-content: space-between;
            font-size: 0.875rem;
            color: #1e3a8a;
            align-items: center;
          }

          .options a {
            color: #3b82f6;
            text-decoration: none;
            font-size: 0.75rem;
          }

          .options a:hover {
            text-decoration: underline;
          }

          .submit-button {
            width: 100%;
            padding: 0.5rem;
            background: linear-gradient(to right, #3b82f6, #1d4ed8);
            color: white;
            border-radius: 0.5rem;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
          }

          .submit-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .submit-button:hover {
            background: linear-gradient(to right, #2563eb, #1e40af);
          }
        `}
      </style>
    </div>
  );
};

export default SignIn;
