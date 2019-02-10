const User = require('./../models/User');
const Message = require('./../models/Message');

module.exports = {
    add: async (req, res) => {
        try {
            const receiver = await User.findOne({ username: req.params.receiver });
            const messageArgs = req.body;
            const message = {
                content: messageArgs.message,
                receiver: receiver._id,
                thread: messageArgs.threadId
            };

            await Message.create(message);
            res.redirect(`/thread/${receiver.username}`);
        } catch (err) {
            res.locals.globalError = err;
            res.render('/');
        }
    }
};