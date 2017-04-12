let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let config = require('./index');
let db =require('../db');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.jwtSecret;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        db.user.findOne({ where: { id: jwt_payload.id } }).then((user) => {
            if (!user) {
                let err = new Error(' in passport');
                return done(err, false);
            }

            if(!user.status){
                done(null, false);
            }

            done(null, user);
        });
    }));

    passport.use('authenticate', new JwtStrategy((opts), (jwt_payload, done) => {
        done(null, jwt_payload);
    }));
};