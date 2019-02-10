const ArticleModel = require('./../models/Article');

module.exports = {
  index: (req, res) => {
    ArticleModel.find({})
      .populate('author')
      .exec((err, articles) => {
        if (err) {
          console.error(err);
          return;
        }
        
        res.render('home/index', { articles: articles });
      })
  }
}
