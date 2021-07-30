var JwTStrategy = require('passport-jwt').Strategy;
var ExtractJwt =require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var config = require('./dbconfig');

module.exports = function (passport)
{
    var opts ={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey =  config.secret;
    
    passport.use(new JwTStrategy(opts,function (jwt_payload,done)
    {
        User.find({id:jwt_payload.id}),
        function(err, user)
        {
            if(err)
            {
                return done(err,false);
            }
            if(user)
            {
                return done(null,user);
            }
            else
            {
                return done(null,false);
            }
        }
    }))
}