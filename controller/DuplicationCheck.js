const UserModel = require('../models/user')

module.exports = async (req, res) => {
    let userId = req.query.userId
    userId += ''
    let userIdTrimmed = userId.trim()
    if(!userIdTrimmed) res.sendStatus(203)
    else {
        await UserModel.findOne({ username: userIdTrimmed }, function(err, doc) {
            if(err) console.log('DuplicationCheckController error')
            else if(!doc) res.sendStatus(200) // 등록된 아이디 없음. 아이디 사용 가능
            else if(doc) res.sendStatus(202) // 등록된 아이디 존재
        }).clone()
    }
}