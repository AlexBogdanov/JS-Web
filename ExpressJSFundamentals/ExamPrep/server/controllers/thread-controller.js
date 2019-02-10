const mongoose = require('mongoose');

const User = require('./../models/User');
const Thread = require('./../models/Thread');
const Message = require('./../models/Message');

module.exports = {
    find: async (req, res) => {
        try {
            const sender = req.user;
            const receiver = await User.findOne({ username: req.body.username });

            const thread = await Thread.findOne({ users: { $all: [sender._id, receiver._id] } });

            if (!thread) {
                await Thread.create({ users: [sender._id, receiver._id] });
            }

            res.redirect(`/thread/${receiver.username}`);
        } catch (err) {
            res.locals.globalError = err;
            res.redirect('/');
        }
    },

    getThread: async (req, res) => {
        try {
            const sender = req.user;
            const receiver = await User.findOne({ username: req.params.receiver });
            const thread = await Thread.findOne({ users: { $all: [sender._id, receiver._id] } });

            if (!thread) {
                res.locals.globalError = `User ${req.params.receiver} does not exist`;
                res.render('home/index');
                return;
            }
            
            let otherIsBlocked = false;
            let iAmBlocked = false;

            if (sender.blockedUsers.includes(receiver.username)) {
                otherIsBlocked = true;
            }

            if (receiver.blockedUsers.includes(sender.username)) {
                iAmBlocked = true;
            }

            const messagesDB = await Message.find({ thread: thread._id });
            const messages = messagesDB.map(message => {
                if (message.receiver.toString() === sender._id.toString()) {
                    message.isMine = false;
                } else {
                    message.isMine = true;
                }

                if (message.content.startsWith('http://') || message.content.startsWith('https://')) {
                    message.isImg = true;
                } else {
                    message.isImg = false;
                }

                return message;
            });

            res.render('chatrooms/chatroom', { sender, receiver, messages, thread, otherIsBlocked, iAmBlocked });
        } catch (err) {
            res.locals.globalError = err;
            res.redirect('/');
        }
    },

    blockUser: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const blockedUser = await User.findById(req.params.id);
            user.blockedUsers.push(blockedUser.username);
            await user.save();
            res.globalError = `You have successfully blocked ${blockedUser.username}`;
            res.render('home/index');
        } catch (err) {
            res.locals.globalError = err;
            res.render('home/index');
        }
    },

    unblockUser: async (req, res) => {
        try {
            const user = await User.findById(req.user._id);
            const blockedUser = await User.findById(req.params.id);
            const index = user.blockedUsers.indexOf(blockedUser.username);

            if (index < 0) {
                res.locals.globalError = 'Cannot find user';
                res.render('home/index');
                return;
            }

            user.blockedUsers.splice(index, 1);
            await user.save();
            res.globalError = `You have successfully unblocked ${blockedUser.username}`;
            res.render('home/index');
        } catch (err) {
            res.locals.globalError = err;
            res.render('home/index');
        }
    },

    deleteThread: async (req, res) => {
        try {
            await Thread.deleteOne({ _id: req.params.id });
            await Message.deleteMany({ thread: req.params.id });
            
            res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
}