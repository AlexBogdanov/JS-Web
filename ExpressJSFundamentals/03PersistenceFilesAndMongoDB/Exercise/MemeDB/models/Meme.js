const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    title: { type: String, required: true },
    memeSrc: { type: String, required: true },
    description: String,
    privacy: { type: String, enum: ['on', 'off'] },
    dateCreated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('MemeModel', MemeSchema);