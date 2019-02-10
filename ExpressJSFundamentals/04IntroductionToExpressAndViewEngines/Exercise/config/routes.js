const router = require('express').Router;
const controllers = require('./../controllers');

module.exports = app => {
    app.get('/', controllers.home.getHome)
       .get('/about', controllers.home.getAbout)
       .get('/create', controllers.cube.getCreate)
       .post('/create', controllers.cube.postCreate)
       .get('/details/:id', controllers.cube.getDetails)
       .post('/', controllers.home.search);
};