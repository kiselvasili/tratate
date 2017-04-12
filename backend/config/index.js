let env = process.env.NODE_ENV || 'dev';
let config = require('./' + env);

module.exports = config;