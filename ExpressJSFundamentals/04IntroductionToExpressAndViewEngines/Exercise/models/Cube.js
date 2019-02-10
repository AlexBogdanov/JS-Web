const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CubeSchema = new Schema({
    name: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    difficulty: { type: Number, min: 1, max: 6 }
});

CubeSchema.path('name')
    .validate(function() {
        return this.name.length >= 3 && this.name.length <= 15;
    });
CubeSchema.path('description')
    .validate(function() {
        return this.description.length >= 20 && this.description.length <= 300;
    });
CubeSchema.path('imageUrl')
    .validate(function() {
        return this.imageUrl.startsWith('http://') || this.imageUrl.startsWith('https://');
    });
CubeSchema.path('difficulty')
    .validate(function() {
        return this.difficulty >= 1 && this.difficulty <= 6;
    });

module.exports = mongoose.model('Cube', CubeSchema);
