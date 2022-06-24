const doc_version_Model = require('../models/document')

module.exports = async (req, res)=>{
    const url = req.url // /edit/문서명(encoded)
    const parsedurl = url.split('/') // '', edit, 문서명(encoded)
    const search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름
    
    const document = await doc_version_Model.findOne({wiki_doc_title: search}).sort({"_id": -1}).limit(1)
    // id의 내림차순으로 정렬한 뒤 id값이 가장큰 데이터를 찾아옴
    
    if(document) {
        const body = document.body
        const splitbody = body.split('\n')
        res.render('create', {
            title: document.wiki_doc_title,
            body: splitbody,
            version: document.version,
        })
    }   
    else res.render('create', {title: search})
}