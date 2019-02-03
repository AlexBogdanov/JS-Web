const Car = require('./../models/Car');

module.exports = {
    addGet: (req, res) => {
        res.render('car/add');
    },

    addPost: async (req, res) => {
        const input = req.body;

        if (!input.model || !input.image || !input.pricePerDay) {
            input.error = 'All fields are required.';
            res.render('car/add', input);
            return;
        }

        const car = {
            model: input.model,
            image: input.image,
            pricePerDay: Number(input.pricePerDay)
        };

        try {
            await Car.create(car);
            res.redirect('/');
        } catch (err) {
            console.error(err);
        }
    }
};