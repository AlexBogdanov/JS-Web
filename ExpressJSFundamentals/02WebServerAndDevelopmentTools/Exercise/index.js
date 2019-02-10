const http = require('http');
const url = require('url');

const handlers = require('./handlers');

const port = 8080;

http.createServer((req, res) => {
    req.path = url.parse(req.url).pathname;

    for (let handler of handlers) {
        if (handler(req, res) === false) {
            return;
        }
    }
}).listen(port, () => console.log('Listening on port ' + port));