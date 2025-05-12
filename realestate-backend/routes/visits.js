// routes/visits.js
const express = require('express');
const router = express.Router();
const Visit = require('../models/visits');
const cors = require('cors');

router.post('/', async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).send('Visite enregistrée');
  } catch (error) {
    res.status(400).send('Erreur lors de l\'enregistrement');
  }
});

module.exports = router;
