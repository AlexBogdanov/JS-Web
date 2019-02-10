const formidable = require('formidable');

const Image = require('./../models/ImageSchema');

const addImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields) => {
    if (err) {
      console.log(err);
      return;
    }

    let tags = fields.tags.split(',')
      .filter(tag => tag);
    tags = tags.reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, []);

    const image = {
      URL: fields.imageUrl,
      title: fields.imageTitle,
      description: fields.description,
      tags
    };

    Image.create(image).then(() => {
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
};

const deleteImg = (req, res) => {
  const idToRemove = req.pathquery.id;

  Image.remove({ _id: idToRemove }, (err) => {
    if (err) {
      console.log(err);
      return;
    }
  }).then(() => {
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
}

module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else return true
}
