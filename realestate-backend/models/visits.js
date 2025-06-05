// models/Visit.js
const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  visitDate: String,
  visitTime: String,
  message: String,
  propertyId: String,
  userId: String,
  status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Visit', visitSchema);
