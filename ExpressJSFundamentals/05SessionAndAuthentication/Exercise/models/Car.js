const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    model: { type: String, required: true },
    image: { type: String, require: true },
    pricePerDay: { type: Number, requred: true },
    isRented: { type: Boolean, default: false }
});

module.exports = mongoose.model('Car', CarSchema);