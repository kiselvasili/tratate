let config = require('../config');
let db = require('../db');
let ApiError = require('../errorHandler/ApiError');
let ValidationError = require('../errorHandler/ValidationError');

module.exports = (() => {
    let _this = this;

    _this.getAll = (params) => {
        let id = params.user.id;
        return db.user.findAll()
            .then(users => users);
    };


    _this.login = (params) => {
        params = params.user;
        let user = {
            id: params.id,
            email: params.email,
            firstName: params.firstName,
            lastName: params.lastName
        };

        return Promise.resolve(user);
    };

    _this.logout = (params) => {
        return Promise.resolve(
            params.logout()
        )
            .then(() => {
                return {
                    message: 'logout'
                };
            });
    };


    function UserService() {}

    UserService.prototype.getAll = _this.getAll;
    UserService.prototype.login = _this.login;
    UserService.prototype.logout = _this.logout;

    return UserService;
})();