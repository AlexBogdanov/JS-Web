const encryption = require('../util/encryption');
const User = require('mongoose').model('User');
const Team = require('./../models/Team');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;
        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            let user;

            if (reqUser.profilePic) {
                user = await User.create({
                    username: reqUser.username,
                    hashedPass,
                    salt,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    roles: ['User'],
                    imageUrl: reqUser.profilePic
                });
            } else {
                user = await User.create({
                    username: reqUser.username,
                    hashedPass,
                    salt,
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    roles: ['User']
                });
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({
                username: reqUser.username
            });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },

    getMyProfile: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const teams = [];
            const projects = [];

            for (let team of user.teams) {
                const currTeam = await Team.findById(team)
                    .populate('project');
                teams.push(currTeam);
            }
            
            teams.forEach(team => {
                team.project.forEach(project => {
                    if (!projects.includes(project.name)) {
                        projects.push({ name: project.name });
                    }
                })
            });

            user.hasTeams = user.teams.length > 0 ? true : false;
            user.hasProjects = projects.length > 0 ? true : false;

            res.render('users/profile', { user, teams, projects });
        } catch (err) {
            console.log(err);
        }
    }
};