const mongoose = require('mongoose');
const User = require('../models/User');

async function testConnection() {
  try {
    console.log('🔄 Test de connexion à MongoDB...');
    
    // Connexion à MongoDB
    await mongoose.connect('mongodb://127.0.0.1:27017/RealEstate', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log('✅ Connecté à MongoDB avec succès');
    
    // Vérifier les collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Collections existantes:');
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`);
    });
    
    // Vérifier les utilisateurs existants
    const users = await User.find({}, '-password');
    console.log('\n📊 Liste des utilisateurs:');
    if (users.length === 0) {
      console.log('   Aucun utilisateur trouvé');
    } else {
      users.forEach(user => {
        console.log(`   - ${user.name} (${user.email})`);
        console.log(`     ID: ${user._id}`);
        console.log(`     Créé le: ${user.createdAt}`);
        console.log('     --------------------');
      });
    }
    
    // Afficher le nombre total d'utilisateurs
    console.log(`\n👥 Total: ${users.length} utilisateur(s) dans la base de données`);
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Déconnecté de MongoDB');
  }
}

testConnection(); 