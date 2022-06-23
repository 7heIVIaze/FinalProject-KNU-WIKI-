const UserModel = require('../models/user')
const passport = require('passport')

module.exports = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/member/login'
})