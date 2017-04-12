let Sequelize = require('sequelize');
let logger = require('winston');
let fs = require('fs');

let config = require('../config').db;

let sequelize = new Sequelize(config.dbConnectionString, {
    logging: false
});

let db = {};

module.exports = (() => {
    fs.readdirSync(`${__dirname}/models`)
        .forEach((file) => {
            let model = sequelize.import(`${__dirname}/models/${file}`);
            db[model.name] = model;
        });

    let connect = () => {
        return sequelize
            .authenticate()
            .then(() => {
                logger.info('Connection to DB successful');
                return sequelize.sync();
            })
            .catch((error) => logger.error('Error create connection: ', error));
    };

    db['connect'] = connect;

    return db;
})();