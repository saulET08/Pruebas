const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config  = require('./database');

module.exports = function(passport){
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//leera el token bearer
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{//identifica los datos del token
        User.getUserById(jwt_payload.data._id, (err,user)=>{//comprueba si existe ese usuario en la BD
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
     
        });
    }));
}