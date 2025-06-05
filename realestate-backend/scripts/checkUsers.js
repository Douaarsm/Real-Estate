const mongoose = require('mongoose');
const User = require('../models/User');

// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/RealEstate', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('✅ Connecté à MongoDB');
  
  try {
    // Récupérer tous les utilisateurs
    const users = await User.find({}, '-password'); // Exclure le mot de passe
    
    console.log('\n📊 Liste des utilisateurs dans la collection "users":');
    console.log('----------------------------------------');
    
    if (users.length === 0) {
      console.log('Aucun utilisateur trouvé dans la base de données');
    } else {
      users.forEach((user, index) => {
        console.log(`\nUtilisateur #${index + 1}:`);
        console.log(`ID: ${user._id}`);
        console.log(`Nom: ${user.name}`);
        console.log(`Email: ${user.email}`);
        console.log(`Créé le: ${user.createdAt}`);
        console.log(`Mis à jour le: ${user.updatedAt}`);
        console.log('----------------------------------------');
      });
    }
    
    // Afficher le nombre total d'utilisateurs
    console.log(`\nTotal: ${users.length} utilisateur(s) dans la base de données`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des utilisateurs:', error);
  } finally {
    // Fermer la connexion
    await mongoose.disconnect();
    console.log('\n👋 Déconnecté de MongoDB');
  }
})
.catch(err => {
  console.error('❌ Erreur de connexion à MongoDB:', err);
}); 