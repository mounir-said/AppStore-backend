const mongoose = require('mongoose');

// Your MongoDB connection URL
const MONGODB_URL = 'mongodb://localhost:27017/mydatabase';

mongoose.connect(process.env.MONGODB_URL,)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
