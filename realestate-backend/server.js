const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const visitsRoutes = require('./routes/visits');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/RealEstate')
  .then(() => console.log('Connecté à MongoDB'))
  .catch(err => console.error(err));

app.use('/api/visits', visitsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveur lancé sur http://localhost:${PORT}`));