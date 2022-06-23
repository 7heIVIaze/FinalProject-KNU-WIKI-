const UserModel = require('../models/user')

module.exports = async (req, res) => {
    let userId = req.body.usernameInput
    let userPwd = req.body.passwordInput
    userPwd += ''
    let userPwdTrimmed = userPwd.trim()
    console.log(userId)
    console.log(userPwdTrimmed)
    let user = new UserModel({
        username: userId,
        password: userPwdTrimmed,
    })
    await user.save(function(err, created) {
        if(err) console.log('storeUserController error')
        else {
            console.log('회원가입 성공!')
            res.redirect('/member/login')
        }
    })
}