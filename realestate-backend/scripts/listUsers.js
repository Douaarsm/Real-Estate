const mongoose = require('mongoose');
const User = require('../models/User');

mongoose.connect('mongodb://127.0.0.1:27017/RealEstate')
  .then(async () => {
    const users = await User.find();
    console.log(users);
    mongoose.disconnect();
  })
  .catch(err => console.error(err)); 