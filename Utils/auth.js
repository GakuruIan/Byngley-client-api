const bcyrpt = require('bcryptjs');
const { authorize } = require('passport');

const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt")

const User = require('../models/users');

var opts = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'secret'
}

// authorization
module.exports = function(passport){
    passport.use(new JwtStrategy(opts,(payload,done)=>{
        User.findOne({_id:payload.id})
            .then(user=>{
                if(!user)
                {
                    return done(null,false,{message:'something went wrong'});
                }
                return done(null,user)
            })
            .catch(err=>console.log(err))
         })
    )
}

