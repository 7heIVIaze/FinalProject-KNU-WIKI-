module.exports = (req, res, next) => {
    if(req.query.document == null) { // 아무것도 안 치고 검색했을 경우
        return res.redirect('/')
    }
    next()
}