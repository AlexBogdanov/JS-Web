const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const Image = require('./../models/ImageSchema');

module.exports = (req, res) => {
  if (req.pathname === '/search') {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields) => {
      if (err) {
        console.log(err);
        return;
      }



      fs.readFile(path.join(__dirname, './../views/results.html'), async (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        const tags = fields.tagName.split(',')
          .filter(tag => tag);
        let afterDate = fields.afterDate;
        let beforeDate = fields.beforeDate;
        const limit = Number(fields.Limit);

        let images = await Image.find({});

        tags.forEach(tag => {
          images = images.filter(image => image.tags.includes(tag));
        });

        images.sort((a, b) => {
          return a.creationDate.getTime() < b.creationDate.getTime() ? -1 :
            a.creationDate > b.creationDate ? 1 : 0;
        })

        if (afterDate && beforeDate) {
          afterDate = new Date(afterDate);
          beforeDate = new Date(beforeDate);
          images = images.filter(image => image.creationDate > afterDate && image.creationDate < beforeDate);
        } else if (afterDate) {
          afterDate = new Date(afterDate);
          images = images.filter(image => image.creationDate.getTime() > afterDate.getTime());
        } else if (beforeDate) {
          beforeDate = new Date(beforeDate);
          images = images.filter(image => image.creationDate.getTime() < beforeDate.getTime());
        }

        if (limit && limit < images.length) {
          images = images.map((image, index) => {
            if (index < limit) return image;
          })
        } else {
          images = images.map((image, index) => {
            if (index <= 10) return image;
          });
        }

        let result = '';

        images
          .filter(image => image)
          .forEach(image => {
            result += `<fieldset>
          <legend>${image.title}</legend>
          <img src="${image.URL}" />
          <p>${image.description}</p>
          <button onclick="location.href='delete?id=${image._id}'" class="deleteBtn">Delete</button>
          </fieldset>`;
          });

        data = data.toString().replace('{{replaceMe}}', result);

        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
      });
    });
  } else return true;
}