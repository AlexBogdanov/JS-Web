const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/memedb';

module.exports = mongoose.connect(connectionString, { useNewUrlParser: true  });