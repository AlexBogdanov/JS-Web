const http = require('http');
const url = require('url');
const handlers = require('./handlers/handlerBlender');
const qs = require('querystring');
const port = process.env.PORT || 5000;

const db = require('./config/dataBase');

db.then(() => {
  console.log('Connected to DB');

  http.createServer((req, res) => {
    req.pathname = url.parse(req.url).pathname;
    req.pathquery = qs.parse(url.parse(req.url).query);

    for (let handler of handlers) {
      if (!handler(req, res)) {
        break;
      }
    }
  }).listen(port, () => console.log(`Server running on port ${port}`));
}).catch(err => { throw new Error(err); });