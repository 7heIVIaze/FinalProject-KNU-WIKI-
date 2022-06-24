const mongoose = require('mongoose')

const Doc_Version_Schema = new mongoose.Schema({
    createdAt: {type: Date, default: Date.now},
    body: {type: String},
    version: {type: Number},
    wiki_doc_title: {type: String},
    writer: {type: String},
    canAnybodyWrite: {type: Boolean, default: false},
})

const doc_version_Model = mongoose.model('Doc_Version', Doc_Version_Schema)

module.exports = doc_version_Model
