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
    console.error('Erreur lors de l\'enregistrement de la visite :', error);
    res.status(400).send('Erreur lors de l\'enregistrement');
  }
});

// GET route to fetch visits
router.get('/', async (req, res) => {
  try {
    const { userId, propertyId } = req.query;
    const filter = {};

    if (userId) {
      filter.userId = userId;
    }
    if (propertyId) {
      filter.propertyId = propertyId;
    }

    // TODO: If propertyId in model is a mongoose.Schema.Types.ObjectId referencing a Property model,
    // use .populate('propertyId') here to get full property details.
    // Example: const visits = await Visit.find(filter).populate('propertyId').exec();
    
    const visits = await Visit.find(filter).exec();

    // TODO: Manually fetch and attach property details if propertyId is just a String and no Property model exists
    // or if populate is not used. The frontend expects reservation.property.title and .location
    // This part requires fetching data from wherever property details are stored (e.g., another collection)
    // and mapping it to each visit.
    // Example (Conceptual, requires actual property fetching logic): 
    // const visitsWithProperty = await Promise.all(visits.map(async visit => {
    //   const propertyDetails = await fetchPropertyDetails(visit.propertyId); // Your function to fetch property details
    //   return { ...visit.toJSON(), property: propertyDetails };
    // }));
    // res.status(200).json(visitsWithProperty);

    // Returning visits without populated property details for now
    res.status(200).json(visits);

  } catch (error) {
    console.error('Erreur lors de la récupération des visites :', error);
    res.status(500).send('Erreur lors de la récupération des visites');
  }
});

module.exports = router;
