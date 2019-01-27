const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const db = require('./../config/dataBase');

const loadPage = (res, data, output) => {
    if (output) {
        data = data.toString().replace('{{replaceMe}}', output);
    }

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
};

const addMovieHandler = (req, res) => {
    if (req.path === '/addMovie' && req.method === 'GET') {
        fs.readFile(path.join(__dirname, './../views/addMovie.html'), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            loadPage(res, data);
        })
    } else if (req.path === '/addMovie' && req.method === 'POST') {
        fs.readFile(path.join(__dirname, './../views/addMovie.html'), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let input;
            
            req.on('data', (data) => {
                input = data;
            });

            req.on('end', () => {
                const movie = qs.parse(input.toString());

                if (!movie.movieTitle || !movie.moviePoster) {
                    const output = `<div id="errBox"><h2 id="errMsg">Invalid input field</h2></div>`;
                    loadPage(res, data, output);
                    return;
                }

                const output = `<div id="succssesBox"><h2 id="succssesMsg">Successfully added a movie</h2></div>`;
                movie.id = db.length + 1;
                db.push(movie);
                loadPage(res, data, output);
                return;
            })
        })
    } else return true;
}

module.exports = addMovieHandler;