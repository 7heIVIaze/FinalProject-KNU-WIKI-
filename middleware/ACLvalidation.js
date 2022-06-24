module.exports = (req, res, next) => {
    const url = req.url // /w/문서명(encoded)
    const parsedurl = url.split('/') // '', w, 문서명(encoded)
    let search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름
    if(!req.user) { //
        return res.redirect(`/w/${search}`)
    }
    next()
}