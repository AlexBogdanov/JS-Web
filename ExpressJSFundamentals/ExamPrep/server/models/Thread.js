const mongoose = require('mongoose');

const ThreadSchema = new mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    dateCreated: { type: mongoose.Schema.Types.Date, default: new Date() }
});

module.exports = mongoose.model('Thread', ThreadSchema);