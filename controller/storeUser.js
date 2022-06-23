const UserModel = require('../models/user')

module.exports = async (req, res) => {
    const userId = req.body.usernameInput
    const userPwd = req.body.passwordInput
    let userPwdTrimmed = userPwd.trim()
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