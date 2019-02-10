const Cube = require('./../models/Cube');

const difficultyInputValidation = (num) => {
    return num >= 1 && num <= 6 ? true : false;
}

module.exports =  {
    getHome: async (req, res) => {
        try {
            const cubes = await Cube.find({ });
    
            res.render('home/index', {cubes});
        } catch (err) {
            console.error(err);
        }
    },

    getAbout: (req, res) => {
        res.render('home/about');
    },

    search: async (req, res) => {
        const searchInput = req.body;

        try {
            let cubes;
            const nameRegex = new RegExp('^' + searchInput.name + '\w*');
            const from = Number(searchInput.from);
            const to = Number(searchInput.to);
            
            if (difficultyInputValidation(from) && difficultyInputValidation(to)) {
                cubes = await Cube.find(
                    { $and: [ { name: { $regex: nameRegex } }, { difficulty: { $gte: from } }, { difficulty: { $lte: to } }] }
                );
            } else if (from) {
                cubes = await Cube.find(
                    { $and: [{ name: { $regex: nameRegex } }, { difficulty: { $gte: from } }] }
                );
            } else if (to) {
                cubes = await Cube.find(
                    { $and: [{ name: { $regex: nameRegex } }, { difficulty: { $lte: to } }] }
                );
            } else {
                cubes = await Cube.find({ name: { $regex: nameRegex } });
            }

            res.render('home/index', {cubes});
        } catch (err) {
            console.error(err);
        }
    }
}