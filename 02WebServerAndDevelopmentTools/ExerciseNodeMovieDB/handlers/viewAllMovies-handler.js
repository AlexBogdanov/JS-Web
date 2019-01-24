const fs = require('fs');
const path = require('path');

const db = require('./../config/dataBase');

const viewAllMoviesHandler = (req, res) => {
    if (req.path === '/viewAllMovies') {
        fs.readFile(path.join(__dirname, './../views/viewAll.html'), (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let output = `<ul>`;

            for (let movie of db) {
                output += `<a href="/movies/details/${movie.id}"><img class="moviePoster" src="${movie.moviePoster}"></a>`;
            }

            output += `</ul>`;

            data = data.toString().replace('{{replaceMe}}', output);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(data);
            res.end();
        })
    } else return true;
}

module.exports = viewAllMoviesHandler;