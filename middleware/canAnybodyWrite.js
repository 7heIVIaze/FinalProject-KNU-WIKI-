const doc_version_Model = require('../models/document')

module.exports = async (req, res, next) => {
    const url = req.url // /edit/문서명(encoded)
    const parsedurl = url.split('/') // '', edit, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름

    const document = await doc_version_Model.findOne({wiki_doc_title: search}).sort({"_id": -1}).limit(1)

    if(document) { // 문서가 있을 때 확인함 (Revert의 경우에는 문서가 있는 것을 되돌리는 것이기 때문에 확인 안 함)
        if(document.canAnybodyWrite && req.user == null) { // 로그인 안한 이용자가 편집제한 문서를 편집하려할 때
            if(search) return res.redirect(`/w/${search}`)
            else return res.redirect('/')
        }
    }
    next()
}