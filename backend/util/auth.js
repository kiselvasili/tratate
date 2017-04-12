let passport = require('passport');

let handleError = require('./serviceErrorHandler');
let ApiError = require('../errorHandler/ApiError.js');

require('../config/passport')(passport);

module.exports = (() => {
    function authenticateRequest(req, res, next) {
        passport.authenticate('authenticate', { session: false }, (err, user) => {
            if (err) {
                return next(err);
            }

            req.user = user;
            next();
        })(req, res, next);
    }

    function authorizeRequest(req, res, next) {
        if(!req.user){
            return handleError(new ApiError(401, 'Unauthorized'), res);
        } else {
            next();
        }
    }

    function loginRequest(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if(user){
                req.user = user;
            }

            next();
        })(req, res, next);
    }

    function init(app) {
        app.use(passport.initialize());
        app.use(authenticateRequest);
    }

    return {
        loginRequest,
        authorizeRequest,
        init
    };
})();