// routes/auth.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Simule un utilisateur (remplace ça plus tard avec MongoDB)
const fakeUser = {
  email: 'test@example.com',
  password: '123456', // dans la réalité, tu utiliserais bcrypt + DB
};

router.use(cors());

// Validation des données d'entrée
const validateSignupData = (name, email, password) => {
  console.log('📋 Données reçues:', { name, email, password });
  
  // Vérifier si name est un objet
  if (typeof name === 'object' && name !== null) {
    // Si c'est un objet avec firstName et lastName, les combiner
    if (name.firstName && name.lastName) {
      name = `${name.firstName} ${name.lastName}`;
      console.log('🔄 Nom combiné:', name);
    } else {
      throw new Error('Format de nom invalide. Utilisez une chaîne de caractères ou un objet avec firstName et lastName');
    }
  }

  if (!name || !email || !password) {
    throw new Error('Tous les champs sont requis');
  }
  if (typeof name !== 'string') {
    throw new Error('Le nom doit être une chaîne de caractères');
  }
  if (password.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères');
  }
  if (!email.includes('@')) {
    throw new Error('Email invalide');
  }

  return name; // Retourner le nom validé
};

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  console.log('📝 Tentative d\'inscription:', req.body);
  const { name, email, password } = req.body;

  try {
    // Validation des données
    const validatedName = validateSignupData(name, email, password);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email déjà utilisé:', email);
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Créer le nouvel utilisateur
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ 
      name: validatedName, // Utiliser le nom validé
      email, 
      password: hashedPassword 
    });

    await user.save();
    console.log('✅ Utilisateur créé avec succès:', { email, name: validatedName });

    // Générer le token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('❌ Erreur signup:', err.message);
    res.status(500).json({
      message: err.message || 'Erreur lors de l\'inscription',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  console.log('🔑 Tentative de connexion:', req.body.email);
  const { email, password } = req.body;

  try {
    // Validation des données
    if (!email || !password) {
      throw new Error('Email et mot de passe requis');
    }

    // Rechercher l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Mot de passe incorrect pour:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('✅ Connexion réussie pour:', email);

    // Générer le token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      'SECRET_KEY',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email }
    });
  } catch (err) {
    console.error('❌ Erreur login:', err.message);
    res.status(500).json({
      message: err.message || 'Erreur lors de la connexion',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

module.exports = router;
