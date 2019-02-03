const auth = require('./auth');
const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('./../controllers/article');

module.exports = (app) => {
    // Home
    app.get('/', homeController.index);

    // User
    app
    .get('/user/register', userController.registerGet)
    .post('/user/register', userController.registerPost)
    .get('/user/login', userController.loginGet)
    .post('/user/login', userController.loginPost)
    .get('/user/logout', auth.isAuthed, userController.logout);

    // Article
    app
    .get('/article/create', auth.isAuthed, articleController.createGet)
    .post('/article/create', auth.isAuthed, articleController.createPost)
    .get('/article/details/:id', auth.isAuthed, articleController.details)
    .get('/article/edit/:id', auth.isAuthed, articleController.editGet)
    .post('/article/edit/:id', auth.isAuthed, articleController.editPost)
    .get('/article/delete/:id', auth.isAuthed, articleController.delete);
};

