const mongoose = require('mongoose');

const RentSchema = new mongoose.Schema({
    days: { type: Number, required: true },
    car: { type: mongoose.Types.ObjectId, required: true, ref: 'Car' },
    owner: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Rent', RentSchema);