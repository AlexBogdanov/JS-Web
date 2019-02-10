const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    URL: { type: String, required: true },
    creationDate: { type: Date, default: new Date() },
    title: { type: String, required: true },
    description: String,
    tags: [String]
});

module.exports = mongoose.model('Image', ImageSchema);