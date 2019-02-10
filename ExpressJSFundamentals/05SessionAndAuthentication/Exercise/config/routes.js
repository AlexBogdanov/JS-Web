const restrictedPages = require('./auth');
const homeController = require('../controllers/home');
const userController = require('./../controllers/user');
const carController = require('./../controllers/car');

module.exports = app => {
    // Home
    app.get('/', homeController.index);

    // User
    app
    .get('/user/register', restrictedPages.isAnonymous, userController.registerGet)
    .post('/user/register', restrictedPages.isAnonymous, userController.registerPost)
    .post('/user/logout', restrictedPages.isAuthed, userController.logout)
    .get('/user/login', restrictedPages.isAnonymous, userController.loginGet)
    .post('/user/login', restrictedPages.isAnonymous, userController.loginPost);

    // Car
    app
    .get('/car/add', restrictedPages.hasRole('Admin'), carController.addGet)
    .post('/car/add', restrictedPages.hasRole('Admin'), carController.addPost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};