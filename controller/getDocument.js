const doc_version_Model = require('../models/document')
const marked = require('marked')

module.exports = async (req, res)=>{
    const version = req.query.version // 버전
    const url = req.url // /w/문서명(encoded)
    const parsedurl = url.split('/') // '', w, 문서명(encoded)
    let search = decodeURI(parsedurl[2]) // 문서명(decoded) => 그냥 문서 이름
    let document;
    
    if(version) {
        const parsedsearch = search.split('?') // url에 버전이 있는 경우엔 search의 상태는 '문서명?version=버전값'임
        search = parsedsearch[0] // 문서명만 가져옴
        document = await doc_version_Model.findOne({wiki_doc_title: search, version: version})
    }
    else {
        document = await doc_version_Model.findOne({wiki_doc_title: search}).sort({"_id": -1}).limit(1)
        // url에 버전이 없는 경우 id의 내림차순으로 정렬한 뒤 id값이 가장큰 데이터를 찾아옴
    }

    if(!document) res.render('document', {title: search}) // 문서가 없는 경우 문서명만 전달
    else {
        if(version) { // 과거 버전의 문서를 보는 경우 해당 전체 문서 내용과 해당 버전 값을 전달함
            const body = marked.marked(document.body) // 문서 내용이 마크다운 형식이기 때문에 파싱하는 코드임
            res.render('document', {
                title: document.wiki_doc_title,
                createdAt: document.createdAt,
                body: body,
                version: version,
                canAnybodyWrite: document.canAnybodyWrite
            }) 
        }
        else { // 사용자가 검색하여 들어간 경우에는 버전 값을 제외한 모든 정보를 전달함
            const body = marked.marked(document.body) // 문서 내용이 마크다운 형식이기 때문에 파싱하는 코드임
                res.render('document', {
                title: document.wiki_doc_title,
                createdAt: document.createdAt,
                body: body,
                canAnybodyWrite: document.canAnybodyWrite
            })
        }
    }
}