const fs = require('fs');
const path = require('path');

const db = require('./../config/dataBase');

const movieDetailsHandler = (req, res) => {
    if (req.path.startsWith('/movies/details/')) {
        fs.readFile(path.join(__dirname, './../views/details.html'), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            const movieId = Number(req.path.split('/')[3]);
            const movie = db.find(movie => movie.id === movieId);
            let output;

            if (movie) {
                output += `<div class="content">
                <img src="${movie.moviePoster}">
                <div class="inner">
                <h3>Title: ${movie.movieTitle}</h3>
                <h3>Year: ${movie.movieYear}</h3>
                <p>Description: ${movie.movieDescription}</p>
                <p>^^^Decrypted descrition :D^^^</p>
                </div>
                </div>`;
            } else {
                output += `<div class="content">
                <h3>There is no movie with name ${movie.movieTitle} in our collection.</h3>
                </div>`;
            }

            data = data.toString().replace('{{replaceMe}}', output);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else return true;
};

module.exports = movieDetailsHandler;