let express = require('express');

let handleRequest = require('../util/serviceHandler').handleRequest;
let AuthorizeService = require('../service/authService');

let auth = express.Router();

auth.post('/', (req, res) => handleRequest(req, res, AuthorizeService, AuthorizeService.prototype.authorize));

module.exports = auth;