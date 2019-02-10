const fs = require('fs');
const path = require('path');
const contentTypes = require('./../utils/constants');

const getContentType = (url) => {
    if (url.endsWith('.css')) {
        return contentTypes.css;
    }

    if (url.endsWith('.html')) {
        return contentTypes.html;
    }

    if (url.endsWith('.js')) {
        return contentTypes.js;
    }

    if (url.endsWith('.png')) {
        return contentTypes.png;
    }

    if (url.endsWith('.jpg')) {
        return contentTypes.jpg;
    }

    return 'text/plain';
}

const staticFilesHandler = (req, res) => {
    if (req.path.startsWith('/public') && req.method === 'GET') {
        fs.readFile(path.join(__dirname, '../' + req.path), (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': getContentType(req.path)
                });
                res.write('Not found');
                res.end();
                return;
            }

            res.writeHead(202, {
                'Content-Type': getContentType(req.path)
            });
            res.write(data);
            res.end();
        })
    }
}

module.exports = staticFilesHandler;