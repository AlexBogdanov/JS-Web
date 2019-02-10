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
    app.get('/profile/:id', restrictedPages.isAuthed, controllers.user.getMyProfile);

    // Team
    app.get('/team/create', restrictedPages.hasRole('Admin'), controllers.team.getCreateTeam);
    app.post('/team/create', restrictedPages.hasRole('Admin'), controllers.team.postCreateTeam);
    app.get('/team/all', restrictedPages.isAuthed, controllers.team.getTeams);
    app.post('/team/all/admin', restrictedPages.hasRole('Admin'), controllers.team.postTeamsAdmin);
    app.post('/team/all/user', restrictedPages.hasRole('User'), controllers.team.postTeamUser);
    app.post('/team/leave/:teamId', restrictedPages.isAuthed, controllers.team.leaveTeam);

    // Project
    app.get('/project/create', restrictedPages.hasRole('Admin'), controllers.project.getCreateProject);
    app.post('/project/create', restrictedPages.hasRole('Admin'), controllers.project.postCreateProject);
    app.get('/project/all', restrictedPages.isAuthed, controllers.project.getProjects);
    app.post('/project/all/admin', restrictedPages.hasRole('Admin'), controllers.project.postProjectsAdmin);
    app.post('/project/all/user', restrictedPages.hasRole('User'), controllers.project.postProjectUser);

    // All
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};