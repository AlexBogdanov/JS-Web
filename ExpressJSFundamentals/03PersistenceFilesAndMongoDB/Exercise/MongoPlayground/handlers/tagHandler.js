const formidable = require('formidable');

const Tag = require('./../models/TagSchema');

module.exports = (req, res) => {
  if (req.pathname === '/generateTag' && req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields) => {
      if (err) {
        console.log(err);
        return;
      }

      const tag = {
        name: fields.tagName,
        images: []
      };

      Tag.create(tag).then(() => {
        res.writeHead(302, {
          'location': '/'
        });
        res.end();
      }).catch(err => {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.write(`Internatl server error -> ${err}`);
        res.end();
      })
    })
  } else return true;
}
