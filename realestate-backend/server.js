const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const visitsRoutes = require('./routes/visits');
const authRoutes = require('./routes/auth');
const ordersRoutes = require('./routes/orders');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuration MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/RealEstate';

// Options de connexion MongoDB
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout après 5 secondes
  socketTimeoutMS: 45000, // Timeout des opérations après 45 secondes
};

// Connexion MongoDB avec plus de logs
console.log('🔄 Tentative de connexion à MongoDB...');
console.log('📦 URI de connexion:', MONGODB_URI);

mongoose.connect(MONGODB_URI, mongooseOptions)
.then(async () => {
  console.log('✅ Connecté à MongoDB avec succès');
  console.log('📦 Base de données:', MONGODB_URI.split('/').pop());
  
  // Vérifier les collections existantes
  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('\n📚 Collections existantes:');
  collections.forEach(collection => {
    console.log(`   - ${collection.name}`);
  });
  
  // Vérifier la collection users
  const usersCollection = await mongoose.connection.db.collection('users');
  const userCount = await usersCollection.countDocuments();
  console.log(`\n👥 Nombre d'utilisateurs dans la collection 'users': ${userCount}`);
})
.catch(err => {
  console.error('❌ Erreur de connexion MongoDB:', err);
  console.error('Détails de l\'erreur:', {
    name: err.name,
    message: err.message,
    code: err.code
  });
  process.exit(1);
});

// Événements de connexion MongoDB
mongoose.connection.on('error', err => {
  console.error('❌ Erreur de connexion MongoDB:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Déconnecté de MongoDB');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 Reconnexion à MongoDB réussie');
});

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/visits', visitsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', ordersRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API RealEstate backend fonctionne !');
});

// Gestion des erreurs globale
app.use((err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  res.status(500).json({
    message: 'Une erreur est survenue',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur lancé sur http://localhost:${PORT}`);
  console.log('📝 Routes disponibles:');
  console.log('   - GET  /');
  console.log('   - POST /api/auth/signup');
  console.log('   - POST /api/auth/login');
  console.log('   - POST /api/orders');
  console.log('   - GET  /api/orders/my-orders');
  console.log('   - GET  /api/orders/:id');
  console.log('   - PATCH /api/orders/:id/status');
});