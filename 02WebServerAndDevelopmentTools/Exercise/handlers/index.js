const staticFilesHandler = require('./staticFiles-handler');
const homePageHandler = require('./homePage-handler');
const viewAllMoviesHandler = require('./viewAllMovies-handler');
const addMovieHandler = require('./addMovie-handler');
const movieDetailsHandler = require('./movieDetails-handler');

module.exports = [
    staticFilesHandler,
    homePageHandler,
    viewAllMoviesHandler,
    addMovieHandler,
    movieDetailsHandler
];