module.exports = (req, res) => {
    search = req.query.document
    res.redirect(`/w/${search}`)
}