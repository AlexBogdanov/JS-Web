/* eslint-disable no-console */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const User = require('../models/User');

module.exports = config => {
    mongoose.connect(config.dbPath, {
        useNewUrlParser: true
    });       
    const db = mongoose.connection;
    db.once('open', err => {
        if (err) throw err;
        User.seedAdminUser().then(() => {
            console.log('Connected to MongoDB');                
        }).catch((reason) => {
            console.log('Failed to connect to MongoDB');
            console.log(reason);
        });
    });
    db.on('error', reason => {
        console.log(reason);
    });
};