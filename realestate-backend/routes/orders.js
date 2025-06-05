const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/auth');

// Créer une nouvelle commande
router.post('/', auth, async (req, res) => {
  try {
    const { propertyId, offerAmount, message } = req.body;
    
    if (!propertyId || !offerAmount || !message) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const order = new Order({
      user: req.user._id,
      property: propertyId,
      offerAmount,
      message
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('❌ Erreur création commande:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
});

// Obtenir toutes les commandes de l'utilisateur
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('property', 'title price address')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
});

// Obtenir une commande spécifique
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    }).populate('property', 'title price address');

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
  }
});

// Mettre à jour le statut d'une commande (pour les administrateurs)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut' });
  }
});

module.exports = router; 