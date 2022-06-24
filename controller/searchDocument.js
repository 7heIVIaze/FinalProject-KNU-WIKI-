module.exports = (req, res) => {
    const search = req.query.document
    res.redirect(`/w/${search}`)
}