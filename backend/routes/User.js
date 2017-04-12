let express = require('express');

let auth = require('../util/auth');
let handleRequest = require('../util/serviceHandler').handleRequest;
let UserService = require('../service/userService');

let user = express.Router();

user.get('/', auth.authorizeRequest, (req, res) => handleRequest(req, res, UserService, UserService.prototype.getAll));
user.get('/login', auth.loginRequest, (req, res) => handleRequest(req, res, UserService, UserService.prototype.login));
user.get('/logout', (req, res) => handleRequest(req, res, UserService, UserService.prototype.logout));

module.exports = user;