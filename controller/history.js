const doc_version_Model = require('../models/document')

module.exports = async (req, res)=>{
    const url = req.url // /w/문서명(encoded)
    const parsedurl = url.split('/') // '', w, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름
    
    const document = await doc_version_Model.find({wiki_doc_title: search}).sort({"_id": -1})
    // id의 내림차순으로 정렬한 뒤 모든 데이터를 가져옴

    if(!document) res.render('history', {document: search})
    else res.render('history', {document: document})
}