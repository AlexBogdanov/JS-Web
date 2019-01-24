const fs = require('fs');

let storage = {};

module.exports = {
    put: (key, value) => {
        if (typeof(key) !== 'string') {
            throw new Error(`Your key should be a string. ${key} is not a string.`);
        }

        if (storage.hasOwnProperty(key)) {
            throw new Error(`Item with key ${key} already exist in storage.`);
        }

        storage[`${key}`] = value;
    },

    get: (key) => {
        if (typeof(key) !== 'string') {
            throw new Error(`Your key should be a string. ${key} is not a string.`);
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error(`There is no item with ${key} for key in storage.`);
        }

        return storage[`${key}`];
    },

    getAll: () => {
        if (Object.keys(storage).length === 0) {
            return 'There are no items in storage.'
        }

        let output = '';

        Object.keys(storage).forEach(key => {
            output += `${key} -> ${storage[`${key}`]}\n`;
        })

        return output.trim();
    },

    update: (key, newValue) => {
        if (typeof(key) !== 'string') {
            throw new Error(`Your key should be a string. ${key} is not a string.`);
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error(`There is no item with ${key} for key in storage.`);
        }

        storage[`${key}`] = newValue;
    },

    del: (key) => {
        if (typeof(key) !== 'string') {
            throw new Error(`Your key should be a string. ${key} is not a string.`);
        }

        if (!storage.hasOwnProperty(key)) {
            throw new Error(`There is no item with ${key} for key in storage.`);
        }

        delete storage[`${key}`];
    },

    clear: () => {
        Object.keys(storage).forEach(key => {
            delete storage[`${key}`];
        })
    },

    save: () => {
        fs.writeFileSync('storage.json', JSON.stringify(storage));
    },

    load: () => {
        if (fs.existsSync('storage.json')) {
            let data = fs.readFileSync('storage.json');
            storage = JSON.parse(data);
        }
    }
}