const encryption = require('./../util/encryption');
const User = require('./../models/User');

// const checkForUsernameInDb = async (username) => {
//     try {
//         const user = await User.findOne({ username: username });
//         return user ? true : false;
//     } catch (err) {
//         console.error(err);
//     }
// };

const login = (req, res, newUser, input) => {
    req.logIn(newUser, err => {
        if (err) {
            input.error = err;
            res.render('/', input);
            return;
        }

        res.redirect('/');
    })
};

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },
    registerPost: async (req, res) => {
        const input = req.body;
        // const isUsernameTaken = checkForUsernameInDb(input.username);

        // if (isUsernameTaken) {
        //     input.error = 'Username already taken.';
        //     res.render('user/register', input);
        //     return;
        // }

        if (!input.username || !input.password || !input.repeatPassword) {
            input.error = 'You should fill the required fields.';
            res.render('user/register', input);
            return;
        }

        if (input.password !== input.repeatPassword) {
            input.error = 'Passwords do not match.';
            res.render('user/register', input);
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass = encryption.generateHashedPassword(salt, input.password);

        const user = {
            username: input.username,
            hashedPass,
            firstName: input.firstName,
            lastName: input.lastName,
            salt,
            roles: ['User']
        };

        try {
            const newUser = await User.create(user);
            login(req, res, newUser, input);
        } catch (err) {
            console.error(err);
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('user/login');
        return;
    },
    loginPost: async (req, res) => {
        const input = req.body;
        
        try { 
            const user = await User.findOne({ username: input.username });

            if (!user) {
                input.error = 'User with this username does not exist.';
                res.render('user/login', input);
                return;
            }

            if (!user.authenticate(input.password)) {
                input.error = 'Incorrect password.';
                res.render('user/login', input);
                return;
            }

            login(req, res, user, input);
        } catch (err) {
            console.error(err);
        }
    }
};