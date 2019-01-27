const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const MemeModel = require('./../models/Meme');

const viewAll = (req, res) => {
  fs.readFile(path.join(__dirname, './../views/viewAll.html'), async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const memes = await MemeModel.find({});
    let result = '';

    memes.forEach(meme => {
      if (meme.privacy === 'off') {
        result += `<div class="meme">
        <a href="getDetails?id=${meme.id}" >Details</button>
        <img class="memePoster" src="${meme.memeSrc}" />
        </div>`;
      }
    });

    data = data.toString().replace('{{replaceMe}}', result);

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
  });
};

const viewAddMeme = (req, res, output) => {
  fs.readFile(path.join(__dirname, './../views/addMeme.html'), (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    if (output) {
      data = data.toString('{{replaceMe}}', output);
    }

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
  })
}

const addMeme = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }

    const title = fields.memeTitle;
    const memeSrc = fields.meme;
    const description = fields.memeDescription;
    const privacy = fields.status ? 'off' : 'on';
    
    const meme = {
      title,
      memeSrc,
      description,
      privacy
    };

    try {
      await MemeModel.create(meme);
      res.writeHead(302, {
        'location': '/'
      });
      res.end();
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.write(`Internal server error -> ${err}`);
      res.end()
    }
  });
}

const getDetails = (req, res) => {
  const id = req.pathquery.id;

  fs.readFile(path.join(__dirname, './../views/details.html'), async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    let meme;

    try {
      meme = await MemeModel.find({ _id: id });
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      res.write(`Internal server error -> ${err}`);
      res.end();
    }

    const result = `<div class="content">
    <img src="${meme[0].memeSrc}" />
    <h3>${meme[0].title}</h3>
    <p>${meme[0].description}</p>
    </div>`;

    data = data.toString().replace('{{replaceMe}}', result);
    
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
  });
};

module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res)
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res)
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res)
  } else if (req.pathname.startsWith('public/memeStorage') && req.method === 'GET') {
    console.log('HERE')
  } else {
    return true
  }
}