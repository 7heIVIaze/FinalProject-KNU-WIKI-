const doc_version_Model = require('../models/document')

module.exports = async (req, res) => {
    const url = req.url // /revert/문서명(encoded)
    const version = req.query.rev // 버전값
    const parsedurl = url.split('/') // '', revert, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 문서명?rev=버전값
    const parsedsearch = search.split('?') // 문서명, rev=버전값
    const docName = parsedsearch[0] // 문서명
    
    const document = await doc_version_Model.findOne({wiki_doc_title: docName, version: version})
    // 해당하는 문서명과 버전의 값을 가져옴
    
    if(document) res.render('revert', {document: document})
    else res.render('/')
}