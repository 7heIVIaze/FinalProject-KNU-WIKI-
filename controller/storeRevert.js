const doc_version_Model = require('../models/document')

module.exports = async (req, res) => {
    const url = req.url // /revert/문서명(encoded)?version=버전값
    const version = req.query.version // 버전값
    const parsedurl = url.split('/') // '', revert, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 문서명?version=버전값
    const parsedsearch = search.split('?') // 문서명, version=버전값
    const docName = parsedsearch[0] // 문서명
    let writer = requestIp.getClientIp(req) // 작성자는 일단 해당 작성자의 ip
    if(req.user) writer = req.user.username // 만약 로그인 했다면 아이디로

    
    const newversion = await doc_version_Model.findOne({wiki_doc_title: docName}).sort({"_id": -1}).limit(1)
    const document = await doc_version_Model.findOne({wiki_doc_title: docName, version: version})
    // 해당하는 문서명과 버전의 값을 가져옴
    await doc_version_Model.create({
        body: document.body,
        version: newversion.version + 1,
        wiki_doc_title: docName,
        writer: writer,
    })
    res.redirect(`/w/${docName}`)
}