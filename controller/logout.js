const passport = require('passport')

module.exports = (req, res, next) => {
    req.logout(function(err) {
        if(err) return next(err)
        req.session.save((err) => {
          if(err) throw err
        })
        res.redirect('/')
    }) // 세션 삭제. 이후 req.user는 null로
}