const ArticleModel = require('./../models/Article');

module.exports = {
    createGet: (req, res) => {
        res.render('article/create');
    },

    createPost: async (req, res) => {
        const createArgs = req.body;

        if (createArgs.title.length < 3) {
            createArgs.error = 'Title must be atleast 3 symbols long';
            res.render('article/create', createArgs);
            return;
        }

        if (createArgs.content.length < 20) {
            createArgs.error = 'Content must be atleast 20 symbols long';
            res.render('article/create', createArgs);
            return;
        }

        const article = {
            title: createArgs.title,
            content: createArgs.content,
            author: req.user._id
        };

        try { 
            await ArticleModel.create(article);
            console.log('Article successfully created');
            res.redirect('/');
        } catch(err) {
            console.error(err);
        }
    },

    details: (req, res) => {
        ArticleModel.findById(req.params.id)
            .populate('author')
            .exec((err, article) => {
                if (err) {
                    console.error(err);
                    return;
                }

                const isAuth = article.author._id.toString() === req.user._id.toString() 
                || req.user.roles[0] === 'Admin' ? true : false;

                const data = {
                    article,
                    isAuth
                };

                res.render('article/details', { data: data });
            });
    },

    editGet: async (req, res) => {
        try {
            const article = await ArticleModel.findById(req.params.id);
            res.render('article/edit', { article: article });
        } catch(err) {
            console.error(err);
        }
    },

    editPost: async (req, res) => {
        const newContent = req.body.content;

        try {
            const article = await ArticleModel.findById(req.params.id);
            article.content = newContent;
            article.save((err, updatedArticle) => {
                if (err) {
                    console.error(err);
                    return;
                }

                res.redirect(`/article/details/${article._id}`);
            })
        } catch(err) {
            console.error(err);
        }
    },

    delete: (req, res) => {
        ArticleModel.deleteOne({ _id: req.params.id })
            .then(() => {
                console.log('Article successfully deleted.');
                res.redirect('/');
            }).catch(console.error);
    }
};