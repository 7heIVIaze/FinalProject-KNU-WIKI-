const mongoose = require('mongoose')
const crypto = require('crypto')

const User_Schema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    hashed_password: {type: String, required: true},
    salt: { type: String, required: true },
})

User_Schema
    .virtual('password')
    .set(function(password) {
        this._password = password
        this.salt = this.makeSalt()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function() {
        return this._password
    })

User_Schema.method('encryptPassword', function(plainText, inSalt) {
    if (inSalt) {
        return crypto.createHmac('sha512', inSalt).update(plainText).digest('hex')
    } else {
        return crypto.createHmac('sha512', this.salt).update(plainText).digest('hex')
    }
})

User_Schema.method('makeSalt', function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
})

User_Schema.method('authenticate', function(plainText, inSalt, hashed_password) {
    if(inSalt) {
      return this.encryptPassword(plainText, inSalt) === hashed_password
    }
    else {
        return this.encryptPassword(plainText) === this.hashed_password
    }
})

const user_Model = mongoose.model('Wiki_user', User_Schema)

module.exports = user_Model