const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    // Home
    app.get('/', controllers.home.index);

    // User
    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    
    // Chatroom
    app.post('/thread/find', restrictedPages.isAuthed, controllers.thread.find);
    app.get('/thread/:receiver', restrictedPages.isAuthed, controllers.thread.getThread);
    app.post('/messages/add/:receiver', restrictedPages.isAuthed, controllers.message.add);
    app.post('/block/:id', restrictedPages.isAuthed, controllers.thread.blockUser);
    app.post('/unblock/:id', restrictedPages.isAuthed, controllers.thread.unblockUser);
    app.post('/threads/remove/:id', restrictedPages.hasRole('Admin'), controllers.thread.deleteThread);

    // All
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};