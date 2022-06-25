const UserModel = require('../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

passport.use(
    new LocalStrategy(
        {
            usernameField: 'usernameInput',
            passwordField: 'passwordInput',
            session: true,
        }, // passport에서 username과 password의 값이usernameInput과 passwordInput임 
        function(username, password, done) {
            UserModel.findOne({ username: username}, function(err, user) {
                if(err) return done(err)
                if(!user) {
                    return done(null, false, { message: 'Incorrect username. ' })
                }
                if(!user.authenticate(password, user.salt, user.hashed_password)) {
                    return done(null, false, { message: 'Incorrect password. ' })
                }
                return done(null, user)
            })
        }
    )
)

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user)
    })
})

module.exports = passport