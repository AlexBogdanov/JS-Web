const User = require('./../models/User');
const Thread = require('./../models/Thread');

module.exports = {
    index: async (req, res) => {
        if (req.user) {
            try {
                let isAdmin = false;
                const user = await User.findById(req.user._id);
                const threads = await Thread.find({ });
    
                if (user.roles.includes('Admin')) {
                    isAdmin = true;
                }
                
                for (let thread of threads) {
                    const user1 = await User.findById(thread.users[0].toString());
                    const user2 = await User.findById(thread.users[1].toString());
                    thread.name = `${user1.username} ${user2.username}`;
                }
    
                res.render('home/index', { isAdmin, threads })
            } catch (err) {
                console.log(err);
                res.redirect('/');
            }
        } else {
            res.render('home/index');
        }
    }
};