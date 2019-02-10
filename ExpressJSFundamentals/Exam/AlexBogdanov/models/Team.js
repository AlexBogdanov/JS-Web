const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String, required: true, unique: true },
    project: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Team', TeamSchema);
