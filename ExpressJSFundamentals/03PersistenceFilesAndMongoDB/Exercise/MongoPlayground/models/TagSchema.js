const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name: { type: String, required: true },
    creationDate: { type: Date, default: new Date() },
    images: [String]
})

TagSchema.methods.tagNameToLowerCase = (tagName) => {
    return tagName.toLowerCase();
}

module.exports = mongoose.model('Tag', TagSchema);