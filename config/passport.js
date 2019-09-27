const JwtStrategy = require('passport-jwt').Strategy; // not quite sure what it will be used for
const ExtractJwt = require('passport-jwt').ExtractJwt; // used for extracting user info from payload
const mongoose = require('mongoose'); // used for searching users using payload data
const User = mongoose.model('users');
const secret = require('../config/keys').secretOrKey;

const opts = {}

// i have no Idea what this line does
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = secret

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        
    }))
}
//  creating JWT strategy