const doc_version_Model = require('../models/document')
const requestIp = require('request-ip')

module.exports = async (req, res) => {
    const url = req.url // /acl/문서명(encoded)
    const parsedurl = url.split('/') // '', acl, 문서명(encoded)
    let search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름
    let version = 1 // 임시 버전값
    let writer = requestIp.getClientIp(req) // 작성자는 일단 해당 작성자의 ip
    if(req.user) writer = req.user.username // 만약 로그인 했다면 아이디로
    let canAnybodyWrite = false

    const document = await doc_version_Model.findOne({wiki_doc_title: search}).sort({"_id": -1}).limit(1)
    // id의 내림차순으로 정렬한 뒤 id값이 가장큰 데이터를 찾아옴
    version = document.version + 1 // 현재 버전에서 +1 해주고
    if(document.canAnybodyWrite) canAnybodyWrite = false // 누구나 편집 가능할 경우 불가능으로
    else canAnybodyWrite = true // 불가능일 경우 가능으로 고침

    await doc_version_Model.create({
        body: document.body,
        version: version,
        wiki_doc_title: document.wiki_doc_title,
        writer: writer,
        canAnybodyWrite: canAnybodyWrite
    })

    res.redirect(`/w/${search}`)
}