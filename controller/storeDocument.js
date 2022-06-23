const doc_version_Model = require('../models/document')
const requestIp = require('request-ip')

module.exports = async (req, res) => {
    const post = req.body;
    const body = post.create
    const title = req.params.id
    let writer = requestIp.getClientIp(req)
    let version = 1 // 없는 경우 버전은 1이기 때문에 초기값임
    if(req.user) writer = req.user.username
    console.log(writer)
    

    const document = await doc_version_Model.findOne({wiki_doc_title: title}).sort({"_id": -1}).limit(1)
    if(document) version = document.version + 1 // 이전 문서가 존재할 경우 버전을 +1 시켜줌
    
    await doc_version_Model.create({
        body: body,
        version: version,
        wiki_doc_title: title,
        writer: writer,
    })
    res.redirect(`/w/${title}`)
}