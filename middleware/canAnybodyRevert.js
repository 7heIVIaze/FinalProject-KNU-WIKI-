const doc_version_Model = require('../models/document')

module.exports = async (req, res, next) => {
    const url = req.url // /revert/문서명(encoded)
    const version = req.query.rev // 버전값
    const parsedurl = url.split('/') // '', revert, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 문서명?rev=버전값
    const parsedsearch = search.split('?') // 문서명, rev=버전값
    const docName = parsedsearch[0] // 문서명

    const document = await doc_version_Model.findOne({wiki_doc_title: docName}).sort({"_id": -1}).limit(1)
    // 편집제한 문서인지 확인하기 위해 최근에 저장된 데이터 가져옴

    if(!document || version == null) return res.redirect('/') // db에 저장된 문서가 아니거나 버전 값 없이 revert에 들어왔을 경우
    if(document.canAnybodyWrite && req.user == null) { // 로그인 안한 이용자가 편집제한 문서를 편집하려할 때
        if(version) return res.redirect(`/w/${docName}?version=${version}`)
        else if(!version) return res.redirect(`/w/${docName}`)
        else return res.redirect('/')
    }
    next()
}