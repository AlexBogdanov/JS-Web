const Cube = require('./../models/Cube');

const errorHandler = (err, res) => {
    let errors = [];

    for (const prop of err.errors) {
        errors.push(err.errors[prop].message);
    }

    res.locals.globalErrors = errors;
    res.render('cube/create');
}

module.exports = {
    getCreate: (req, res) => {
        res.render('./cube/create');
    },

    postCreate: (req, res) => {
        const cube = req.body;
        cube.difficulty = Number(cube.difficulty);
        Cube.create(cube);
        res.redirect('/');
    },

    getDetails: async (req, res) => {
        try {
            const cube = await Cube.findById(req.params.id);
            res.render('./cube/details', {cube});
        } catch (err) {
            errorHandler(err, res);
        }
    }
}