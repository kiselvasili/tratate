let jwt = require('jsonwebtoken');

let db = require('../db');
let config = require('../config');
let ValidationError = require('../errorHandler/ValidationError');

module.exports = (() => {
    let _this = this;

    _this.authorize = (params) => {
        let email = params.body.email;
        let password = params.body.password;

        return db.user.findOne({ where: { email: email } })
            .then((user) => {
                if (!user || user.password !== password) {
                    return Promise.reject(new ValidationError('Bad credentials'));
                }

                // if (!user.status) {
                //     return Promise.reject(new ValidationError('User deactivated'));
                // }


                let token = jwt.sign(JSON.stringify({
                    id: user.id,
                    email: user.email,
                    password: user.password
                }), config.jwtSecret);

                return {
                    token: 'JWT ' + token
                };
            });
    };

    function AuthorizeService() {}

    AuthorizeService.prototype.authorize = _this.authorize;

    return AuthorizeService;
})();