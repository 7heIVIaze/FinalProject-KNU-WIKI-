var requestIp = require('request-ip')

module.exports = (req, res) => {
    res.render('index')
    console.log("client Ip: " + requestIp.getClientIp(req))
    if(req.user) console.log(req.user)
}