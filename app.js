const express = require('express')
const ejs = require('ejs')
const router = express.Router()
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const passport = require('./controller/userPassport')
const homeController = require('./controller/home')
const createController = require('./controller/create')
const getDocumentController = require('./controller/getDocument')
const searchDocumentController = require('./controller/searchDocument')
const StoreDocumentController = require('./controller/storeDocument')
const historyController = require('./controller/history')
const revertController = require('./controller/revert')
const storeRevertController = require('./controller/storeRevert')
const DuplicationCheckController = require('./controller/DuplicationCheck')
const signupController = require('./controller/signup')
const loginController = require('./controller/login')
const storeUserController = require('./controller/storeUser')
const loginUserController = require('./controller/loginUser')
const logoutController = require('./controller/logout')

require('dotenv').config()

mongoose.connect(process.env.MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
var host = process.env.HOST
const port = process.env.PORT
if(host === undefined) host = '127.0.0.1'
// Host와 Port 설정

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRETKEY,
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('*', (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.currentUser = req.user
    next()
})

app.get('/', homeController) 
app.get('/edit/:id', createController)
app.get('/w', searchDocumentController)
app.get('/w/:id', getDocumentController)
app.get('/history/:id', historyController)
app.get('/revert/:id', revertController)
app.get('/member/dupcheck', DuplicationCheckController)
app.get('/member/signup', signupController)
app.get('/member/login', loginController)
app.get('/member/logout', logoutController)
app.post('/post/:id', StoreDocumentController)
app.post('/postrevert/:id', storeRevertController)
app.post('/member/dosignup', storeUserController)
app.post('/member/dologin', loginUserController)

app.listen(port, host,()=> {
    console.log(host+ ':' +port + '/ is running')
})