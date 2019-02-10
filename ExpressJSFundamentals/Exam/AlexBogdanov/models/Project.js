const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    description: { type: mongoose.Schema.Types.String, required: true, maxlength: 50 },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', default: null }
});

module.exports = mongoose.model('Project', ProjectSchema);
