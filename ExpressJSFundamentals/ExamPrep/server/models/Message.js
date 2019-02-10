const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.String, required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    thread: { type: mongoose.Schema.Types.ObjectId, ref: 'Thread', required: true }
});

module.exports = mongoose.model('Message', MessageSchema);